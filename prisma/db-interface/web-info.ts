import { WebInfo } from "@prisma/client";
import prisma from "@/prisma/db-interface/prisma-singleton";

export async function createWebInfo(webInfo: Partial<WebInfo>) {
  if (!webInfo.name) {
    console.error(`Need a unique name to create webinfo in database`);
    return;
  }
  const { id, createAt, updateAt, ...data } = webInfo;
  try {
    const result = await prisma.webInfo.create({
      data: {
        ...data as WebInfo,
      }
    });
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

export async function updateWebInfo(webInfo: Partial<WebInfo>) {
  if (!webInfo.id || !webInfo.name) {
    console.error(`Must have id and name to update webInfo`);
    return;
  }
  try {
    const result = await prisma.webInfo.update({
      where: {
        id: webInfo.id,
      },
      data: {
        ...webInfo,
      },
    });
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

export async function findWebInfoById(params: number) {
  try {
    const result = await prisma.webInfo.findUnique({
      where: {
        id: params,
      },
      include: {
        images: true,
      }
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

export async function findWebInfoByName(params: string) {
  try {
    const result = await prisma.webInfo.findUnique({
      where: {
        name: params,
      },
      include: {
        images: true,
      }
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

export async function findWebInfoByCategory(params: string) {
  try {
    const result = await prisma.webInfo.findMany({
      where: {
        category: params,
      },
      include: {
        images: true,
      }
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

export async function findAllWebInfo() {
  try {
    const result = await prisma.webInfo.findMany({
      include: {
        images: true,
      }
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

export async function deleteWebInfoById(params: number) {
  try {
    return await prisma.webInfo.delete({
      where: {
        id: params,
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
