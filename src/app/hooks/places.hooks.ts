import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaceApi, deletePlaceApi, updatePlaceApi } from "../lib/api/places/places.api";
import { CreatePlaceDTO, DeletePlaceDTO, PlaceDTO, UpdatePlaceDTO } from "../lib/shared/types/place.dto";

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

export function useUpdatePlace() {
  return useMutation<PlaceDTO, Error, UpdatePlaceDTO>({
    mutationFn: updatePlaceApi,
  });
}

export function useDeletePlace() {
  return useMutation<PlaceDTO, Error, DeletePlaceDTO>({
    mutationFn: deletePlaceApi,
  });
}
