import { createContext } from "react";
import { TripDTO } from "../lib/shared/types/trip.dto";

export type TripContextType = {
  trip: TripDTO;
};

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);
