import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/user.types";

const adminRoutes = ["/admin-dashboard"];
const instructorRoutes = ["/instructor-dashboard"];
const moderatorRoutes = ["/moderator-dashboard"];
const studentRoutes = ["/student-dashboard"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // If no access token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = jwtDecode(accessToken) as { role: string };
  //   console.log(user);

  if (adminRoutes.includes(pathname) && user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (instructorRoutes.includes(pathname) && user.role !== UserRole.INSTRUCTOR) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (moderatorRoutes.includes(pathname) && user.role !== UserRole.MODERATOR) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (studentRoutes.includes(pathname) && user.role !== UserRole.STUDENT) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// set a matcher to match all routes except for the following
export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/instructor-dashboard/:path*",
    "/moderator-dashboard/:path*",
    "/student-dashboard/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - _next (Next.js internals)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - signup (signup page)
     * - auth (auth pages)
     * - unauthorized (unauthorized page)
     */
    "/((?!api|static|_next|favicon.ico|login|signup|auth|unauthorized).*)",
  ],
};
