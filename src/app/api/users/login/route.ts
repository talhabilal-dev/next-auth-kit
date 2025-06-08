import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenData {
  userId: string;
  username: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

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
      userId: user._id as string,
      username: user.username as string,
      email: user.email as string,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {
      expiresIn: "1d", // Token expiration time
    });

    const response = NextResponse.json({
      message: "User logged in successfully.",
      user: userData,
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
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
