import { Trip } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyTripsApi, getTripByIdApi } from "../lib/api/trips/trips.api";

export function useQueryTrip(tripId: number, include: string[] = []) {
  return useQuery({
    queryKey: ["trip-page", tripId],
    queryFn: () => getTripByIdApi(tripId, include),
    enabled: Number.isFinite(tripId),
    staleTime: 1000 * 60, // 1 хвилина
  });
}

export function useGetMyTrips(include: string[] = []) {
  return useQuery({
    queryKey: ["my-trips-list"],
    queryFn: () => getMyTripsApi(include),
  });
}

// export function useCreateTrip() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: createTripApi,
//     onSuccess: (data: Trip) => {
//       qc.setQueryData<Trip[] | undefined>(["my-trips-list"], (prev) =>
//         prev ? [data, ...prev] : [data]
//       );
//     },
//   });
// }

// export function useDeleteTrip() {
//   return useMutation({
//     mutationFn: deleteTripApi,
//   });
// }

// export function useEditTrip() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: editTripApi,
//     onSuccess: (data: Trip) => {
//       qc.invalidateQueries({ queryKey: ["my-trips-list"] });
//       qc.invalidateQueries({ queryKey: ["trip-page", data.id] });
//     },
//   });
// }

// export function useInviteTrip() {
//   return useMutation<
//     { token: string; inviteLink: string },
//     Error,
//     InviteTripRequest
//   >({
//     mutationFn: inviteTripApi,
//   });
// }
