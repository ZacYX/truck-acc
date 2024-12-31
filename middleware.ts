import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectDirs, protectRoutes, publicRoutes } from "./routes";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  // console.debug(`req.auth: ${JSON.stringify(req.auth)}`);
  const isLoggedIn = !!req.auth?.user;
  // console.debug(`ROUTE: ${req.nextUrl.pathname}`);
  // console.debug("req.auth: ", req.auth);
  // console.debug("isLoggedIn: ", isLoggedIn);

  await logVisit(req);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectRoute = protectRoutes.includes(nextUrl.pathname);
  let isProtectDir;
  for (let entry of protectDirs) {
    console.debug(`entry in porotectDirs: ${entry}`);
    console.debug(`nextUrl.pathname.search(entry): ${nextUrl.pathname.search(entry)}`)
    if (nextUrl.pathname.search(entry) > -1) {
      isProtectDir = true;
      console.debug("protected dir");
      break;
    }
  }

  if (isApiAuthRoute) {
    console.debug("api auth route;")
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const url = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
      console.debug(`Auth route LoggedIn redirect to: `, url.toString());
      return Response.redirect(url);
    }
    return;
  }

  if (!isLoggedIn && (isProtectRoute || isProtectDir)) {
    const url = new URL("/auth/login", nextUrl);
    console.debug(`Logged out redirect to: `, url.toString());
    return Response.redirect(url);
  }

  return;

})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}

const logVisit = async (request: NextRequest) => {
  const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("host") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const pageUrl = request.url;
  const accessTime = new Date().toISOString();

  // Prepare the log data
  const logData = {
    ipAddress,
    userAgent,
    pageUrl,
    accessTime,
  };

  // Send the log data to the Spring Boot backend
  try {
    await fetch("https://goxmore.com/apitavt/logvisit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to log visit:", error.message);
    } else {
      console.error("Failed to log visit: error type unknow");
    }
  }
}
