import { create } from "zustand";

interface IEditState {
  title: string | null;
  description: string | null;
  subject: string | null;
  payload?: unknown;
  error?: Error | null;
  isOpen: boolean;
  onCancel: (() => void) | null;
  onConfirm: (() => Promise<unknown>) | null;
}

interface IState extends IEditState {
  setConfirm: (values: Partial<IEditState>) => void;
  reset: () => void;
}

const useConfirmDialogStore = create<IState>((set) => ({
  title: null,
  description: null,
  subject: null,
  isOpen: false,

  onCancel: null,
  onConfirm: null,

  setConfirm: (values) => set(values),
  reset: () =>
    set({
      title: null,
      description: null,
      subject: null,
      payload: null,
      error: null,
      isOpen: false,
      onCancel: null,
      onConfirm: null,
    }),
}));

export default useConfirmDialogStore;
