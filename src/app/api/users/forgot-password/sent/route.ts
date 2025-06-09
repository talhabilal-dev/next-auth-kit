import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

const EMAIL_SUBJECT = "Password Reset Verification";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Check if email exists in the database
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    // Send reset password email
    const response = await sendEmail(
      "FORGOT_PASSWORD",
      EMAIL_SUBJECT,
      email,
      existingUser._id.toString()
    );

    if (!response) {
      return NextResponse.json(
        { error: "Failed to send reset password email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Reset password email sent successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error in POST /api/users/forgot-password/sent:",
      error.message
    );
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
