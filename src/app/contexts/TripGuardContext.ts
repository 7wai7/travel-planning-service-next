import { Trip } from "@prisma/client";
import { createContext } from "react";

export type TripContextType = {
  trip: Trip;
};

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);
