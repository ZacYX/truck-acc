import { WebPicture } from "@prisma/client";
import prisma from "./prisma-singleton";

export type PictureWithoutId = Omit<WebPicture, 'id'>;

export async function createWebPicture(picture: PictureWithoutId) {
  try {
    const result = await prisma.webPicture.create({
      data: {
        ...picture,
      }
    })
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name} `);
      console.error(`error message: ${error.message}`);
    } else {
      console.error("Write database error")
    }
    throw error;
  }
}

export async function createWebPictures(pictures: PictureWithoutId[]) {
  try {
    const result = await prisma.webPicture.createManyAndReturn({
      data: pictures,
    })
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name} `);
      console.error(`error message: ${error.message}`);
    } else {
      console.error("Write database error")
    }
    throw error;
  }
}

export async function updateWebPicture(picture: WebPicture) {
  try {
    if (!picture.id) {
      console.debug("No id to update picture");
      return;
    }
    const result = await prisma.webPicture.update({
      where: {
        id: picture.id,
      },
      data: {
        ...picture,
      }
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name} `);
      console.error(`error message: ${error.message}`);
    } else {
      console.error("Write database error")
    }
    throw error;
  }
}

export async function findWebPictureById(param: string) {
  try {
    const result = await prisma.webPicture.findUnique({
      where: {
        id: parseInt(param),
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name}`);
      console.error(`error message: ${error.message}`);
    } else {
      console.error("Read database error")
    }
    throw error;
  }
}

export async function deleteWebPictureById(id: string) {
  try {
    return await prisma.webPicture.delete({
      where: {
        id: parseInt(id),
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.error("Read database error")
    }
    throw error
  }
}

export async function deleteWebPictureByUrl(url: string) {
  try {
    return await prisma.webPicture.deleteMany({
      where: {
        url: url,
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.error("Read database error")
    }
    throw error
  }
}