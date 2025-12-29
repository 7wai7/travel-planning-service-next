import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaceApi } from "../lib/api/places/places.api";
import { CreatePlaceDTO, PlaceDTO } from "../lib/shared/types/place.dto";

export function useCreatePlace() {
  const qc = useQueryClient();

  return useMutation<PlaceDTO, Error, CreatePlaceDTO>({
    mutationFn: createPlaceApi,
    onMutate: async (variables: CreatePlaceDTO) => {
      await qc.cancelQueries({ queryKey: ["trip-page", variables.trip_id] });
    },
    onSettled: (
      _data: PlaceDTO | undefined,
      _error: Error | null,
      variables: CreatePlaceDTO
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
