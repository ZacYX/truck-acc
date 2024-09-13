import { Address, Permission, Post, Product, Role, User } from "@prisma/client";

export type GetDataType<Route extends string> =
  Route extends "user" ? User :
  Route extends "post" ? Post :
  Product
// Route extends "product" ? Product : undefined

export type DataType = Product | User | Post | Role | Permission


export type ExtendRole = {
  permission: Permission[],
  user: User[],
} & Role;

export type ExtendUser = {
  address: Address,
  roles: Role[],
} & User;

export type ExtendPermission = {
  roles: Role[],
} & Permission;