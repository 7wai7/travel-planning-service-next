import { Prisma } from "@prisma/client";
import api from "../axios";
import { fetcher } from "../fetcher";
// import type { CreatePlaceInput, DeletePlaceInput, Place, UpdatePlaceInput } from "./places.types";

export const createPlaceApi = (data: Prisma.PlaceUncheckedCreateInput) =>
  fetcher<Prisma.PlaceMaxAggregateOutputType>(api.post(`/places/${data.trip_id}`, data));

// export const updatePlaceApi = (data: UpdatePlaceInput) =>
//   fetcher<Place>(api.put(`/places/${data.trip_id}/${data.id}`, data));


// export const deletePlaceApi = (data: DeletePlaceInput) =>
//   fetcher<Place>(api.delete(`/places/${data.trip_id}/${data.id}`));
