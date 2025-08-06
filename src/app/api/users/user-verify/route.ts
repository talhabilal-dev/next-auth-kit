import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required.", success: false },
        { status: 400 }
      );
    }

    // Find user by verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }, // Check if token is still valid
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token.", success: false },
        { status: 400 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "User is already verified.", success: false },
        { status: 400 }
      );
    }
    // Verify the user
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    user.verificationTokenExpiry = undefined; // Clear the expiry
    await user.save();

    return NextResponse.json({
      message: "User verified successfully.",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in user verification:", error);
    return NextResponse.json(
      { error: "Failed to verify user.", success: false },
      { status: 500 }
    );
  }
}
