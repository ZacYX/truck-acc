"use client"

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "./lib/validation";
import { useContext, useState, useTransition } from "react"
import MessageBox from "./MessageBox";
import { registerUser } from "./actions/register-user";
import { MessageContext } from "./CardWrapper";
import type { Message } from "./CardWrapper";

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const { message, setMessage } = useContext(MessageContext);
  const [ispending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      const ret = await registerUser(data);
      if (setMessage) {
        setMessage(ret as Message);
      }
    })
  }

  const onInputChange = () => {
    if (setMessage) {
      setMessage({});
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="pt-4"
        label="Name"
        placeholder="Enter your name"
        labelPlacement="outside"
        disabled={ispending}
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name?.message}
        {...register("name", { onChange: onInputChange })}
      />
      <Input
        className="pt-4"
        type="email"
        label="Email"
        placeholder="Enter your email"
        labelPlacement="outside"
        disabled={ispending}
        isInvalid={errors.email ? true : false}
        errorMessage={errors.email?.message}
        {...register("email", { onChange: onInputChange })}
      />
      <Input
        className="pt-4 pb-4"
        type="password"
        label="Password"
        placeholder="******"
        labelPlacement="outside"
        disabled={ispending}
        isInvalid={errors.password ? true : false}
        errorMessage={errors.password?.message}
        {...register("password", { onChange: onInputChange })}
      />
      <MessageBox />
      <Button
        type="submit"
        disabled={ispending}
        className="w-full "
      >Sign up</Button>

    </form>
  )
}