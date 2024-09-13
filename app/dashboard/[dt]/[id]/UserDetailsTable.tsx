import { useFieldArray, useFormContext } from "react-hook-form";
import UserAddressCard from "./UserAddressCard";
import { useEffect, useState } from "react";
import { Role } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";

export default function UserDetailsTable() {

  const { register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "roles" });
  const [options, setOptions] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllRoles();
      setOptions(result.data);
    }
    fetchData();
  }, [])

  return (
    <div className="felx flex-col p-4 space-y-4">
      <div className="flex flex-row ">
        <label className="min-w-24">Name </label>
        <input
          {...register("name")}
          className="border-b-2 w-full "
        />
      </div>
      <div className="flex flex-row ">
        <label className="min-w-24">Email</label>
        <input
          {...register("email")}
          className="border-b-2 w-full "
        />
        <label className="ml-8 mr-4">Email Verified</label>
        <input
          {...register("emailVerified")}
          className="border-b-2 w-full "
          disabled
        />
      </div>
      <div className="flex flex-wrap justify-between ">
        <div className="flex flex-row w-5/12 min-w-80 mr-20">
          <label className="min-w-24">RegisterAt</label>
          <input
            {...register("registerAt")}
            className="border-b-2 w-full "
            disabled
          />
        </div>
        <div className="flex flex-row w-5/12 min-w-80">
          <label className="min-w-24">UpdateAt</label>
          <input
            {...register("updateAt")}
            className="border-b-2 w-full "
            disabled
          />
        </div>
      </div>
      <div className="flex flex-row ">
        <label className="min-w-24">Roles</label>
        {
          fields.map((field, index) => (
            <div
              className="flex flex-row"
            >
              <  button
                className="  bg-white min-h-4 h-6"
                onClick={() => { remove(index) }}
              ><RxCross2 /></button>
              <input
                disabled
                key={field.id}
                {...register(`roles.${index}.title`)}
              />
            </div>
          ))
        }
        <select
          onChange={(e) => {
            let id: number = parseInt(e.target.value);
            append(options.find(item => item.id === id))
          }}

        >
          <option>Append new role</option>
          {
            options.map((item, index) => (
              <option key={index} value={item.id}>{item.title}</option>

            ))
          }
        </select>
      </div>
    </div>
  )
}

async function fetchAllRoles() {
  try {
    let result;
    let roles;
    result = await fetch(`/api/role?take=100`, {
      method: "GET",
      headers: { "content-type": "application/json", }
    })
    if (result.status) {
      roles = await result.json();
      if (roles.totalCount > 100) {
        result = await fetch(`/api/role?take=${roles.totalCount}`, {
          method: "GET",
          headers: { "content-type": "application/json", }
        })
        roles = await result.json();
      }
    } else {
      console.log(`Role table fetch permission type failed.`)
    }
    return roles;
  } catch (error) {
    console.log(error);
  }

}