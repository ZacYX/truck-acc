import { SyntheticEvent, useEffect, useState } from "react";
import { FieldArrayWithId, UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import { PictureInfo, ProductDetails } from "./NewProductDetailsForm";

export default function ImageCard({ field, index, remove }: {
  field: FieldArrayWithId<ProductDetails, "images", "id">
  index: number,
  remove: UseFieldArrayRemove,
}) {
  const { register, setValue } = useFormContext();

  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    const getImageUrl = async () => {
      const response = await fetch(`/api/upload?name=${field.url}`);
      if (!response.ok) {
        console.error(`fetch presigned url response failed`);
        return '';
      }
      const responseUrl = await response.json();
      setImageUrl(responseUrl);
    }
    getImageUrl();
  }, [field.url]);

  const updateDimension = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (
      !field.width
      || field.width === undefined
      || !field.height
      || field.height === undefined
    ) {
      const width = event.currentTarget.naturalWidth;
      const height = event.currentTarget.naturalHeight;
      // const pictureInfo: PictureInfo = { ...field, width, height };
      setValue(`images.${index}.width`, width);
      setValue(`images.${index}.height`, height);
    }
  }

  const removeFilesAndRecord = async (
    field: FieldArrayWithId<ProductDetails, "images", "id">,
    index: number
  ) => {
    //remove from fieldarray
    remove(index);
    //remove  from database
    const removeFromDatabaseResponse = await fetch(
      `/api/picture?url=${field.url}`, {
      method: "DELETE",
    })
    //remove from file system
    const removeFromFileSystemResponse = await fetch(`/api/upload?file=${field.url}`, {
      method: "DELETE"
    });
  }


  return (
    <div className="border-1 flex flex-col md:flex-row justify-between py-2 gap-4">
      <div className="min-w-28 relative flex justify-center items-center">
        <img
          className="w-28 h-28 object-contain"
          src={imageUrl}
          // src={field.url}
          onLoad={(event) => updateDimension(event)}
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <label className="flex flex-row items-center">
            Id
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.id`)}
              readOnly
            />
          </label >
          <label className="flex flex-row items-center">
            Height
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.height`)}
              readOnly
            />
          </label >
          <label className="flex flex-row items-center">
            Width
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.width`)}
              readOnly
            />
          </label>
          <label className="flex flex-row items-center">
            Order
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              {...register(`images.${index}.order`)}
            />
          </label >
        </div>
        <label className="flex flex-row items-center">
          CreateAt
          <input
            className="outline-none border-b-1 ml-2 "
            {...register(`images.${index}.createAt`)}
            disabled
          />
        </label>
        <label className="flex flex-row items-center h-8 w-full">
          Url
          <input
            className="outline-none border-b-1 ml-2 w-full"
            {...register(`images.${index}.url`)}
            readOnly
          />
        </label>
        <label className="flex flex-row items-center h-8 w-full">
          Alt
          <input
            className="outline-none border-b-1 ml-2 w-full"
            {...register(`images.${index}.alt`)}
          />
        </label>
      </div>
      <div className="flex justify-center items-center p-4">
        <button
          className="hover:bg-zinc-300 p-2 rounded-md"
          onClick={() => removeFilesAndRecord(field, index)}
        // onClick={() => remove(index)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}