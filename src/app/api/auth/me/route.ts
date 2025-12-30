import { NextResponse } from "next/server";
import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { requireUser } from "@/app/lib/shared/utils/requireUser";

export const GET = withErrorHandler(async () => {
  const user = await requireUser();
  const res = NextResponse.json(user);
  return res;
});
