
import { isValid, z } from "zod";

export const isNumber = z.number({ invalid_type_error: "Not a number" });
export const isString = z.string({ invalid_type_error: "Not a string" });

export const validateProduct = z.object({
  sku: z.string(),
  name: z.string(),
  details: z.string(),
  quantity: z.number(),
  price: z.number(),
  category: z.number(),
  size: z.string(),
  color: z.string(),
})

export const validatePost = z.object({
  title: z.optional(z.string()),
  content: z.optional(z.string()),
  authorId: z.number(),
})

export const validateRole = z.object({
  title: z.string(),
  details: z.string(),
  permission: z.optional(z.array(z.object({
    id: z.number(),
    title: z.string(),
    details: z.string(),
  })))
})

export const validatePermission = z.object({
  title: z.string(),
  details: z.string(),
})

export const validateUser = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  // emailVerified: z.string().datetime().optional(),
  image: z.string().optional(),
  roles: z.optional(z.array(z.object({
    title: z.string(),
    detais: z.string().optional(),
  }))),
})