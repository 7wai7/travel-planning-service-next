import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripsService } from "./../lib/services/trips.service";
import { authGuard } from "./../auth/authGuard.guard";
import NextRequestUser from "../lib/types/nextRequestUser";

export const POST = withErrorHandler(
  authGuard(async (req: NextRequestUser) => {
    const data = await req.json();

    const trip = await TripsService.create({
      ...data,
      owner: { connect: { id: req.user!.id } },
    });

    return Response.json(trip, { status: 201 });
  })
);