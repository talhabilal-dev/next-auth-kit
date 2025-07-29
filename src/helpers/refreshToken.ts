import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export async function refreshAccessToken(req: NextRequest): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return { success: false, error: "No refresh token found" };
    }

    // Verify refresh token
    const refreshSecret = new TextEncoder().encode(
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const { payload: decoded } = await jwtVerify(refreshToken, refreshSecret);

    if (!decoded || !decoded.userId) {
      return { success: false, error: "Invalid refresh token" };
    }

    // For middleware, we'll create a simplified token with just the userId
    // The full user data will be fetched when needed
    const newAccessToken = await new SignJWT({
      userId: decoded.userId,
      type: "access",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    return { success: true, token: newAccessToken };
  } catch (error: any) {
    console.error("Error refreshing token:", error);
    return { success: false, error: "Failed to refresh token" };
  }
}

export async function isTokenExpired(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET as string);
    await jwtVerify(token, secret);
    return false;
  } catch (error: any) {
    // If the error is due to expiration, return true
    if (error.code === "ERR_JWT_EXPIRED") {
      return true;
    }
    // For other errors (invalid token, etc.), also consider it expired
    return true;
  }
}

export async function isRefreshTokenValid(
  refreshToken: string
): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(
      process.env.REFRESH_TOKEN_SECRET as string
    );
    await jwtVerify(refreshToken, secret);
    return true;
  } catch (error: any) {
    return false;
  }
}
