import { authGuard } from "../../auth/authGuard.guard";
import { TripsService } from "../../lib/services/trips.service";
import { AppError } from "../../lib/utils/appError";
import { withErrorHandler } from "../../lib/withErrorHandler";

export const GET = withErrorHandler(
  authGuard(async (req, ctx) => {
    const params = await ctx.params;
    const id = Number(params.id);
    if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

    const trip = await TripsService.findOne(
      { id: +id },
      {
        places: true,
        tripParticipants: {
            where: { user_id: req.user!.id },
          select: { role: true },
        },
      }
    );

    if (!trip) throw new AppError("Trip does not exist", 400);
    return Response.json(trip);
  })
);

export const DELETE = withErrorHandler(
  authGuard(async (req, ctx) => {
    const params = await ctx.params;
    const id = Number(params.id);
    if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

    const trip = await TripsService.deleteById(req.user!.id, id);
    return Response.json(trip);
  })
);
