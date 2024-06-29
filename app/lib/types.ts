import { Email, Post, Product, Role, User } from "@prisma/client";

type GetDataType<Route extends string> =
  Route extends "user" ? User :
  Route extends "email" ? Email :
  Route extends "post" ? Post :
  Product
// Route extends "product" ? Product : undefined

type DataType = Product | User | Email | Post

type LinkType = {
  title: string,
  link: string,
}

export type { GetDataType, DataType, LinkType, }