import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { firstname, lastname, username, email, password } = await req.json();

    if (!firstname || !lastname || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists.", success: false },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Send verification email
    const emailResponse = await sendEmail(
      "VERIFY",
      "Verify your email",
      email,
      newUser._id.toString()
    );

    if (!emailResponse) {
      return NextResponse.json(
        { error: "Failed to send verification email.", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully.", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
