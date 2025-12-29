import api from "../axios";
import { fetcher } from "../fetcher";
import {
  CreateTripDTO,
  InviteTripDTO,
  TripDTO,
  UpdateTripDTO,
} from "../../shared/types/trip.dto";

export const createTripApi = (data: CreateTripDTO) =>
  fetcher<TripDTO>(api.post("/api/trips", data));

export const editTripApi = async (data: UpdateTripDTO) =>
  fetcher<TripDTO>(api.put(`/api/trips/${data.id}`, data));

export const getMyTripsApi = async (include: string[] = []) =>
  fetcher<TripDTO[]>(
    api.get("/api/trips/my-trips", {
      params: { include },
      paramsSerializer: {
        indexes: null,
      },
    })
  );

export const getTripByIdApi = async (id: number, include: string[] = []) =>
  fetcher<TripDTO>(
    api.get(`/api/trips/${id}`, {
      params: { include },
      paramsSerializer: {
        indexes: null,
      },
    })
  );

export const deleteTripApi = async (id: number) =>
  fetcher(api.delete(`/api/trips/${id}`));

export const inviteTripApi = async ({ tripId, email }: InviteTripDTO) =>
  fetcher(api.post(`/api/trips/${tripId}/access`, null, { params: { email } }));
