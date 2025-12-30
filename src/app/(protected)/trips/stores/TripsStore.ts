import { TripDTO } from "@/app/lib/shared/types/trip.dto";
import { create } from "zustand";

interface IEditState {
  isOpenModal: boolean;
  editingTrip: TripDTO | null;
}

interface ITripsState extends IEditState {
  openCreate: () => void;
  openEdit: (t: TripDTO) => void;
  close: () => void;
  setTripsStore: (values: Partial<IEditState>) => void;
}

const useTripsStore = create<ITripsState>((set) => ({
  isOpenModal: false,
  editingTrip: null,

  openCreate: () => set({ isOpenModal: true, editingTrip: null }),
  openEdit: (t: TripDTO) => set({ isOpenModal: true, editingTrip: t }),
  close: () => set({ isOpenModal: false, editingTrip: null }),
  setTripsStore: (values) => set(values),
}));

export default useTripsStore;
