import { NextRequest, NextResponse } from "next/server";
import {
  refreshAccessToken,
  isTokenExpired,
  isRefreshTokenValid,
} from "@/helpers/refreshToken";

const PUBLIC_PATHS = [
  "/user/login",
  "/user/register",
  "/user/verify-token",
  "/user/reset-password/verify",
  "/user/reset-password",
  "/user/verify",
  "/",
];

const AUTH_PATHS = [
  "/user/login",
  "/user/register",
  "/user/verify-token",
  "/user/reset-password/verify",
  "/user/reset-password",
  "/user/verify",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // If user is authenticated and tries to access auth routes, redirect to dashboard
  if (AUTH_PATHS.includes(path) && (token || refreshToken)) {
    // Check if tokens are valid before redirecting
    if (token) {
      const tokenExpired = await isTokenExpired(token);
      if (!tokenExpired) {
        // Valid token, redirect to dashboard
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }

    if (refreshToken) {
      const refreshValid = await isRefreshTokenValid(refreshToken);
      if (refreshValid) {
        // Valid refresh token, redirect to dashboard
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
  }

  // Allow public paths
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // If no tokens at all, redirect to login
  if (!token && !refreshToken) {
    console.log("No tokens → redirecting to login");
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  // If we have a refresh token but no access token, try to refresh
  if (!token && refreshToken) {
    const refreshResult = await refreshAccessToken(req);

    if (refreshResult.success && refreshResult.token) {
      const response = NextResponse.next();
      response.cookies.set("token", refreshResult.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60, // 1 hour
      });
      return response;
    } else {
      // Refresh failed, redirect to login
      console.log("Token refresh failed → redirecting to login");
      const response = NextResponse.redirect(new URL("/user/login", req.url));
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // If we have an access token, check if it's expired
  if (token) {
    const tokenExpired = await isTokenExpired(token);

    if (tokenExpired && refreshToken) {
      // Try to refresh the token
      const refreshResult = await refreshAccessToken(req);

      if (refreshResult.success && refreshResult.token) {
        const response = NextResponse.next();
        response.cookies.set("token", refreshResult.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60, // 1 hour
        });
        return response;
      } else {
        // Refresh failed, redirect to login
        console.log("Token refresh failed → redirecting to login");
        const response = NextResponse.redirect(new URL("/user/login", req.url));
        response.cookies.delete("token");
        response.cookies.delete("refreshToken");
        return response;
      }
    } else if (tokenExpired && !refreshToken) {
      // Access token expired and no refresh token, redirect to login
      console.log(
        "Access token expired, no refresh token → redirecting to login"
      );
      const response = NextResponse.redirect(new URL("/user/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
