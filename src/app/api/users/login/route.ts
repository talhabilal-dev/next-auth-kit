import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from "jose";
import { TokenData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, rememberMe } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password +isVerified");
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User is not verified. Please verify your email." },
        { status: 403 }
      );
    }

    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    const tokenData: TokenData = {
      userId: user._id.toString(),
      username: user.username as string,
      email: user.email as string,
      isVerified: user.isVerified as boolean,
    };

    const token = await new SignJWT({ ...tokenData })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(rememberMe ? "7d" : "1d")
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    const response = NextResponse.json({
      message: "User logged in successfully.",
      success: true,
      user: userData,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Error in user login:", error);
    return NextResponse.json(
      { error: "Failed to login user." },
      { status: 500 }
    );
  }
}
