"use client";

import { Role, User } from "@prisma/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import UserDetailsTable from "./UserDetailsTable";

export type ExtendUser = {
  roles: Role[],
} & User

export default function UserDetails() {
  const params = useParams<{ dt: string, id: string }>();

  const methods = useForm({ defaultValues: () => fetchDataFromDatabase(params) });
  const { register, handleSubmit, getValues, formState } = methods;
  const { isDirty, isValid, dirtyFields } = formState;

  const [result, setResult] = useState<string>();

  const handleSave = async (extUser: ExtendUser) => {
    try {
      console.log("Input ExtUser: " + JSON.stringify(extUser));
      const result = await fetch(`/api/user`, {
        method: params.id === "new" ? "POST" : "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(extUser),
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FormProvider {...methods} >
      <div className="bg-white rounded-md p-4">
        <p className="p-4 font-bold">
          {params.id === "new" ? "New user" : "User ID: " + params.id}
        </p>
        <label>{result}</label>
        <form
          onSubmit={handleSubmit(handleSave)}
        >
          <UserDetailsTable />
          <div className="flex flex-row justify-around">
            <button className="btn" type="reset">Reset</button>
            <button
              className="btn"
              type="submit"
              disabled={!isDirty || !isValid}
            >Save</button>
          </div>
        </form>

      </div>
    </FormProvider>
  )
}

const fetchDataFromDatabase = async (params: { dt: string, id: string }) => {
  let extUser: ExtendUser = {} as ExtendUser;

  if (params.id !== "new") {
    const result = await fetch(`/api/${params.dt}?id=${params.id}`, {
      method: "GET",
      headers: { "content-type": "application/json", }
    });
    if (result.status) {
      extUser = await result.json();
    } else {
      console.log(`fetch user from data base failed.`)
    }
  }

  console.log(`fetchDataFromDatabase: ${JSON.stringify(extUser)}`)
  return extUser;
}