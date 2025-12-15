export type FormData = {
  title: string;
  artist: string;
  categories: string;
  key: string;
  notes: string;
  completed: boolean;
  recommend: boolean;
  bomb: boolean;
  inst: string;
  thumbnail_url: string;
  difficulty: number;
  transpose: number;
};

export type FormField = {
  id: keyof FormData;
  label: string;
  type: "text" | "number" | "url" | "textarea";
  placeholder: string;
  required?: boolean;
  span?: "full" | "half";
};

export type CheckboxField = {
  id: keyof FormData;
  label: string;
};
