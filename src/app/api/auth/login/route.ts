import { AuthService } from "@/app/api/lib/services/auth.service";
import { NextResponse } from "next/server";
import { saveCookieToken } from "../utils";
import { withErrorHandler } from "@/app/api/lib/withErrorHandler";

export const POST = withErrorHandler(async (req: Request) => {
  const { username, password } = await req.json();

  const { user, token } = await AuthService.login(username, password);

  const res = NextResponse.json(user);
  saveCookieToken(res, token);

  return res;
});
