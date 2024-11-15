import { useFormContext } from "react-hook-form"

export default function BasicInfo({ isEditable }: { isEditable: boolean }) {
  const { register } = useFormContext();
  return (
    <div className="border-2 px-2 flex flex-wrap gap-x-4">
      {/* <label
        className="flex flex-row "
      >
        <p className="font-semibold">Id</p>
        <input
          className="border-b-1 outline-none ml-2"
          {...register(`id`)}
          readOnly
        />
      </label> */}
      <label
        className="flex flex-row "
      >
        <p className="font-semibold">Name</p>
        <input
          className="border-b-1 outline-none ml-2"
          {...register(`name`)}
          readOnly={!isEditable}
        />
      </label>
      <label
        className="flex flex-row"
      >
        <p className="font-semibold">Category</p>
        <input
          className="border-b-1 outline-none ml-2"
          {...register(`category`)}
          readOnly={!isEditable}
        />
      </label>
      <label
        className="flex flex-row"
      >
        <p className="font-semibold">CreateAt</p>
        <input
          className="border-b-1 outline-none ml-2"
          {...register(`createAt`)}
          readOnly
        />
      </label>
      <label
        className="flex flex-row"
      >
        <p className="font-semibold">UpdateAt</p>
        <input
          className="border-b-1 outline-none ml-2"
          {...register(`updateAt`)}
          readOnly
        />
      </label>
    </div>
  )
}