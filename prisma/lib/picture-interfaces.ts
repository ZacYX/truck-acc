import { Picture, } from "@prisma/client";
import prisma from "@/prisma/lib/prisma-singleton";

export async function createPicture(picture: Picture) {
  console.log("picture: " + JSON.stringify(picture))
  const result = await prisma.picture.create({
    data: {
      ...picture,
    }
  })
  console.log("picture result: " + JSON.stringify(result))
}

