import { TripDTO } from "../lib/shared/types/trip.dto";

export function useTripPermissions(trip: TripDTO) {
  const role = trip.tripParticipants?.[0].role ?? "USER";

  return {
    role,
    isOwner: role === "OWNER",
    isCollaborator: role === "COLLABORATOR",
    canEditPlaces: role === "OWNER" || role === "COLLABORATOR",
  };
}
