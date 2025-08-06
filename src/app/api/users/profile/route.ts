import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { decodeToken } from "@/helpers/decodeToken";

export async function GET(req: NextRequest) {
  const payload: any = await decodeToken(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in.", success: false },
      { status: 401 }
    );
  }

  const userId = payload?.userId;

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in.", success: false },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found.", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    return NextResponse.json(
      {
        error: "An error occurred while fetching the user profile.",
        success: false,
      },
      { status: 500 }
    );
  }
}
