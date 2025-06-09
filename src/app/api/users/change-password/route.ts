import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { decodeToken } from "@/helpers/decodeToken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = await decodeToken(req);

    const { currentPassword, newPassword } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from the current password." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json(
      { message: "Password changed successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/users/change-password:", error.message);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
