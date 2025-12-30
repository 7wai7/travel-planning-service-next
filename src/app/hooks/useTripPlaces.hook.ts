import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import usePlaceStore from "../(protected)/trips/stores/PlaceStore";
import { useCreatePlace, useDeletePlace, useUpdatePlace } from "./places.hooks";
import { TripDTO } from "../lib/shared/types/trip.dto";
import { CreatePlaceDTO, UpdatePlaceDTO } from "../lib/shared/types/place.dto";

export function useTripPlaces(trip: TripDTO) {
  const qc = useQueryClient();
  const setPlace = usePlaceStore((s) => s.set);

  const create = useCreatePlace();
  const update = useUpdatePlace();
  const remove = useDeletePlace();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["trip-page", trip.id] });

  const sortedPlaces = useMemo(() => {
    return [...(trip?.places ?? [])].sort(
      (a, b) => Number(a.dayNumber) - Number(b.dayNumber)
    );
  }, [trip?.places]);

  return {
    sortedPlaces,

    createHook: create,
    removeHook: remove,
    updateHook: update,

    openAdd: () => setPlace({ editingPlace: null, isOpenModal: true }),

    create: async (data: Omit<CreatePlaceDTO, "trip_id">) => {
      await create.mutateAsync({ ...data, trip_id: trip.id });
      invalidate();
      setPlace({ isOpenModal: false });
    },

    update: async (data: Omit<UpdatePlaceDTO, "trip_id">) => {
      await update.mutateAsync({ ...data, trip_id: trip.id });
      invalidate();
      setPlace({ editingPlace: null, isOpenModal: false });
    },

    remove: async (placeId: number) => {
      await remove.mutateAsync({ id: placeId, trip_id: trip.id });
      invalidate();
    },
  };
}