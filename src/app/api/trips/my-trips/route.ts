import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripsService } from "../../lib/services/trips.service";
import { authGuard } from "../../auth/authGuard.guard";
import { TokenUserData } from "../../../lib/shared/types/tokenUserData";

export const GET = withErrorHandler(
  authGuard(async (req: Request, user: TokenUserData) => {
    const trips = await TripsService.findMany(
      {
        tripParticipants: {
          some: {
            user_id: user.id,
          },
        },
      },
      {
        places: true,
        tripParticipants: {
          where: { user_id: user.id },
          select: { role: true },
        },
      }
    );

    return Response.json(trips);
  })
);
