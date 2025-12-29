import { Prisma } from "@prisma/client";
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { createPlaceApi } from "../lib/api/places/places.api";

export function useCreatePlace() {
  const qc = useQueryClient();

  return useMutation<Prisma.PlaceMaxAggregateOutputType, Error, Prisma.PlaceUncheckedCreateInput>({
    mutationFn: createPlaceApi,
    onMutate: async (variables: Prisma.PlaceUncheckedCreateInput) => {
      await qc.cancelQueries({ queryKey: ["trip-page", variables.trip_id] });
    },
    onSettled: (
      _data: Prisma.PlaceMaxAggregateOutputType | undefined,
      _error: Error | null,
      variables: Prisma.PlaceUncheckedCreateInput
    ) => {
      qc.invalidateQueries({ queryKey: ["trip-page", variables.trip_id] });
    },
  });
}

// export function useUpdatePlace() {
//   return useMutation<Prisma.PlaceMaxAggregateOutputType, Error, UpdatePlaceInput>({
//     mutationFn: updatePlaceApi,
//   });
// }

// export function useDeletePlace() {
//   return useMutation<Place, Error, DeletePlaceInput>({
//     mutationFn: deletePlaceApi,
//   });
// }