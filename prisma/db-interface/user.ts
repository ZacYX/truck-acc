import { User } from "@prisma/client";
import prisma from "./prisma-singleton";

export async function createUser(user: User) {
  try {
    const result = await prisma.user.create({
      data: {
        ...user,
      }
    })
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("Write database error")
    }
    throw error;
  }

}

export async function findUserById(param?: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: param,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name}`);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name}`);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function updateUser(user: User) {
  try {
    if (!user.email) {
      console.log("No email to update user info");
      return;
    }
    const result = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        ...user,
      }
    });
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("Write database error")
    }
    throw error;
  }

}