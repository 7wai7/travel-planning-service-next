import { prisma } from "@/app/prisma";
import { AppError } from "../lib/utils/appError";
import { TripRole } from '@prisma/client';
import { Handler } from "../lib/types/context";

export const tripRoleGuard =
  <P extends { trip_id: string, id: string }>(
    requiredRoles: TripRole[],
    handler: Handler<P>
  ): Handler<P> =>
  async (req, ctx) => {
    const params = await ctx.params;
    const tripId = Number(params.trip_id);
    if (Number.isNaN(tripId))
      throw new AppError("Trip id must be a number", 400);

    const user = req.user;
    if (!user) throw new AppError("Unauthorized", 401);

    const participant = await prisma.tripParticipants.findUnique({
      where: {
        user_id_trip_id: {
          user_id: user.id,
          trip_id: tripId,
        },
      },
      select: { role: true },
    });

    const role = participant?.role ?? null;

    if (!role) throw new AppError("You are not a participant of this trip");
    if (!requiredRoles.includes(role))
      throw new AppError("Forbidden: insufficient role");

    req.tripRole = role;
    return handler(req, ctx);
  };
