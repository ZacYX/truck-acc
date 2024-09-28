// import { Product, } from "@prisma/client";
// import prisma from "@/prisma/lib/prisma-singleton";

// export async function createProduct(product: Product) {
//   console.log("product: " + JSON.stringify(product))
//   try {
//     const result = await prisma.product.create({
//       data: {
//         ...product,
//       }
//     })
//     return result

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Write database error")
//     }
//     throw error;

//   }
// }

// export async function findProductById(params: number) {
//   try {
//     const result = await prisma.product.findUnique({
//       where: {
//         id: params,
//       },
//     });
//     return result;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Read database error")
//     }
//     throw error;
//   }
// }

// export async function findProductBySku(params: string) {
//   try {
//     const result = await prisma.product.findUnique({
//       where: {
//         sku: params,
//       },
//     });
//     return result;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Read database error")
//     }
//     throw error;
//   }
// }

// export async function findProductByName(skip: number, take: number, productName: string) {
//   try {
//     const result = await prisma.product.findMany({
//       skip: skip,
//       take: take,
//       where: {
//         name: {
//           contains: productName,
//           mode: "insensitive",
//         }
//       },
//     });
//     const count = await prisma.product.count({
//       where: {
//         name: {
//           contains: productName,
//           mode: "insensitive"
//         }
//       }
//     })
//     return { data: result, totalCount: count };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Read database error")
//     }
//     throw error;
//   }
// }

// export async function findAllProduct(skip: number, take: number) {
//   try {
//     const result = await prisma.product.findMany({
//       skip: skip,
//       take: take,
//     });
//     const count = await prisma.product.count();
//     return { data: result, totalCount: count }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Read database error")
//     }
//     throw error
//   }
// }

// export async function deleteProductById(params: number) {
//   try {
//     return await prisma.product.delete({
//       where: {
//         id: params,
//       }
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Delete from database error")
//     }
//     throw error;
//   }
// }
