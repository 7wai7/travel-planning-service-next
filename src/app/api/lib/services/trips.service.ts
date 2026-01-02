import { Prisma, TripRole } from "@prisma/client";
import { mapPrismaError } from "../utils/mapPrismaError";
import { prisma } from "@/app/prisma";
import { AppError } from "../utils/appError";
import { randomUUID } from "crypto";
import { MailService } from "./mail.service";
import { env } from "@/app/config/env";
import redis from "../redis";

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
      mapPrismaError(e);
    }
  },

  findOne: async (
    data: Partial<Prisma.TripWhereInput>,
    include?: Prisma.TripInclude
  ) => {
    return await prisma.trip.findFirst({
      where: data,
      include,
    });
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

  deleteById: async (ownerId: number, id: number) => {
    try {
      return await prisma.trip.delete({
        where: { owner_id: ownerId, id },
      });
    } catch (e) {
      mapPrismaError(e);
    }
  },

  checkDateRange: (startDate: string | Date, endDate: string | Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getTime() > end.getTime())
      throw new AppError("Invalid date range", 400);
  },

  addCollaborator: async function (userId: number, tripId: number) {
    try {
      return await prisma.tripParticipants.create({
        data: {
          trip: { connect: { id: tripId } },
          user: { connect: { id: userId } },
          role: TripRole.COLLABORATOR,
        },
      });
    } catch (e) {
      mapPrismaError(e);
    }
  },

  invite: async function (userId: number, token: string) {
    const tripId = await TripsService.consumeInviteToken(token);
    await this.addCollaborator(userId, tripId);
  },

  access: async function (tripId: number, smtpFrom: string, smtpTo: string) {
    if (smtpFrom === smtpTo)
      throw new AppError("You cannot send an invitation to yourself", 400);

    const user = await prisma.user.findFirst({ where: { email: smtpTo } });
    if (!user) throw new AppError("User not found", 404);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });
    if (!trip) throw new AppError("Trip not found", 404);

    const token = `${randomUUID()}-${tripId}`;
    await this.saveInviteToken(token, tripId);

    const baseUrl = `http://localhost:${env.PORT || 4000}`;

    const inviteLink = `${baseUrl}/trips/invite?token=${encodeURIComponent(
      token
    )}`;

    await MailService.sendEmail({
      smtpFrom,
      smtpTo,
      subject: `Invite to trip: ${trip.title}`,
      template: "templates/invite-trip-email.pug",
      context: {
        name: user.username || user.email || "friend",
        trip,
        inviteLink,
      },
    });

    return {
      token,
      inviteLink,
    };
  },

  saveInviteToken: async (token: string, tripId: number) => {
    await redis.set(`trip:invite:${token}`, String(tripId), "EX", 60 * 60 * 24);
  },

  consumeInviteToken: async (token: string) => {
    const tripId = await redis.get(`trip:invite:${token}`);
    if (!tripId) {
      throw new AppError("Token not found or expired", 404);
    }

    return Number(tripId);
  },
};
