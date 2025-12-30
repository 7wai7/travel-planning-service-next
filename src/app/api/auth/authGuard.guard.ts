import { requireUser } from "@/app/lib/shared/utils/requireUser";
import { AppError } from "../lib/utils/appError";
import { Handler } from "../lib/types/context";

export const authGuard =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    const user = await requireUser();
    if (!user) throw new AppError("Unauthorized", 401);

    req.user = user;
    return handler(req, ctx);
  };
