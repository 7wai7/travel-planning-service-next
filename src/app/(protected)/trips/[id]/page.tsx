"use client"

import AddEditPlaceModal from "@/app/components/AddEditPlaceModal";
import TripDetailsSection from "@/app/components/TripDetailsSection";
import { useTrip } from "@/app/hooks/useTrip.hook";
import { useTripPlaces } from "@/app/hooks/useTripPlaces.hook";
import usePlaceStore from "../stores/PlaceStore";


export default function TripPage() {
  const { trip } = useTrip();
  const { sortedPlaces, create, update } = useTripPlaces(trip);

  return (
    <>
      {/* <TripHeader trip={trip} />

      <PlacesAnimation places={sortedPlaces} /> */}

      <TripDetailsSection trip={trip} />

      <AddEditPlaceModal
        onSubmit={async (values) => {
          const { editingPlace } = usePlaceStore.getState();

          if (editingPlace) {
            await update({ ...values, id: editingPlace.id });
          } else {
            const dayNum = Number(values.dayNumber);
            await create({ ...values, dayNumber: dayNum });
          }
        }}
      />
    </>
  );
}
