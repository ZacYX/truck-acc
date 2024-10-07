/**
 * A public accessable routes array
 * These routes do not need authentication
 */
export const publicRoutes = [
  "/"
]

/**
 * An arry of routes thar are not accessible 
 * if not logged in
 */
export const protectRoutes = [
  "/aaaa",
]

/**
 * An arry of directories that are not accessible 
 * if not logged in
 */
export const protectDirs = [
  "/dashboard",
]

/**
 * An array of routes that are used for auth
 * These routes will redirect logged in users to /dashboard
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  // "/auth/error",
]

/**
 * Routes that start with this prefix are used for API 
 * authentication purpose
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logged in
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard/settings/profile";
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";