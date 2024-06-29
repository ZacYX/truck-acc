import { Permission, Role } from "@prisma/client";
import { useParams } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form";

export default function RoleDetails() {
  const params = useParams<{ dt: string, id: string }>();
  const baseUrl = `/api/${params.dt}`;

  type ExtendRole = {
    permission: Permission[],
  } & Role;

  const fetchDataFromDatabase = async () => {
    let extRole: ExtendRole = {} as ExtendRole;
    if (params.id !== "new") {
      const pRole = await fetch(`${baseUrl}?id=${params.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      });
      extRole = await pRole.json();
    }
    return extRole;
  }

  const methods = useForm({ defaultValues: fetchDataFromDatabase() });
  const { register, handleSubmit, getValues } = methods;

  const handleSave = async () => {
    const extRole = getValues();
    console.log(`Input ExtRole: ${JSON.stringify(extRole)}`);
  }

  return (
    <FormProvider {...methods}>
      <div>
        Role details
      </div>

    </FormProvider>
  )
}