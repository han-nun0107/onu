type ToggleType = "song" | "category" | "singer";

export type ToggleItem = {
  type: ToggleType;
  label: string;
};

export type InfoCardGroupData = {
  title: string;
  description?: string;
  subDescription?: string;
  number?: number;
  numberColor?: string;
  descriptionColor?: string;
};
