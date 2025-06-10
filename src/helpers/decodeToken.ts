import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function decodeToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET as string);
    const { payload: decoded } = await jwtVerify(token, secret);

    if (!decoded) {
      return null;    }

    return decoded;
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    return null;
  }
}
