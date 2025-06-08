import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function decodeToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const { payload: decoded } = await jwtVerify(token, secret);

    return decoded.userId;
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    throw new Error("Invalid token");
  }
}
