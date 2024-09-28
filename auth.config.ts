import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { loginSchema } from "./app/auth/components/lib/validation";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google,
    Github,
    Credentials({
      // credentials: {
      //   email: {},
      //   password: {}
      // },
      authorize: async (credentials) => {
        let user = null
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const validateFields = loginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const reqParams = new URLSearchParams();
          reqParams.set("email", email);
          try {
            const response = await fetch(`${API_URL}/api/user?${reqParams}`, {
              method: "GET",
              headers: { "content-type": "application/json" },
            })
            if (response.ok) {
              const user = await response.json();
              if (!user || !user.password) return null;
              console.log("fetch user: ", JSON.stringify(user));
              const passwordMatch = await bcrypt.compare(password, user.password);
              if (passwordMatch) return user;
            }
            return null;

          } catch (error) {
            console.log("error: ", error);
          }
        }

        return null;
      },

    }
    ),
  ],
} satisfies NextAuthConfig