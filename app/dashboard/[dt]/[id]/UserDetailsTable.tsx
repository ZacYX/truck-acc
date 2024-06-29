import { useFieldArray, useFormContext } from "react-hook-form";
import UserAddressCard from "./UserAddressCard";

export default function UserDetailsTable() {

  const { register, formState: { errors } } = useFormContext();
  const { fields } = useFieldArray({ name: "roles" });

  return (
    <div className="felx flex-col p-4 space-y-4">
      <div className="flex flex-row ">
        <label className="min-w-24">Name </label>
        <input
          {...register("name", { required: true })}
          className="border-b-2 w-full "
        // defaultValue={data?.name ?? ""}
        />
      </div>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row w-2/5">
          <label className="min-w-24">Phone </label>
          <input
            {...register("phone")}
            className="border-b-2 w-full "
          // defaultValue={data?.phone ?? ""}
          />
        </div>
        <div className="flex flex-row w-2/5">
          <label className="min-w-36">Second Phone </label>
          <input
            {...register("secondPhone")}
            className="border-b-2 w-full "
          // defaultValue={data?.secondPhone ?? ""}
          />
        </div>
      </div>
      <div className="flex flex-row ">
        <label className="min-w-24">Email</label>
        <input
          {...register("email.emailAddress", { required: true })}
          className="border-b-2 w-full "
        // defaultValue={data?.email.emailAddress ?? ""}
        />
        <label className="ml-8 mr-4">Verified?</label>
        <input
          type="checkbox"
          {...register("email.isVerified")}
        // defaultChecked={data?.email.isVerified}
        />
      </div>
      <div className="flex flex-row">
        <label className="min-w-24">Address</label>
        {
          <UserAddressCard />
        }
      </div>
      <div className="flex flex-wrap justify-between ">
        <div className="flex flex-row w-5/12 min-w-80 mr-20">
          <label className="min-w-24">RegisterAt</label>
          <input
            {...register("registerAt")}
            className="border-b-2 w-full "
          // required defaultValue={data?.name ?? ""}
          />
        </div>
        <div className="flex flex-row w-5/12 min-w-80">
          <label className="min-w-24">UpdateAt</label>
          <input
            {...register("updateAt")}
            className="border-b-2 w-full "
          />
        </div>
      </div>
      <div className="flex flex-row ">
        <label className="min-w-24">Roles</label>
        {
          fields.map((field, index) => (
            <input
              key={field.id}
              {...register(`roles.$(index).role`)}
            />
          ))
        }
        {/* <input
          {...register("roles", { required: true })}
          className="border-b-2 w-full "
        // defaultValue={data?.roles.role ?? ""}
        /> */}
      </div>
    </div>
  )
}