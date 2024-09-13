import { useFormContext } from "react-hook-form";

export default function AddressCard() {
  const { register } = useFormContext();

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-row mr-10">
        <label>Unit</label>
        <input
          {...register("address.unit")}
          className="border-b-2 ml-2"
        />
      </div>
      <div className="flex flex-row mr-10">
        <label>Street</label>
        <input
          {...register("address.street")}
          className="border-b-2 ml-2"
        />
      </div>
      <div className="flex flex-row mr-10">
        <label>City</label>
        <input
          {...register("address.city")}
          className="border-b-2 ml-2"
        />
      </div>
      <div className="flex flex-row mr-10">
        <label>Province</label>
        <input
          {...register("address.province")}
          className="border-b-2 ml-2"
        />
      </div>
      <div className="flex flex-row mr-10">
        <label>Country</label>
        <input
          {...register("address.country")}
          className="border-b-2 ml-2"
        />
      </div>
      <div className="flex flex-row mr-10">
        <label>Zipcode</label>
        <input
          {...register("address.zip")}
          className="border-b-2 ml-2"
        />
      </div>

    </div>
  )
}