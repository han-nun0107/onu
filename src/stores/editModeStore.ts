import { create } from "zustand";

type EditModeState = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
};

export const useEditModeStore = create<EditModeState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (value: boolean) => set({ isEditMode: value }),
}));

