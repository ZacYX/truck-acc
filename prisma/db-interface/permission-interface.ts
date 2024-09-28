// import { Permission, Role } from "@prisma/client";
// import prisma from "./prisma-singleton";
// import { ExtendPermission } from "@/app/lib/types";
// import { connect } from "http2";

// export async function createPermission(permission: ExtendPermission) {

//   try {
//     const result = await prisma.permission.create({
//       data: {
//         title: permission.title,
//         details: permission.details,
//         roles: {
//           connect: permission.roles?.map(item => ({ id: item.id }))
//         }
//       }
//     })
//     return result;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Write database error")
//     }
//     throw error;
//   }
// }

// export async function updatePermission(permission: ExtendPermission) {

//   try {
//     const result = await prisma.permission.update({
//       where: {
//         id: permission.id,
//       },
//       data: {
//         title: permission.title,
//         details: permission.details,
//         roles: {
//           set: [],
//           connect: permission.roles?.map(item => ({ id: item.id }))
//         }
//       }
//     })
//     return result;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Write database error")
//     }
//     throw error;
//   }
// }

// export async function findPermissionById(id: number) {
//   try {
//     const result = await prisma.permission.findUnique({
//       where: {
//         id: id,
//       },
//       include: {
//         roles: true,
//       }
//     })
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

// export async function findPermissionByName(skip: number, take: number, name: string) {
//   try {
//     const result = await prisma.permission.findMany({
//       skip: skip,
//       take: take,
//       where: {
//         title: {
//           contains: name,
//           mode: "insensitive",
//         }
//       },
//       include: {
//         roles: true,
//       }
//     });
//     const count = await prisma.permission.count({
//       where: {
//         title: {
//           contains: name,
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

// export async function findAllPermission(skip: number, take: number) {
//   try {
//     const result = await prisma.permission.findMany({
//       skip: skip,
//       take: take,
//       include: {
//         roles: true,
//       }
//     });
//     const count = await prisma.permission.count();
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

// export async function deletePermissionById(id: number) {
//   try {
//     return await prisma.permission.delete({
//       where: {
//         id: id,
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