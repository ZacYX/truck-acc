import prisma from "@/prisma/prisma";
import { Address, Email, Picture, Post, Product, User } from "@prisma/client";

export async function createUser(user: User) {
  console.log("user: " + JSON.stringify(user))
  const result = await prisma.user.create({
    data: {
      ...user,
    }
  })
  console.log("user result: " + JSON.stringify(result))
  return result;
}

export async function createPost(post: Post) {
  console.log("post: " + JSON.stringify(post))
  const result = await prisma.post.create({
    data: {
      ...post,
    }
  })
  console.log("post result: " + JSON.stringify(result))
  return result;
}

export async function createProduct(product: Product) {
  console.log("product: " + JSON.stringify(product))
  const result = await prisma.product.create({
    data: {
      ...product,
    }
  })
  console.log("product result: " + JSON.stringify(result))
}

export async function createAddress(address: Address) {
  console.log("address: " + JSON.stringify(address))
  const result = await prisma.address.create({
    data: {
      ...address,
    }
  })
  console.log("address result: " + JSON.stringify(result))
}

export async function createPicture(picture: Picture) {
  console.log("picture: " + JSON.stringify(picture))
  const result = await prisma.picture.create({
    data: {
      ...picture,
    }
  })
  console.log("picture result: " + JSON.stringify(result))
}

export async function createEmail(email: Email) {
  console.log("email: " + JSON.stringify(email))
  const result = await prisma.email.create({
    data: {
      ...email,
    }
  })
  console.log("email result: " + JSON.stringify(result))
  return result;
}