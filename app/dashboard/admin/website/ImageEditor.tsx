import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import ImageCard from "./ImageCard";
import { FormEvent, forwardRef, useCallback, useImperativeHandle, useRef, } from "react";
import { WebInfoWithImages } from "./WebInfoFormList";
import { RiDeleteBin6Line } from "react-icons/ri";


const ImageEditor = forwardRef(function ImageEditor(props: { isEditable: boolean }, ref) {
  const { register, control, getValues } = useFormContext<WebInfoWithImages>();
  const { fields, append, update, remove } = useFieldArray({
    name: "images",
    control
  });

  const handleFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    if (!selectedFiles) {
      console.debug("No file selected");
      return;
    }
    const formData = new FormData();
    Object.values(selectedFiles).forEach((file, index) => {
      formData.append(`file${index}`, file);
    })
    try {
      //upload file to server
      const uploadResponse = await fetch(`/api/upload?path=website`, {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok) {
        console.error("Post file response failed");
        return;
      }
      const urls = await uploadResponse.json();
      if (!urls) {
        console.error("Post file failed");
        return;
      }
      //write image info to database
      const data = urls.map(((url: string) => ({ url: url })));
      console.debug(`data: ${JSON.stringify(data)}`);
      const createResponse = await fetch(`/api/web-picture`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!createResponse.ok) {
        console.error(`create database info of uploaded images failed`);
        return;
      }
      const returnedImages = await createResponse.json();
      append(returnedImages);
    } catch (error) {
      console.error(error);
    }
  }

  const removeFileAndRecord = async (
    field: FieldArrayWithId<WebInfoWithImages, "images", "id">,
    index: number
  ) => {
    //remove from file system
    const removeFromFileSystemResponse = await fetch(`/api/upload?file=${field.url}`, {
      method: "DELETE"
    });
    if (!removeFromFileSystemResponse.ok) {
      console.error(`delete file failed`);
      return;
    }
    //remove  from database
    const removeFromDatabaseResponse = await fetch(
      `/api/web-picture?url=${field.url}`, {
      method: "DELETE",
    })
    if (!removeFromDatabaseResponse.ok) {
      console.error(`delete database info failed`);
      return;
    }
    //remove from fieldarray
    remove(index);
  }

  /**
   * Issue #1: It is very neccessary to use useCallBack here,
   * or when invoking removeAllImages in parent,
   * it will keep saying removeAllImages is not a function
   * Issue #2: dependency fields is important, otherwise the two
   * Promises.allSettle do not execute
   */
  const removeAllFilesAndRecords = useCallback(async () => {
    const removeFilePromises = fields.map((field, index) => (
      fetch(`/api/upload?file=${field.url}`, { method: "DELETE" })
    ));
    const removeFileResults = await Promise.allSettled(removeFilePromises);
    if (removeFileResults.some((item) => item.status === "rejected")) {
      console.error(`deleting image files not fullfilled`);
      return;
    }
    const removeDatabasePromises = fields.map((field, index) => (
      fetch(`/api/web-picture?url=${field.url}`, { method: "DELETE", })
    ));
    const removeDatabaseResults = await Promise.allSettled(removeDatabasePromises);
    if (removeDatabaseResults.some((item) => item.status === "rejected")) {
      console.error(`deleting database info not fullfilled`);
      return;
    }
    remove();
  }, [fields]);

  useImperativeHandle(ref, () => {
    return {
      removeAllImages: removeAllFilesAndRecords,
      resetImageUi: remove,
    }
  }, [removeAllFilesAndRecords])

  return (
    <div className="w-full">
      {
        fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full flex flex-row border-2 my-1"
          >
            <ImageCard
              field={field}
              index={index}
              isEditable={props.isEditable}
            />
            <div className="p-2 flex justify-center items-center hover:cursor-pointer">
              <button
                className="h-full hover:bg-zinc-300 rounded-md"
                onClick={() => {
                  if (props.isEditable) { removeFileAndRecord(field, index) }
                }}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))
      }

      <div className="py-4">
        <input
          type="file"
          accept=".jpg"
          multiple
          onChange={handleFileChange}
          disabled={!props.isEditable && !!getValues("id")}
        />
      </div>
    </div>
  )
}
)

export default ImageEditor;
