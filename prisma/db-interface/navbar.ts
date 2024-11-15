import prisma from "./prisma-singleton";
import { Category, NavbarItem } from "@prisma/client";

export async function createNavbarItem(navbarItem: NavbarItem) {
  try {
    const result = await prisma.navbarItem.create({
      data: {
        ...navbarItem,
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

export async function updateNavbarItem(navbarItem: NavbarItem) {
  try {
    const { id, ...data } = navbarItem;
    if (!id) {
      console.log("No id to update navbar item ");
      return;
    }
    const result = await prisma.navbarItem.update({
      where: {
        id: id
      },
      data: {
        ...data,
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

export async function getNavbarItemCount(param?: string) {
  try {
    const result = await prisma.navbarItem.count();
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

export async function findAllNavbarItems() {
  try {
    const result = await prisma.navbarItem.findMany();
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


export async function deleteNavbarItemById(id: string) {
  try {
    return await prisma.navbarItem.delete({
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