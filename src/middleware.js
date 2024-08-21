import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { authConfig } from "./authConfig";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) =>
    new RegExp(`^${route}$`).test(nextUrl.pathname)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("1");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    console.log("3");

    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    console.log("12");

    return Response.redirect(new URL("/signin", nextUrl));
  }

  return null;
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
