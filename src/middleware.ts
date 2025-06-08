import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/register", "/public"];

const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
};

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

  // Token exists — verify
  const payload = await verifyToken(token);

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
  matcher: ["/((?!_next|api|static|favicon.ico).*)", "/", "/*"],
};
