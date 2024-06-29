import { User } from "@prisma/client";
import prisma from "@/prisma/lib/prisma-singleton";

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
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Write database error")
    }
    throw error;
  }
}

export async function findUserById(param?: number) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: param,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function findUserByName(param?: string, skip?: number, take?: number) {
  try {
    const users = await prisma.user.findMany({
      skip: skip,
      take: take,
      where: {
        name: {
          contains: param,
          mode: 'insensitive',
        },
      },
    });
    const count = await getUserCount(param);
    return { data: users, totalCount: count };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function getUserCount(param?: string) {
  try {
    const result = await prisma.user.count({
      where: {
        name: {
          contains: param,
          mode: 'insensitive',
        },
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error
  }

}

export async function deleteUserById(params?: number) {
  console.log("deletUserById params: " + params);
  try {
    return await prisma.user.delete({
      where: {
        id: params,
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error
  }
}





