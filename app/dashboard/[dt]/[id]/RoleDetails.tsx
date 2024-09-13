import { useParams } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form";
import RoleDetailsTable from "./RoleDetailsTable";
import { ExtendRole } from "@/app/lib/types";

export default function RoleDetails() {
  const params = useParams<{ dt: string, id: string }>();

  const methods = useForm({ defaultValues: async () => fetchDataFromDatabase(params) });
  const { register, handleSubmit, getValues, formState: { errors } } = methods;

  const handleSave = async () => {
    const data = getValues() as ExtendRole;
    console.log(`Input ExtRole: ${JSON.stringify(data)}`);
    const result = await fetch("/api/role", {
      method: params.id === "new" ? "POST" : "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <FormProvider {...methods}>
      <div className="bg-white rounded-md p-4">
        <p className="p-4 font-bold">
          {params.id === "new" ? "New Role" : "Role ID: " + params.id}
        </p>
        <form
          onSubmit={handleSubmit(handleSave)}
        >
          <RoleDetailsTable />
          <div className="flex flex-row justify-around">
            <input className="btn" type="reset" value="Reset" />
            <input className="btn" type="submit" value="Save" />
          </div>
        </form>

      </div>
    </FormProvider>
  )
}

async function fetchDataFromDatabase(params: { dt: string, id: string }) {
  let extRole = {};
  if (params.id !== "new") {
    const result = await fetch(`/api/role?id=${params.id}`, {
      method: "GET",
      headers: { "content-type": "application/json", }
    });
    if (result.status) {
      extRole = await result.json();
    } else {
      console.log("fetch role from database failed.")
    }
  }

  console.log(`fetchDataFromDatabase: ${JSON.stringify(extRole)}`)
  return extRole;
}
