import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";

  const response = NextResponse.json({
    message: "User logged out successfully.",
    success: true,
  });

  // Kill access token
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", // prevent Chrome cookie rejection
    expires: new Date(0),
    path: "/",
  });

  // Kill refresh token
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
