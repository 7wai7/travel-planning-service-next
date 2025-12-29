import { requireUser } from "@/app/lib/api/auth/requireUser";
import { TokenUserData } from "../lib/types/tokenUserData";
import { AppError } from "../lib/utils/appError";

type AuthedHandler = (
  req: Request,
  user: TokenUserData
) => Promise<Response>;

type RouteHandler = (req: Request) => Promise<Response>;

export const authGuard =
  (handler: AuthedHandler): RouteHandler =>
  async (req) => {
    const user = await requireUser();
    if (!user) throw new AppError("Unauthorized", 401);

    return handler(req, user);
  };
