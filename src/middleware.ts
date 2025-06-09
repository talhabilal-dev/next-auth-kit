import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./helpers/decodeToken";
const PUBLIC_PATHS = ["/login", "/register", "/public"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  // Allow public paths through
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // No token? Redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify the token
  const payload = await decodeToken(req);
  // If token is invalid or expired, redirect to login

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optional: redirect logged-in user away from auth pages
  if (path === "/login" || path === "/register") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)", "/"],
};
