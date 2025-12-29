import { Prisma } from "@prisma/client";
import { mapPrismaError } from "../utils/mapPrismaError";
import { prisma } from "@/app/prisma";

export const TripsService = {
  create: async function (data: Prisma.TripCreateInput) {
    if (data.startDate && data.endDate)
      this.checkDateRange(data.startDate, data.endDate);

    const ownerId = data.owner.connect?.id;

    try {
      return await prisma.trip.create({
        data: {
          ...data,
          tripParticipants: {
            create: [{ user: { connect: { id: ownerId } }, role: "OWNER" }],
          },
        },
        include: {
          places: true,
          tripParticipants: {
            where: { user_id: ownerId },
            select: { role: true },
          },
        },
      });
    } catch (e) {
      const { message, status } = mapPrismaError(e);

      return Response.json({ message }, { status });
    }
  },

  findMany: async (
    where: Prisma.TripWhereInput,
    include: Prisma.TripInclude
  ) => {
    return await prisma.trip.findMany({
      where,
      include,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  checkDateRange: (startDate: string | Date, endDate: string | Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getTime() > end.getTime())
      return Response.json({ message: "Invalid date range" }, { status: 400 });
  },
};
