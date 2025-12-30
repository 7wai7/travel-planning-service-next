import api from "../axios";
import { fetcher } from "../fetcher";
import { CreatePlaceDTO, DeletePlaceDTO, PlaceDTO, UpdatePlaceDTO } from "../../shared/types/place.dto";

export const createPlaceApi = (data: CreatePlaceDTO) =>
  fetcher<PlaceDTO>(api.post(`/api/places/${data.trip_id}`, data));

export const updatePlaceApi = (data: UpdatePlaceDTO) =>
  fetcher<PlaceDTO>(api.put(`/api/places/${data.trip_id}/${data.id}`, data));


export const deletePlaceApi = (data: DeletePlaceDTO) =>
  fetcher<PlaceDTO>(api.delete(`/api/places/${data.trip_id}/${data.id}`));
