export type CreatePlaceDTO = {
  trip_id: number;
  locationName: string;
  dayNumber: number;
  notes?: string;
};

export type PlaceDTO = {
  id: number;
} & CreatePlaceDTO;

export type UpdatePlaceDTO = { id: number } & Partial<CreatePlaceDTO>;

export type DeletePlaceDTO = {
  id: number;
  trip_id: number;
};
