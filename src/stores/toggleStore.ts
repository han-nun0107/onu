import { create } from "zustand";
import type { ToggleItem } from "@/types";

type ToggleState = {
  toggle: ToggleItem["type"];
  setToggle: (toggle: ToggleItem["type"]) => void;
};

export const useToggleStore = create<ToggleState>((set) => ({
  toggle: "song",
  setToggle: (toggle) => set({ toggle }),
}));

