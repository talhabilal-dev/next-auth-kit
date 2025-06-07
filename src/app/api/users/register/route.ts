import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import EmailTemplate from "../../../../../email/template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();


    const verificationToken = await bcrypt.hash(
      (newUser._id as string | number | { toString(): string }).toString(),
      10
    );
    newUser.verificationToken = verificationToken;
    newUser.verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await newUser.save();
    const verificationEmail = await resend.emails.send({
      from: "Acme <no-reply@talhabilal.dev>",
      to: email,
      subject: "Please verify your email",
      react: EmailTemplate({
        emailType: "VERIFY",
        Subject: "Verify your email",
        token: verificationToken,
      }),
    });
    if (verificationEmail.error) {
      console.error(
        "Error sending verification email:",
        verificationEmail.error
      );
      throw new Error("Failed to send verification email.");
    }
    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
