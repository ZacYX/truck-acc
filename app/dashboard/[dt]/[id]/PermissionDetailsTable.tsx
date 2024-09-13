import { useFieldArray, useFormContext } from "react-hook-form"

export default function PermissionDetailsTable() {
  const { register } = useFormContext();
  const { fields } = useFieldArray({ name: "roles" });

  return (
    <div className="felx flex-col p-4 space-y-4">
      <div className="flex flex-row">
        <label className="min-w-24">ID</label>
        <input
          disabled
          {...register("id")}
          className="border-b-2 w-full"
        />
      </div>
      <div className="flex flex-row">
        <label className="min-w-24">Title</label>
        <input
          {...register("title", { required: true })}
          className="border-b-2 w-full"
        />
      </div>
      <div className="flex flex-row">
        <label className="min-w-24">Details</label>
        <input
          {...register("details")}
          className="border-b-2 w-full"
        />
      </div>
      <div className="flex flex-row">
        <label className="min-w-24">Roles</label>
        {
          fields.map((field, index) => (
            <input
              key={field.id}
              disabled
              {...register(`roles.${index}.title`)}
            />
          ))
        }
      </div>
    </div>
  )
}