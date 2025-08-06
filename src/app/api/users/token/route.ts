import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { TokenData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Get refresh token from cookies
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token not found.", success: false },
        { status: 401 }
      );
    }

    // Verify refresh token
    const secret = new TextEncoder().encode(
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const { payload: decoded } = await jwtVerify(refreshToken, secret);

    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: "Invalid refresh token.", success: false },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found.", success: false },
        { status: 404 }
      );
    }

    // Check if user is still verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User is not verified.", success: false },
        { status: 403 }
      );
    }

    // Generate new access token
    const tokenData: TokenData = {
      userId: user._id.toString(),
      username: user.username as string,
      email: user.email as string,
      isVerified: user.isVerified as boolean,
    };

    const newAccessToken = await new SignJWT({ ...tokenData })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h") // Short-lived access token
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    const response = NextResponse.json({
      message: "Access token refreshed successfully.",
      success: true,
    });

    // Set new access token cookie
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error: any) {
    console.error("Error in user token generation:", error);
    return NextResponse.json(
      { error: "Failed to generate user token.", success: false },
      { status: 500 }
    );
  }
}
