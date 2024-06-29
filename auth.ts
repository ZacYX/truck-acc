import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  signOut,
  signIn,
  auth,
} = NextAuth({
  providers: [
    Github({
      profile(profile) {
        return {}
      },
    }),
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize(c) {
        // console.log("authorize 111111111111111111111111111111111111111111111111111111111111")
        const user = { id: "test1", email: "tesT@ex.com", password: "123", role: "admin1" }
        if (c.username === user.id && c.password === user.password) {
          return user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, account, profile, trigger, session }) {
      // console.log("Auth.ts jwt 333333333333333333333333333333333333333333333333333333333333")
      // console.log("token: " + JSON.stringify(token))
      // console.log("user: " + JSON.stringify(user))
      // console.log("account: " + JSON.stringify(account))
      // console.log("profile: " + JSON.stringify(profile))
      // console.log("trigger: " + JSON.stringify(trigger))
      // console.log("session: " + JSON.stringify(session))
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // session.userId = token.id;
      // console.log("Auth.ts session 444444444444444444444444444444444444444444444444444444 ")
      // console.log("session: " + JSON.stringify(session))
      // console.log("token: " + JSON.stringify(token))
      return session
    },
    // redirect({ url, baseUrl }) {
    //   console.log(`redierect url: ${url} baseUrl: ${baseUrl} `)
    //   return baseUrl
    // },
    signIn({ profile }) {
      // console.log("Auth.ts signin 222222222222222222222222222222222222222222222222222222222 ")
      // console.log("profile:  " + JSON.stringify(profile))
      // return profile?.email?.endsWith("@gmail.com") ?? false;
      return true
    }
  },
  pages: {
    // signIn: "/login",
    // signOut: "/logout",
  }
})