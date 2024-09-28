"use client"

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useTransition } from "react"
import MessageBox from "./MessageBox"
import { MessageContext } from "./CardWrapper"
import { newPasswordSchema } from "./lib/validation"
import { newPassword } from "./actions/new-password"
import { useSearchParams } from "next/navigation"

export default function NewPasswordForm() {
  const { setMessage } = useContext(MessageContext);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    console.log("No token in url");
    setMessage!({ error: "No token in url" });
  }

  const { register, handleSubmit, formState: { errors } }
    = useForm<z.infer<typeof newPasswordSchema>>({
      resolver: zodResolver(newPasswordSchema),
      defaultValues: {
        password: "",
      }
    });

  const [ispending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof newPasswordSchema>) => {
    startTransition(async () => {
      const ret = await newPassword(data, token);
      if (setMessage) {
        setMessage(ret);
      }
    })
  }

  const onInputChange = () => setMessage!({});

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="pt-4"
        type="password"
        label="New password"
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
      >Submit new password</Button>

    </form>
  )
}