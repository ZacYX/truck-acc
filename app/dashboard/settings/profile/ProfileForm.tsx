"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['USER', 'ADMIN']),
});

type Schema = z.infer<typeof schema>;

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const { register, handleSubmit, reset } = useForm<Schema>({
    defaultValues: session?.user,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    console.log("Submitted data: " + JSON.stringify(data));
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      update();
    }
  }

  useEffect(() => {
    reset(session?.user);
  }, [session])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div className="flex flex-col">
        <label>Name</label>
        <input
          placeholder="Your name"
          className="border-b-2 outline-none focus:border-zinc-400"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col">
        <label>Image</label>
        <input
          placeholder="Not set"
          className="border-b-2 outline-none focus:border-zinc-400"
          {...register("image")}
        />
      </div>
      <div className="flex flex-col">
        <label>ID</label>
        <input
          disabled
          className="border-b-2 outline-none focus:border-zinc-400"
          {...register("id")}
        />
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <input
          disabled
          className="border-b-2 outline-none focus:border-zinc-400"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col">
        <label>Role</label>
        <input
          disabled
          className="border-b-2 outline-none focus:border-zinc-400"
          {...register("role")}
        />
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-row justify-center">
        <Button type="submit" >
          Save
        </Button>
      </div>
    </form>
  )
}