// import { Address, } from "@prisma/client";
// import prisma from "@/prisma/lib/prisma-singleton";

// export async function createAddress(address: Address) {
//   try {
//     const result = await prisma.address.create({
//       data: {
//         ...address,
//       }
//     })
//     return result;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`error name: ${error.name} error message: ${error.message}`);
//     } else {
//       console.log("Write database error")
//     }
//     throw error
//   }
// }