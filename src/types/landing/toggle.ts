import type { ToggleItem } from "@/types";

export type ToggleProps = {
  toggle: ToggleItem["type"];
  setToggle: (toggle: ToggleItem["type"]) => void;
};

