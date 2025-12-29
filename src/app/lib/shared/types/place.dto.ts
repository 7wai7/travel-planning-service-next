export type CreatePlaceDTO = {
  trip_id: number;
  locationName: string;
  dayNumber: number;
  notes?: string;
};

export type PlaceDTO = {
  id: number;
} & CreatePlaceDTO;

export type UpdatePlaceDTO = Partial<CreatePlaceDTO>