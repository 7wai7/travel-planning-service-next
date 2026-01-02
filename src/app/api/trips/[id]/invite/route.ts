import { authGuard } from "../../../auth/authGuard.guard";
import { TripsService } from "../../../lib/services/trips.service";
import { AppError } from "../../../lib/utils/appError";
import { withErrorHandler } from "../../../lib/withErrorHandler";

export const GET = withErrorHandler(
  authGuard(async (req, ctx) => {
    const params = await ctx.params;
    const id = Number(params.id);
    if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    if (!token) throw new AppError("Email is required", 400);

    const res = await TripsService.invite(req.user!.id, token);
    return Response.json(res);
  })
);
