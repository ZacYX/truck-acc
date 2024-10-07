"use client";

import { Button } from "@nextui-org/button";
import { User, UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const disabledItems = ["id", "email", "emailVerified", "password"];

export default function UserDetailsForm({ id }: { id: string }) {
  const [user, setUser] = useState<User>();

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  });

  const fetchUser = async () => {
    const response = await fetch(`/api/user?id=${id}`);
    if (!response.ok) {
      console.log(`fetch user ${id} failed`);
      return;
    }
    const user = await response.json();
    if (user.id !== id) {
      console.log(`fetch user ${id} failed`);
    }
    console.log(JSON.stringify(user));
    setUser(user);
  }

  const submitHandler = async (data: User) => {
    // console.log(`data submitted: ${JSON.stringify(data)}`);
    const response = await fetch(`/api/user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      console.log(`update user failed`);
    }

  }

  useEffect(() => {
    reset(user);
  }, [user])

  useEffect(() => {
    fetchUser();
  }, [id])

  return (
    <div>

      <div className="border-b-2 py-2 mb-8 flex flex-row justify-between items-center">
        <h2 className="font-semibold">User details</h2>
      </div>
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        {
          user &&
          Object.keys(user).map((key, index) => (
            (key !== "role") &&
            <div className="flex flex-col" key={index} >
              <label>{key.toUpperCase()}</label>
              <input
                className="border-b-2 outline-none focus:border-zinc-400"
                disabled={disabledItems.includes(key)}
                placeholder="Not set"
                {...register(key as keyof User)}
              />
            </div>
          ))
        }
        <div className="flex flex-col" >
          <label>ROLE</label>
          <select
            className="border-b-2 outline-none focus:border-zinc-400"
            {...register("role")}
          >
            <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
            <option value={UserRole.USER}>{UserRole.USER}</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-row justify-center">
          <Button type="submit" >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}