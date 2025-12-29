import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { env } from "@/app/config/env";
import { TokenUserData } from "./auth.types";

export async function requireUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const payload = verify(token, env.JWT_SECRET) as TokenUserData;
    console.log("payload", payload)

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
