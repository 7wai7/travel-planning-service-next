import { TripRole } from "@prisma/client";
import { PlaceDTO } from "./place.dto";

export type CreateTripDTO = {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type TripDTO = {
  id: number;
  places?: PlaceDTO[];
  tripParticipants?: TripParticipantDTO[];
} & CreateTripDTO;

export type UpdateTripDTO = { id: number } & Partial<CreateTripDTO>;

export type TripParticipantDTO = {
  role: TripRole;
};

export type InviteTripDTO = {
  tripId: number;
  email: string;
};
