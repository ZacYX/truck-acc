import { SyntheticEvent } from "react";
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { WebInfoWithImages } from "./WebInfoFormList";

export default function ImageCard({ field, index, isEditable }: {
  field: FieldArrayWithId<WebInfoWithImages, "images", "id">
  index: number,
  isEditable: boolean
  // remove: UseFieldArrayRemove,
}) {

  const { register, setValue } = useFormContext();

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


  return (
    <div className="w-full flex flex-col md:flex-row justify-between p-2 gap-4 ">
      <div className="min-w-28 relative flex justify-center items-center">
        <img
          className="w-28 h-28 object-contain"
          src={field.url}
          onLoad={(event) => updateDimension(event)}
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <label className="flex flex-row items-center">
            <p className="font-semibold">ImageId</p>
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.id` as const)}
              readOnly
            />
          </label >
          <label className="flex flex-row items-center">
            <p className="font-semibold">Height</p>
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.height` as const)}
              readOnly
            />
          </label >
          <label className="flex flex-row items-center">
            <p className="font-semibold">Width</p>
            <input
              className="outline-none border-b-1 ml-2 max-w-16"
              type="number"
              {...register(`images.${index}.width` as const)}
              readOnly
            />
          </label>
          <label className="flex flex-row items-center">
            <p className="font-semibold">isPrimary</p>

            <input
              className="outline-none border-b-1 ml-2"
              type="checkbox"
              {...register(`images.${index}.isPrimary` as const)}
              onClick={(e) => {
                if (!isEditable) { e.preventDefault() }
              }}
            />
          </label >
        </div>
        <label className="flex flex-row items-center">
          <p className="font-semibold">CreateAt</p>
          <input
            className="outline-none border-b-1 ml-2 "
            {...register(`images.${index}.createAt` as const)}
            disabled
          />
        </label>
        <label className="flex flex-row items-center h-8 w-full">
          <p className="font-semibold">Url</p>

          <input
            className="outline-none border-b-1 ml-2 w-full"
            {...register(`images.${index}.url`)}
            readOnly
          />
        </label>
        <label className="flex flex-row items-center h-8 w-full">
          <p className="font-semibold">Alt</p>
          <input
            className="outline-none border-b-1 ml-2 w-full"
            {...register(`images.${index}.alt` as const)}
            readOnly={!isEditable}
          />
        </label>
      </div>
    </div>
  )
}