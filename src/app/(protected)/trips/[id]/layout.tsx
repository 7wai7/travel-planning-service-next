"use client";

import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { TripContext } from "@/app/contexts/TripGuardContext";
import { useQueryTrip } from "@/app/hooks/trips.hooks";
import { useParams } from "next/navigation";

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const tripId = Number(params.id);

  const { data: trip, isLoading, error } = useQueryTrip(tripId, [
    "places",
    "tripParticipants",
  ]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !trip) {
    return (
      <p className="text-red-500 text-sm">
        {error?.message ?? "Oops. Something went wrong."}
      </p>
    );
  }

  return (
    <TripContext.Provider value={{ trip }}>
      {children}
    </TripContext.Provider>
  );
}
