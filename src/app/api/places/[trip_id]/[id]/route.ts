import { authGuard } from "@/app/api/auth/authGuard.guard";
import { tripRoleGuard } from "@/app/api/trips/tripRoleGuard.guard";
import { PlacesService } from "@/app/api/lib/services/places.service";
import { AppError } from "@/app/api/lib/utils/appError";
import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripRole } from "@prisma/client";

export const PUT = withErrorHandler(
  authGuard(
    tripRoleGuard(
      [TripRole.OWNER, TripRole.COLLABORATOR],
      async (req: Request, ctx) => {
        const params = await ctx.params;
        const id = Number(params.id);
        if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

        const data = await req.json();
        delete data.id;
        const place = await PlacesService.update(id, data);
        return Response.json(place);
      }
    )
  )
);

export const DELETE = authGuard(
  tripRoleGuard([TripRole.OWNER, TripRole.COLLABORATOR], async (_, ctx) => {
    const params = await ctx.params;
    const id = Number(params.id);
    if (Number.isNaN(id)) throw new AppError("Id must be a number", 400);

    const place = await PlacesService.delete(id);
    return Response.json(place);
  })
);
