import prisma from "@/prisma/lib/prisma-singleton";
import { ExtendUser } from "@/app/lib/types";

export async function createUser(extUser: ExtendUser) {
  try {
    const { roles, ...user } = extUser;
    const result = await prisma.user.create({
      data: {
        ...user,
        roles: { connect: roles?.map((item) => ({ id: item.id })) },
      },
      include: {
        roles: true,
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

export async function updateUser(extUser: ExtendUser) {
  try {
    const { roles, ...user } = extUser;

    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
        roles: {
          set: [],
          connect: roles?.map((item) => ({ id: item.id }))
        },
      },
      include: {
        roles: true,
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

export async function findUserById(param?: number) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: param,
      },
      include: {
        roles: true,
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

export async function findUserByEmail(email: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: true,
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

export async function findUserByName(param?: string, skip?: number, take?: number) {
  try {
    const users = await prisma.user.findMany({
      skip: skip,
      take: take,
      where: {
        name: {
          contains: param,
          mode: 'insensitive',
        },
      },
      include: {
        roles: true,
      }
    });
    const count = await getUserCount(param);
    return { data: users, totalCount: count };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error;
  }
}

export async function findAllUser(skip: number, take: number) {
  try {
    const result = await prisma.user.findMany({
      skip: skip,
      take: take,
      include: {
        roles: true,
      },
    });
    const count = await prisma.user.count();
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

export async function getUserCount(param?: string) {
  try {
    const result = await prisma.user.count({
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

export async function deleteUserById(params?: number) {
  console.log("deletUserById params: " + params);
  try {
    return await prisma.user.delete({
      where: {
        id: params,
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





