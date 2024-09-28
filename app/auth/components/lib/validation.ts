import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required!!!" })
})

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be more than 6 characters!" })
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
})

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
})