import { Picture, Product, } from "@prisma/client";
import prisma from "@/prisma/db-interface/prisma-singleton";

export type OmitProduct = Omit<Product, 'id' | 'createAt' | 'updateAt'>;

export async function createProduct(product: OmitProduct) {
  try {
    const result = await prisma.product.create({
      data: {
        ...product
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

export async function updateProduct(productid: number, product: OmitProduct) {
  try {
    const result = await prisma.product.update({
      where: {
        id: productid,
      },
      data: {
        ...product,
      },
      include: {
        categories: true,
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

export async function connectCategories(productid: number, categories: { id: number }[]) {
  try {
    const result = await prisma.product.update({
      where: {
        id: productid,
      },
      data: {
        categories: {
          connect: categories,
        }
      },
      include: {
        categories: true,
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

export async function disconnectCategories(productid: number, categories: { id: number }[]) {
  try {
    const result = await prisma.product.update({
      where: {
        id: productid,
      },
      data: {
        categories: {
          disconnect: categories,
        }
      },
      include: {
        categories: true,
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

export async function findProductById(params: number) {
  try {
    const result = await prisma.product.findUnique({
      where: {
        id: params,
      },
      include: {
        // categories: {
        //   select: {
        //     id: true,
        //   }
        // },
        categories: true,
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

export async function findProductBySku(params: string) {
  try {
    const result = await prisma.product.findUnique({
      where: {
        sku: params,
      },
      include: {
        categories: true,
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

export async function findProductByName(skip: number, take: number, productName: string) {
  try {
    const result = await prisma.product.findMany({
      skip: skip,
      take: take,
      where: {
        name: {
          contains: productName,
          mode: "insensitive",
        }
      },
      include: {
        categories: true,
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

export async function findProductByCategory(skip: number, take: number, category: string) {
  try {
    const result = await prisma.product.findMany({
      skip: skip,
      take: take,
      where: {
        categories: {
          some: {
            id: parseInt(category),
          },
        },
      },
      include: {
        categories: true,
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

export async function findAllProduct(skip: number, take: number) {
  try {
    const result = await prisma.product.findMany({
      skip: skip,
      take: take,
      include: {
        categories: true,
        images: true,
        //sorting in relation fields does not work
        // images: {
        //   orderBy: {
        //     order: 'asc',
        //   },
        // }
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

export async function deleteProductById(params: number) {
  try {
    return await prisma.product.delete({
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

export async function getProductCount(param?: string) {
  try {
    const result = await prisma.product.count({
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