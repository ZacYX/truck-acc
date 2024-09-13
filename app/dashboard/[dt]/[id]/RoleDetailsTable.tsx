import { Permission, Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { Controller, useController, useFieldArray, useFormContext } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

export default function RoleDetailsTable() {
  const { register } = useFormContext();
  const { fields: userFields } = useFieldArray({ name: "user" });
  const [options, setOptions] = useState<Permission[]>([]);
  const { fields, append, remove } = useFieldArray({ name: "permission", })

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllPermission();
      console.log(`Get all permissions in effect: ${JSON.stringify(result)}`)
      setOptions(result.data);
    }
    fetchData();
  }, [])

  return (
    <div className="felx flex-col p-4 space-y-4">
      <div className="flex flex-row">
        <label className="min-w-24">ID</label>
        <input
          {...register("id", { valueAsNumber: true })}
          type="number"
          className="border-b-2 w-full"
          disabled
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
      <div className="flex flex-row justify-start min-w-80 w-full">
        <label className="min-w-24">Permission</label>
        <div className="flex flex-wrap w-full">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" flex flex-row justify-end">
              <  button
                className="  bg-white min-h-4 h-6"
                onClick={() => { remove(index) }}
              ><RxCross2 /></button>
              <input
                className=""
                disabled
                {...register(`permission.${index}.title`)}
              />
            </div>
          ))}

          <select
            className=""
            onChange={(e) => {
              let id: number = parseInt(e.target.value);
              append(options.find(item => item.id === id));
              console.log(`select onchange: ${e.target.value}`)
            }}>
            <option>Apppend new permission</option>
            {
              options.map((item, index) => (
                <option key={index} value={item.id}>{item.title}</option>
              ))

            }
          </select>
        </div>
      </div>
      <div className="flex flex-row">
        <label className="min-w-24">User</label>
        {
          userFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`user.${index}.name`)}
            />
          ))
        }
      </div>
    </div >
  )
}

async function fetchAllPermission() {
  let result;
  let permissions;
  result = await fetch(`/api/permission?take=100`, {
    method: "GET",
    headers: { "content-type": "application/json", }
  })
  if (result.status) {
    permissions = await result.json();
    if (permissions.totalCount > 100) {
      result = await fetch(`/api/permission?take=${permissions.totalCount}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      })
      permissions = await result.json();
    }
  } else {
    console.log(`Role table fetch permission type failed.`)
  }

  return permissions;
}