import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function decodeToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return (decoded as jwt.JwtPayload).userId;
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    throw new Error("Invalid token");
  }
}
