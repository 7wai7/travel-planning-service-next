import { withErrorHandler } from "@/app/api/lib/withErrorHandler";
import { TripsService } from "../../lib/services/trips.service";
import { authGuard } from "../../auth/authGuard.guard";
import { TokenUserData } from "../../lib/types/tokenUserData";

export const POST = withErrorHandler(
  authGuard(async (req: Request, user: TokenUserData) => {
    const { searchParams } = new URL(req.url);

    const include = searchParams.get("include");
    console.log("include", include)

    const trips = await TripsService.findMany(
      {
        tripParticipants: {
          some: {
            user_id: user.id,
          },
        },
      },
      {
        // ...getPrismaInclude(include),
        tripParticipants: {
          where: { user_id: user.id },
          select: { role: true },
        },
      }
    );

    console.log(trips)

    return Response.json(trips);
  })
);

function getPrismaInclude(include: string[]) {
  const allowedIncludes = ["owner", "tripParticipants", "places"];

  return Object.fromEntries(
    allowedIncludes.map((key) => [key, include.includes(key)])
  );
}
