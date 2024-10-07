// types/next-auth.d.ts
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string; // Add your custom role property
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      role: UserRole; // Extend the session user with the role
    };
  }

  interface JWT {
    role: UserRole; // Extend JWT to store role
  }

}
