import { ProductCategory } from "./data";
import { AddressType, Role } from "@prisma/client";

type LinkType = {
  title: string,
  link: string,
}

// enum Role {
// SUBSCRIBER,
// POSTER,
// CUSTOMER,
// }
// 
// enum Size {
// Small,
// Medium,
// Large,
// XLarge,
// }
// 
// enum Color {
// Red,
// Green,
// Blue
// }
// 
// enum Category {
// TOPPER,
// RACK,
// TENT,
// EQUIPMENT
// }
// 
// enum AddressType {
// DEFAULT,
// SHIPPING,
// BILLING
// }

type User = {
  id: number;
  name: string;
  password: string;
  phones: string[];
  roles: Role[];
}

type Post = {
  id: number;
  title: string
  content?: string
  authorId: number
}

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  details: string;
  pictures: Picture[];
  quantity: number;
  price: number;

}

type Picture = {
  id: number,
  name?: string,
  width: number,
  height: number,
  url: string,
  productId?: number
}


type Address = {
  id: number,
  unit: string,
  street: string,
  city: string,
  provice: string,
  country: string,
  zip: string,
  user: User
  userId: number
  addressType: AddressType[]
}

type Email = {
  id: number,
  emailAddress: string,
  isVerified: boolean,
  userId: number,
}

export type { LinkType, User, Post, Product, Picture, Address, Email }