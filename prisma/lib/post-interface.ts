import { Post, } from "@prisma/client";
import prisma from "@/prisma/lib/prisma-singleton";

export async function createPost(post: Post) {
  try {
    console.log("post: " + JSON.stringify(post))
    const result = await prisma.post.create({
      data: {
        ...post,
      }
    })
    console.log("post result: " + JSON.stringify(result))
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error name: " + error.name + "error details: " + error.message)
    } else {
      console.log("Server error when writing post")
    }
    throw error;
  }
}

export async function findPostById(id: number) {
  try {
    const result = await prisma.post.findUnique({
      where: {
        id: id,
      },
    })
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

export async function findPostByUserId(userId: number, skip: number, take: number) {
  try {
    const result = await prisma.post.findMany({
      skip: skip,
      take: take,
      where: {
        authorId: userId,
      }
    })
    const count = await prisma.post.count({
      where: {
        authorId: userId,
      }
    })
    return { data: result, totalCount: count };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Read database error")
    }
    throw error
  }
}

export async function findPostByKeyword(skip: number, take: number, keyword?: string) {
  try {
    const result = await prisma.post.findMany({
      skip: skip,
      take: take,
      where: {
        OR: [
          {
            content: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            }
          }
        ]
      }
    });
    const count = await prisma.post.count({
      where: {
        OR: [
          {
            content: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            }
          }

        ]
      }
    });
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

export async function findAllPost(skip: number, take: number) {
  try {
    const result = await prisma.post.findMany({
      skip: skip,
      take: take,
    });
    const count = await prisma.post.count();
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

export async function deletePostById(id: number) {
  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      }
    })
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error name: ${error.name} error message: ${error.message}`);
    } else {
      console.log("Delete from database error")
    }
    throw error
  }
}