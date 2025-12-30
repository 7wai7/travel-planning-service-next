import { TripRole } from "@prisma/client";
import { authGuard } from "../../auth/authGuard.guard";
import { tripRoleGuard } from "../../trips/tripRoleGuard.guard";
import { PlacesService } from "../../lib/services/places.service";
import { AppError } from "../../lib/utils/appError";
import { withErrorHandler } from "../../lib/withErrorHandler";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(
  authGuard(
    tripRoleGuard(
      [TripRole.OWNER, TripRole.COLLABORATOR],
      async (req: NextRequest) => {
        const url = new URL(req.url);
        const pathParts = url.pathname.split("/");
        const tripIdParam = pathParts[pathParts.length - 1];
        if (!tripIdParam) throw new AppError("Trip id is required", 400);

        const tripId = Number(tripIdParam);
        if (Number.isNaN(tripId))
          throw new AppError("Trip id must be a number", 400);

        const data = await req.json();
        const trip = await PlacesService.create(data);

        return Response.json(trip, { status: 201 });
      }
    )
  )
);
