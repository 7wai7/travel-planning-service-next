import { PlaceDTO } from "@/app/lib/shared/types/place.dto";
import { create } from "zustand";

interface IEditState {
  isOpenModal: boolean;
  editingPlace: PlaceDTO | null;
}

interface IPlaceState extends IEditState {
  set: (values: Partial<IEditState>) => void;
}

const usePlaceStore = create<IPlaceState>((set) => ({
  isOpenModal: false,
  editingPlace: null,

  set: (values) => set(values),
}));

export default usePlaceStore;
