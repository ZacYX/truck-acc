import prisma from "./prisma-singleton";
import { Category } from "@prisma/client";

export async function createCategory(category: Category) {
  try {
    const result = await prisma.category.create({
      data: {
        ...category,
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

export async function updateCategory(category: Category) {
  try {
    if (!category.id) {
      console.log("No id to update category info");
      return;
    }
    const result = await prisma.category.update({
      where: {
        id: category.id
      },
      data: {
        ...category,
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

export async function findAllCategory(skip: number, take: number) {
  try {
    const result = await prisma.category.findMany({
      skip: skip,
      take: take,
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

export async function getCategoryCount(param?: string) {
  try {
    const result = await prisma.category.count({
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

export async function deleteCategoryById(id: string) {
  try {
    return await prisma.category.delete({
      where: {
        id: parseInt(id),
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