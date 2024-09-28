import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectRoutes, publicRoutes } from "./routes";
import { redirect } from "next/navigation";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(`ROUTE: ${req.nextUrl.pathname}`);
  console.log("Is LoggedIn: ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPortectRoute = protectRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const url = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
      console.log(`isLoggedIn redirect to: `, url.toString())
      return Response.redirect(url);
    }
    return;
  }

  if (!isLoggedIn && isPortectRoute) {
    const url = new URL("/auth/login", nextUrl);
    console.log(`! isLoggedIn redirect to: `, url.toString());
    return Response.redirect(url);
  }

  return;

})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}