import { env } from "@/app/config/env";
import { NextResponse } from "next/server";

export function saveCookieToken(res: NextResponse, token: string) {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}