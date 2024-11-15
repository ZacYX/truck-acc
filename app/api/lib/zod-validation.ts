
import { isValid, z } from "zod";

export const isNumber = z.number({ invalid_type_error: "Not a number" });
export const isString = z.string({ invalid_type_error: "Not a string" });

export const validateProduct = z.object({
  sku: z.string(),
  name: z.string(),
  details: z.string().nullable(),
  brand: z.string().nullable(),
  inventory: z.number().nullable(),
  price: z.number().nullable(),
  salePrice: z.number().nullable(),
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
  email: z.string().email().optional(),
  emailVerified: z.string().datetime().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
})

export const validateToken = z.object({
  email: z.string().email(),
})

export const validateEmail = z.object({
  from: z.string().email(),
  to: z.union([z.array(z.string().email()), z.string().email()]),
  subject: z.string().optional(),
  text: z.string().optional(),
  html: z.string().optional()
})

export const validateCategory = z.object({
  name: z.string(),
  details: z.string().optional(),
})

export const validatePicture = z.object({
  alt: z.string().nullable(),
  height: z.number().nullable(),
  width: z.number().nullable(),
  url: z.string(),
  order: z.string().nullable()
})

export const validateWebInfo = z.object({
  name: z.string(),
  category: z.string().nullable(),
  title: z.string().array(),
  content: z.string().array(),
})

export const validateNavbarItem = z.object({
  title: z.string(),
  details: z.string().optional(),
  link: z.string(),
  order: z.string().optional(),
})