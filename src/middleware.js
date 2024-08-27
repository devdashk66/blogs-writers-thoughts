// src/middleware.js (if using src directory)
// or simply middleware.js at the root level

import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// List of protected routes that require user authentication
const protectedRoutes = ["/profile", "/dashboard"];

// List of routes that shouldn't be accessible to authenticated users
const authRestrictedRoutes = ["/login", "/register"];

export async function middleware(req) {
  const { auth } = NextAuth({
    session: {
      strategy: "jwt",
    },
    providers: [],
  });
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Check if the request is for a protected route
  if (protectedRoutes.includes(pathname)) {
    if (!session?.user) {
      // If the user is not authenticated, redirect to login page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Check if the request is for an auth-restricted route
  if (authRestrictedRoutes.includes(pathname)) {
    if (session?.user) {
      // If the user is authenticated, redirect to profile page
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // If the route does not match any conditions, continue
  return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
  matcher: ["/profile", "/login", "/register"], // Add more routes if needed
};
