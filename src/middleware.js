import NextAuth from "next-auth";
import { getAuthUser } from "@/utils/action";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes
} from "./routes";
import { authConfig } from "./authConfig";

const { auth } = NextAuth(authConfig);

export default async function middleware(req) {
  const { nextUrl } = req;
  const session = await getAuthUser();
  const isLoggedIn = !!session;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdmin = process.env.ADMIN_USER_ID === session;
  const isPublicRoute = publicRoutes.some((route) =>
    new RegExp(`^${route}$`).test(nextUrl.pathname)
  );
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isLoggedIn && !isAdmin && isAdminRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }


  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
