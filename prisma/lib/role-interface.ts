import { Permission, Role } from "@prisma/client";
import prisma from "./prisma-singleton";
import { ExtendRole } from "@/app/lib/types";

export async function createRole(role: ExtendRole) {

  try {
    const result = await prisma.role.create({
      data: {
        title: role.title,
        details: role.details,
        permission: {
          connect: role.permission.map((item) => ({ id: item.id })),
        }
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

export async function updateRole(role: ExtendRole) {
  try {
    const result = await prisma.role.update({
      where: {
        id: role.id,
      },
      data: {
        title: role.title,
        details: role.details,
        permission: {
          set: [],
          connect: role.permission.map((item) => ({ id: item.id })),
        }
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

export async function findRoleById(id: number) {
  try {
    const result = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        permission: true,
        user: true,
      }
    })
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

export async function findRoleByName(skip: number, take: number, name: string) {
  try {
    const result = await prisma.role.findMany({
      skip: skip,
      take: take,
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        }
      },
      include: {
        permission: true,
        user: true,
      }
    });
    const count = await prisma.role.count({
      where: {
        title: {
          contains: name,
          mode: "insensitive"
        }
      }
    })
    return { data: result, totalCount: count };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function findAllRole(skip: number, take: number) {
  try {
    const result = await prisma.role.findMany({
      skip: skip,
      take: take,
      include: {
        permission: true,
        user: true,
      },
    });
    const count = await prisma.role.count();
    return { data: result, totalCount: count }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error
  }
}

export async function deleteRoleById(id: number) {
  try {
    return await prisma.role.delete({
      where: {
        id: id,
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Delete from database error")
    }
    throw error;
  }
}