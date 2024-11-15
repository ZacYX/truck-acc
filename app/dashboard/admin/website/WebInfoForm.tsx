"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { WebInfoWithImages } from "./WebInfoFormList";
import ImageEditor from "./ImageEditor";
import { useEffect, useRef, useState } from "react";
import BasicInfo from "./BasicInfo";
import { WebPicture } from "@prisma/client";
import ConfirmModal from "@/app/dashboard/ConfirmModal";
import { useConfirm } from "@/app/hook/confirm";

export type ChildRef = {
  removeAllImages: () => void,
  resetImageUi: () => void,
}

export default function WebInfoForm({ webInfo, fetchWebInfos, setNewWebInfoForm }: {
  webInfo: Partial<WebInfoWithImages>,
  fetchWebInfos: () => void,
  setNewWebInfoForm: (b: boolean) => void,
}) {
  const methods = useForm<WebInfoWithImages>({
    defaultValues: webInfo
  });
  const { register, control, setValue, getValues, handleSubmit, reset } = methods;
  const imageEditorRef = useRef<ChildRef>(null);
  const [isEditable, setIsEditable] = useState(false);

  const { confirm, isOpen, onConfirm, onCancel } = useConfirm();

  useEffect(() => {
    if (!webInfo.id) {
      setIsEditable(true);
    }
  }, [webInfo])

  const title = useWatch({ control, name: "title" });
  const addTitle = () => setValue("title", [...title, ""]);
  const removeTitle = (index: number) => setValue("title", title.filter((_, i) => i !== index));

  const content = useWatch({ control, name: "content" });
  const addContent = () => setValue("content", [...content, ""]);
  const removeContent = (index: number) => setValue("content", content.filter((_, i) => i !== index));

  const onSubmit = async (data: WebInfoWithImages) => {
    const { images, ...webInfo } = data;
    try {
      //write product info in to database
      const webInfoResponse = await fetch(`/api/web-info`, {
        method: webInfo.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(webInfo),
      });
      if (!webInfoResponse.ok) {
        console.error(`No response when write product into database`);
        return;
      }
      const webInfoResult = await webInfoResponse.json();
      if (!webInfoResult) {
        console.error(`create product in database failed`);
        return;
      }
      //update images info in to database
      const imagesWithWebInfoId = images?.map((image: WebPicture) => ({
        ...image,
        webInfoId: webInfoResult.id,
      }));
      const updatePromises = imagesWithWebInfoId.map((item: WebPicture) => (
        fetch(`/api/web-picture`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(item),
        })
      ));
      const updateResponses: PromiseSettledResult<any>[] = await Promise.allSettled(updatePromises);
      updateResponses.forEach((item) => {
        if (item.status !== 'fulfilled') {
          console.log(`update image failed: ${JSON.stringify(item.reason)}`);
          return;
        }
      });

      //clear all data after submit sucessully when create new item
      if (!webInfo.id) {
        reset();
        imageEditorRef.current?.resetImageUi();
        setNewWebInfoForm(false);
      }

      fetchWebInfos();
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async () => {
    const userConfirm = await confirm();
    if (!userConfirm) {
      console.log(`delete canceled`);
      return;
    }
    if (webInfo.id) {
      //delete existing webinfo
      const deleteWebInfoResponse = await fetch(`/api/web-info?id=${webInfo.id}`, {
        method: "DELETE"
      });
      if (!deleteWebInfoResponse.ok) {
        console.error(`delete webinfo failed`);
        return;
      }
    }
    imageEditorRef.current?.removeAllImages();
    reset();
    fetchWebInfos();
    //new webinfo form
    setNewWebInfoForm(false);
  }

  return (
    <FormProvider {...methods}>
      <div className=" pt-2 pb-1">
        {
          getValues("id")
            ? <label className="flex flex-row " >
              <p className="font-semibold">Id</p>
              <input
                className="outline-none ml-2"
                {...register(`id`)}
                readOnly
              />
            </label>
            : <p className="font-semibold">New</p>
        }
      </div>
      <div className="border-4 p-2 ">
        {/* Basic info */}
        <BasicInfo isEditable={isEditable} />

        {/* Title array*/}
        <div className="border-2 p-2 my-1 flex flex-col">
          <div className="flex flex-row">
            <label className="flex flex-row" >
              <p className="font-semibold">Title</p>
            </label>
            <button
              className="ml-4"
              onClick={() => {
                if (isEditable) { addTitle() }
              }}
            >
              <CiSquarePlus />
            </button>
          </div>
          {
            title.map((item, index) => (
              <div key={index} className="flex flex-row items-center">
                <input
                  className="w-full border-b-1 outline-none mr-4"
                  {...register(`title.${index}`)}
                  readOnly={!isEditable}
                />
                <RiDeleteBin6Line
                  className="hover:cursor-pointer"
                  onClick={() => {
                    if (isEditable) { removeTitle(index) }
                  }} />
              </div>
            ))
          }
        </div>

        {/* Content array */}
        <div className="border-2 p-2 my-1 flex flex-col">
          <div className="flex flex-row">
            <label className="flex flex-row" >
              <p className="font-semibold">Content</p>
            </label>
            <button
              className="ml-4"
              onClick={() => {
                if (isEditable) { addContent() }
              }}
            >
              <CiSquarePlus />
            </button>
          </div>
          {
            content.map((item, index) => (
              <div key={index} className="flex flex-row items-center">
                <textarea
                  className="w-full border-1 outline-none mr-4"
                  {...register(`content.${index}`)}
                  readOnly={!isEditable}
                />
                <RiDeleteBin6Line
                  className="hover:cursor-pointer"
                  onClick={() => {
                    if (isEditable) { removeContent(index) }
                  }
                  } />
              </div>
            ))
          }
        </div>

        {/* Image Editor */}
        <ImageEditor isEditable={isEditable} ref={imageEditorRef} />

        {/* Three buttons */}
        <div className="flex flex-row justify-around">
          {
            !webInfo.id &&
            <button
              className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 mt-2 rounded-lg"
              onClick={() => {
                imageEditorRef.current?.removeAllImages();
                reset();
              }}
            >Reset</button>
          }
          {
            webInfo.id &&
            <button
              className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 mt-2 rounded-lg"
              onClick={() => setIsEditable(!isEditable)}
            >
              {isEditable ? "Disable" : "Enable"} Edit
            </button>
          }
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 mt-2 rounded-lg"
            onClick={() => {
              if (isEditable) { onDelete() }
            }}
          >Delete</button>
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 mt-2 rounded-lg"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >Save</button>
        </div>
        <ConfirmModal
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
          header="Delete Confirmation"
          body="Are you sure you want to delete this item?"
        />
      </div>
    </FormProvider>
  )
}