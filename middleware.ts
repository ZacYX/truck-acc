import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectDirs, protectRoutes, publicRoutes } from "./routes";
import { redirect } from "next/navigation";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(`ROUTE: ${req.nextUrl.pathname}`);
  console.log("LoggedIn: ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectRoute = protectRoutes.includes(nextUrl.pathname);
  let isProtectDir;
  for (let entry of protectDirs) {
    console.log(`entry in porotectDirs: ${entry}`);
    console.log(`nextUrl.pathname.search(entry): ${nextUrl.pathname.search(entry)}`)
    if (nextUrl.pathname.search(entry) > -1) {
      isProtectDir = true;
      console.log("protected dir");
      break;
    }
  }

  if (isApiAuthRoute) {
    console.log("api auth route;")
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const url = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
      console.log(`Auth route LoggedIn redirect to: `, url.toString());
      return Response.redirect(url);
    }
    return;
  }

  if (!isLoggedIn && (isProtectRoute || isProtectDir)) {
    const url = new URL("/auth/login", nextUrl);
    console.log(`Logged out redirect to: `, url.toString());
    return Response.redirect(url);
  }

  return;

})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}

function foreach(arg0: boolean) {
  throw new Error("Function not implemented.");
}
