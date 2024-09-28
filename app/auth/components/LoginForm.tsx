"use client"

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "./lib/validation"
import { loginUser } from "./actions/login-user"
import { useContext, useState, useTransition } from "react"
import MessageBox from "./MessageBox"
import { MessageContext } from "./CardWrapper"
import Link from "next/link"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const { setMessage } = useContext(MessageContext);
  const [ispending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const ret = await loginUser(data);
      setMessage!(ret);
      const session = await getSession()
      if (session && session.user) {
        router.push(DEFAULT_LOGIN_REDIRECT);
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
      <button
        className="hover:underline text-sm "
      >
        <Link href={"/auth/reset-password"}>
          Forgot Passwor?
        </Link>
      </button>
      <MessageBox />
      <Button
        type="submit"
        disabled={ispending}
        className="w-full "
      >Sign in</Button>

    </form>
  )
}