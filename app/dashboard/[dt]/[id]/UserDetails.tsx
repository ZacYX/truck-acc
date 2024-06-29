"use client";

import { Address, Email, Role, User } from "@prisma/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import UserDetailsTable from "./UserDetailsTable";

export type ExtendUser = {
  email: Email,
  address: Address,
  roles: Role[],
} & User

export default function UserDetails() {
  const params = useParams<{ dt: string, id: string }>();
  const baseUrl = `/api/${params.dt}`;

  const fetchDataFromDatabase = async () => {
    let extUser: ExtendUser = {} as ExtendUser;

    if (params.id !== "new") {
      const pUser = fetch(`${baseUrl}?id=${params.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      });
      const pEmail = fetch(`/api/email?userid=${params.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      });
      const pAddress = fetch(`/api/address?userid=${params.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      });
      const pRole = fetch(`/api/role?userid=${params.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", }
      });

      const response = await Promise.all([pUser, pEmail, pAddress, pRole]);
      if (response[0].status) {
        extUser = await response[0].json();
        if (response[1].status) {
          const email = await response[1].json();
          extUser.email = email.data;
        }
        if (response[2].status) {
          const address = await response[1].json();
          extUser.address = address.data;
        }
        if (response[3].status) {
          const role = await response[2].json();
          extUser.roles = role.data;
        }
      } else {
        console.log("Get user failed.");
      }
    }
    return extUser;
  }

  const methods = useForm({ defaultValues: fetchDataFromDatabase() });
  const { register, handleSubmit, getValues, formState: { errors } } = methods;

  const [result, setResult] = useState<string>();

  const handleSave = async () => {
    const extUser = getValues();
    console.log("Input ExtUser: " + JSON.stringify(extUser));
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
            <button className="btn" type="submit">Save</button>
          </div>
        </form>

      </div>
    </FormProvider>
  )
}