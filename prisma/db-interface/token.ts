import prisma from "./prisma-singleton";
import { v4 as uuidv4 } from "uuid";


export async function createVerificationToken(email: string) {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

    const existingToken = await findVerificationTokenByEmail(email);
    if (existingToken) {
      deleteVerificationTokenByToken(existingToken.token);
    }

    const result = await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      }
    });

    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("create verification token error!")
    }
    throw error;
  }
}

export async function findVerificationTokenByToken(token: string) {
  try {
    const result = await prisma.verificationToken.findUnique({
      where: { token: token }
    });
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("find verification token by toke error!");
    }
    throw error;
  }
}
export async function findVerificationTokenByEmail(email: string) {
  try {
    const result = await prisma.verificationToken.findFirst({
      where: { email: email }
    });
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("find verification token by email error!");
    }
    throw error;
  }
}

export async function deleteVerificationTokenByToken(token: string) {
  try {
    const result = await prisma.verificationToken.delete({
      where: {
        token: token,
      }
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} `);
      console.log(`error message: ${error.message}`);
    } else {
      console.log("find verification token by email error!");
    }
    throw error;
  }
}