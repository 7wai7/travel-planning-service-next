import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripsService } from "../../lib/services/trips.service";
import { authGuard } from "../../auth/authGuard.guard";
import NextRequestUser from "../../lib/types/nextRequestUser";

export const GET = withErrorHandler(
  authGuard(async (req: NextRequestUser) => {
    const trips = await TripsService.findMany(
      {
        tripParticipants: {
          some: {
            user_id: req.user!.id,
          },
        },
      },
      {
        places: true,
        tripParticipants: {
          where: { user_id: req.user!.id },
          select: { role: true },
        },
      }
    );

    return Response.json(trips);
  })
);
