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

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/admin222/:path*",
    "/admin/:path*",
  ],
};
