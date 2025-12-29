import { TokenUserData } from "@/app/lib/api/auth/auth.types";
import { authGuard } from "../../auth/authGuard.guard";
import { TripsService } from "../../lib/services/trips.service";
import { AppError } from "../../lib/utils/appError";
import { withErrorHandler } from "../../lib/withErrorHandler";

export const GET = withErrorHandler(
  authGuard(async (req: Request, user: TokenUserData) => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const idParam = pathParts[pathParts.length - 1];
    if (!idParam) throw new AppError("Id is required", 400);

    const id = Number(idParam);
    if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

    const trip = await TripsService.findOne(
      { id: +id },
      {
        places: true,
        tripParticipants: {
            where: { user_id: user.id },
          select: { role: true },
        },
      }
    );

    if (!trip) throw new AppError("Trip does not exist", 400);
    return Response.json(trip);
  })
);
