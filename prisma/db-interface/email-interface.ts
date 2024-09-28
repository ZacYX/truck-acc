// import { Email } from "@prisma/client";
// import prisma from "@/prisma/lib/prisma-singleton";

// export async function createEmail(email: Email) {
//   try {
//     const result = await prisma.email.create({
//       data: {
//         ...email,
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


// export async function findEmailById(id: number) {
//   try {
//     const result = await prisma.email.findUnique({
//       where: {
//         id: id,
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

// export async function findEmailByUserId(userId: number, skip: number, take: number) {
//   try {
//     const result = await prisma.email.findMany({
//       skip: skip,
//       take: take,
//       where: {
//         userId: userId,
//       }
//     })
//     const count = await prisma.email.count({
//       where: {
//         userId: userId,
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

// export async function findEmailByEmailAddress(skip: number, take: number, emailAddress?: string) {
//   try {
//     const result = await prisma.email.findMany({
//       skip: skip,
//       take: take,
//       where: {
//         emailAddress: {
//           contains: emailAddress,
//           mode: "insensitive",
//         }
//       }
//     })
//     const count = await prisma.email.count({
//       where: {
//         emailAddress: {
//           contains: emailAddress,
//           mode: "insensitive",
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

// export async function findAllEmail(skip: number, take: number) {
//   try {
//     const result = await prisma.email.findMany({
//       skip: skip,
//       take: take,
//     });
//     const count = await prisma.email.count();
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


// export async function deletEmailById(id: number) {
//   console.log("deletEmailById: " + id);
//   try {
//     return await prisma.email.delete({
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

