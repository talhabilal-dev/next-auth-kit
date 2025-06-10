import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./helpers/decodeToken";
const PUBLIC_PATHS = ["/user/login", "/user/register","/user/verify-token"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  // Allow public paths through
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // No token? Redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  // Verify the token
  const payload = await decodeToken(req);
  // If token is invalid or expired, redirect to login

  if (!payload) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  if(payload.isVerified === false) {
    return NextResponse.redirect(new URL("/user/verify", req.url));
  }

  // Optional: redirect logged-in user away from auth pages
  if (path === "/user/login" || path === "/user/register") {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)", "/user/dashboard" ],
};
