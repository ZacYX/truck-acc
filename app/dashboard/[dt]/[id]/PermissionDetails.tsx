import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import PermissionDetailsTable from "./PermissionDetailsTable";
import { Permission, Role } from "@prisma/client";

type ExtendPermission = {
  roles: Role[]
} & Permission

export default function PermissionDetails() {
  const params = useParams<{ dt: string, id: string }>();

  const methods = useForm({ defaultValues: async () => fetchDataFromDatabase(params) });
  const { register, handleSubmit, getValues, formState: { errors } } = methods;

  async function handleSave() {
    const permission = getValues();
    console.log("Input permission: " + JSON.stringify(permission));
    const result = await fetch("/api/permission", {
      method: params.id === "new" ? "POST" : "PUT",
      headers: { "content-type": "application/json", },
      body: JSON.stringify(permission),
    });
  }

  return (
    <FormProvider {...methods} >
      <div className="bg-white rounded-md p-4">
        <p className="p-4 font-bold">
          {params.id === "new" ? "New permission" : "PermissionID: " + params.id}
        </p>
        <form
          onSubmit={handleSubmit(handleSave)}
        >
          <PermissionDetailsTable />
          <div className="flex flex-row justify-around">
            <button className="btn" type="reset">Reset</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </form>

      </div>
    </FormProvider>
  )
}

async function fetchDataFromDatabase(params: { dt: string, id: string }) {
  let permission: ExtendPermission = {} as ExtendPermission;
  if (params.id !== "new") {
    const result = await fetch(`/api/permission?id=${params.id}`, {
      method: "GET",
      headers: { "content-type": "application/json", }
    })

    if (result.status) {
      permission = await result.json();
    } else {
      console.log(`fetch permission from database failed.`)
    }
  }

  console.log(`fetchDataFromDatabase: ${JSON.stringify(permission)}`)

  return permission;
}