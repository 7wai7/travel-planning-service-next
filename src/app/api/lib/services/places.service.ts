import { prisma } from "@/app/prisma";
import { Prisma } from "@prisma/client";
import { mapPrismaError } from "../utils/mapPrismaError";

export const PlacesService = {
  create: async (data: Prisma.PlaceUncheckedCreateInput) => {
    return await prisma.place.create({ data });
  },

  update: async (id: number, data: Prisma.PlaceUpdateInput) => {
    try {
      return await prisma.place.update({
        where: { id },
        data,
      });
    } catch (e) {
      mapPrismaError(e);
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.place.delete({
        where: { id },
      });
    } catch (e) {
      mapPrismaError(e);
    }
  }
};
