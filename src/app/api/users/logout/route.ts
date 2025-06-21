import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const response = NextResponse.json({
      message: "User logged out successfully.",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An error occurred while logging out." },
      { status: 500 }
    );
  }
}
