import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const EMAIL_SUBJECT = "Password Reset Verification";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required.", success: false },
        { status: 400 }
      );
    }

    // Find user by verification token
    const user = await User.findOne({
      forgetToken: token,
      forgetTokenExpiry: { $gt: new Date() }, // Check if token is still valid
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token.", success: false },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgetToken = undefined;
    user.forgetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully.", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in forgot password verification:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
        success: false,
      },
      { status: 500 }
    );
  }
}
