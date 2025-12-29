import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripsService } from "./../lib/services/trips.service";
import { authGuard } from "./../auth/authGuard.guard";
import { TokenUserData } from "../../lib/shared/types/tokenUserData";

export const POST = withErrorHandler(
  authGuard(async (req: Request, user: TokenUserData) => {
    const data = await req.json();

    const trip = await TripsService.create({
      ...data,
      owner: { connect: { id: user.id } },
    });

    return Response.json(trip, { status: 201 });
  })
);