import { PasswordLogin } from "@prisma/client";
import prisma from "@/prisma/lib/prisma-singleton";

export async function getAccountByUserAndPassword(userName: string) {
  const result = await prisma.passwordLogin.findUnique({
    where: {
      loginName: userName,
    }
  })

  return result;
}

export async function getAccountByEmailAndPassword(email: string) {
  const result = await prisma.passwordLogin.findUnique({
    where: {
      loginEmail: email,
    }
  })

  return result;

}