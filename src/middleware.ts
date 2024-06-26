import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession } from "./actions/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (!session.isLogged) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname === "/admin/users" && session.role !== "superadmin") {
    const errorMessage =
      "Unauthorized, you must be a superadmin to access this page";
    return NextResponse.redirect(
      new URL(`/auth/signin?message=${errorMessage}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/222/:path*",
    "/admin/:path*",
  ],
};
