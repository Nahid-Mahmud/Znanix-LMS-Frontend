import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AuthRoutes = ["/auth/signin", "/auth/signup"];
const adminRoutes = ["/admin-dashboard"];
const instructorRoutes = ["/instructor-dashboard"];
const moderatorRoutes = ["/moderator-dashboard"];
const studentRoutes = ["/student-dashboard"];
const protectedRoutes = [...adminRoutes, ...instructorRoutes, ...moderatorRoutes, ...studentRoutes];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // If no access token, redirect to signin unless it's an auth route
  if (!accessToken) {
    if (AuthRoutes.includes(pathname) || pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Decode the token to determine the role
  let decodedData = null;
  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decodedData = jwtDecode(accessToken) as { role: string };
  }
  const role = decodedData?.role;

  // If user is logged in and trying to access registration or login page, redirect them
  if (AuthRoutes.includes(pathname) || pathname.startsWith("/auth")) {
    // Redirect to dashboard based on role
    let dashboard = "/";
    if (role === "ADMIN" || role === "SUPER_ADMIN") dashboard = "/admin-dashboard";
    else if (role === "INSTRUCTOR") dashboard = "/instructor-dashboard";
    else if (role === "MODERATOR") dashboard = "/moderator-dashboard";
    else if (role === "STUDENT") dashboard = "/student-dashboard";
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Allow access to admin routes only for admin role
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  // Allow access to instructor routes only for instructor role
  if (instructorRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "INSTRUCTOR") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  // Allow access to moderator routes only for moderator role
  if (moderatorRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "MODERATOR") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  // Allow access to student routes only for student role
  if (studentRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "STUDENT") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // For other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/instructor-dashboard/:path*",
    "/moderator-dashboard/:path*",
    "/student-dashboard/:path*",
    "/auth/:path*",
    "/unauthorized",
    "/profile",
  ],
};
