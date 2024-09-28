"use client"

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState, useTransition } from "react"
import MessageBox from "./MessageBox"
import { MessageContext } from "./CardWrapper"
import { resetPassword } from "./actions/reset-password"
import { resetPasswordSchema } from "./lib/validation"

export default function ResetPasswordForm() {
  const { register, handleSubmit, formState: { errors } }
    = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
        email: "",
      }
    });

  const { setMessage } = useContext(MessageContext);
  const [ispending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      const ret = await resetPassword(data);
      if (setMessage) {
        setMessage(ret);
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
      <MessageBox />
      <Button
        type="submit"
        disabled={ispending}
        className="w-full "
      >Reset password</Button>

    </form>
  )
}