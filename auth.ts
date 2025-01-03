import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/db-interface/prisma-singleton";
import { UserRole } from "@prisma/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      if (!user || !user.id) {
        console.log(`No user found in linkAccount!`);
        return;
      }
      const data = {
        id: user.id,
        emailVerified: new Date(),
      }
      try {
        const response = await fetch(`${API_URL}/api/user`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
      } catch (error) {
        console.error(`Update email verified error in linkAccount!`);
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        console.log("No need to verify")
        return true;
      }

      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id", user?.id ?? "");
        const respone = await fetch(`${API_URL}/api/user?${searchParams}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
        if (!respone.ok) {
          console.log(`Find user by id in auth singin failed`);
          return false;
        }
        const existingUser = await respone.json();
        if (!existingUser.emailVerified) {
          console.log(`Email has not been verified!`);
          return false;
        }
      } catch (error) {
        console.log(`internal error when fetching user `);
        console.log(error);
      }
      return true;
    },
    async jwt({ token }) {
      console.debug("jwt in auth called");
      if (!token.sub) {
        console.log(`No token sub!`);
        return token;
      }
      const reqParams = new URLSearchParams();
      reqParams.set("id", token.sub)
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${API_URL}/api/user?${reqParams}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
        if (!response.ok) {
          console.log(`Fetch user failed!`);
          return token;
        }
        const existingUser = await response.json();
        if (!existingUser) {
          console.log(`No user found!`);
        }
        token.name = existingUser.name;
        token.picture = existingUser.image;
        token.role = existingUser.role;
      } catch (error) {
        console.log(error);
      }
      return token;
    },
    async session({ session, token }) {
      console.debug("session in auth called");
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.name && session.user) {
        session.user.name = token.name;
      }
      if (token.picture && session.user) {
        session.user.image = token.picture;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
})