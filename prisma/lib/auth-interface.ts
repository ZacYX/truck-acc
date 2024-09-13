import { Credential } from "@prisma/client";
import prisma from "@/prisma/lib/prisma-singleton";

export async function findAccountByLoginName(userName: string) {
  const result = await prisma.credential.findUnique({
    where: {
      loginName: userName,
    },
    include: {
      user: true,
    }
  })

  return result;
}