export type TripRole = "OWNER" | "COLLABORATOR" | "USER";

export type InviteTripRequest = {
  tripId: number;
  email: string;
};
