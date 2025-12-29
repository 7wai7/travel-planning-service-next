import api from "../axios";
import { fetcher } from "../fetcher";
import { CreatePlaceDTO, PlaceDTO, UpdatePlaceDTO } from "../../shared/types/place.dto";

export const createPlaceApi = (data: CreatePlaceDTO) =>
  fetcher<PlaceDTO>(api.post(`/places/${data.trip_id}`, data));

// export const updatePlaceApi = (data: UpdatePlaceDTO) =>
//   fetcher<PlaceDTO>(api.put(`/places/${data.trip_id}/${data.id}`, data));


export const deletePlaceApi = (data: DeletePlaceInput) =>
  fetcher<Place>(api.delete(`/places/${data.trip_id}/${data.id}`));
