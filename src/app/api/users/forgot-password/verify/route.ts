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
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    const response = await sendEmail(
      EmailType: "FORGOT_PASSWORD",
      subject: EMAIL_SUBJECT,
      Email: email,
      userId: existingUser._id.toString(),
    );

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Generate a verification token (this should be implemented)
    const verificationToken = user.generateVerificationToken();

    // Send verification email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${verificationToken}`;
    await sendEmail({
      to: user.email,
      subject: EMAIL_SUBJECT,
      text: `Click the link to reset your password: ${resetLink}`,
    });

    return NextResponse.json(
      { message: "Verification email sent successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in forgot password verification:", error.message);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
        success: false,
      },
      { status: 500 }
    );
  }
}
