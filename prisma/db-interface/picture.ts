import { Picture } from "@prisma/client";
import prisma from "./prisma-singleton";

export type PictureWithoutId = Omit<Picture, 'id'>;

export async function createPicture(picture: PictureWithoutId) {
  try {
    const result = await prisma.picture.create({
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

export async function createPictures(pictures: PictureWithoutId[]) {
  try {
    const result = await prisma.picture.createManyAndReturn({
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

export async function updatePicture(picture: Picture) {
  try {
    const { id, ...data } = picture;
    if (!id) {
      console.debug("No id to update picture");
      return;
    }
    const result = await prisma.picture.update({
      where: {
        id: id,
      },
      data: {
        ...data,
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

export async function findPictureById(param: string) {
  try {
    const result = await prisma.picture.findUnique({
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

export async function deletePictureById(id: string) {
  try {
    return await prisma.picture.delete({
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

export async function deletePictureByUrl(url: string) {
  try {
    return await prisma.picture.deleteMany({
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