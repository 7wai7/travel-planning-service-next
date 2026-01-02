import { TripRole } from "@prisma/client";
import { authGuard } from "../../../auth/authGuard.guard";
import { TripsService } from "../../../lib/services/trips.service";
import { AppError } from "../../../lib/utils/appError";
import { withErrorHandler } from "../../../lib/withErrorHandler";
import { tripRoleGuard } from "../../tripRoleGuard.guard";

export const POST = withErrorHandler(
  authGuard(
    tripRoleGuard([TripRole.OWNER], async (req, ctx) => {
      const params = await ctx.params;
      const id = Number(params.id);
      if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

      const searchParams = req.nextUrl.searchParams;
      const email = searchParams.get("email");
      if (!email) throw new AppError("Email is required", 400);

      const res = await TripsService.access(id, req.user!.email, email);
      return Response.json(res);
    })
  )
);
