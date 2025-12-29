import { NextResponse } from "next/server";
import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { requireUser } from "@/app/lib/api/auth/requireUser";

export const GET = withErrorHandler(async () => {
  const user = await requireUser();
  console.log("server", user)
  const res = NextResponse.json(user);
  return res;
});
