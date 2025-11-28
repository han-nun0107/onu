import type {
  FormData,
  FormField,
  CheckboxField,
} from "@/types/admin/editSong";

export const INITIAL_FORM_DATA: FormData = {
  title: "",
  artist: "",
  categories: "",
  key: "",
  notes: "",
  completed: false,
  recommend: false,
  bomb: false,
  inst: "",
  thumbnail_url: "",
};

export const FORM_FIELDS: FormField[] = [
  {
    id: "title",
    label: "제목",
    type: "text",
    placeholder: "노래 제목을 입력하세요",
    required: true,
    span: "half",
  },
  {
    id: "artist",
    label: "가수",
    type: "text",
    placeholder: "가수명을 입력하세요",
    required: true,
    span: "half",
  },
  {
    id: "key",
    label: "키",
    type: "text",
    placeholder: "예: C, Dm, F#m",
    required: true,
    span: "full",
  },
  {
    id: "categories",
    label: "카테고리",
    type: "text",
    placeholder: "쉼표로 구분하여 입력 (예: 발라드, 감성, OST)",
    span: "full",
  },
  {
    id: "inst",
    label: "유튜브 URL",
    type: "url",
    placeholder: "https://www.youtube.com/watch?v=...",
    span: "full",
  },
  {
    id: "thumbnail_url",
    label: "썸네일 URL (비워두면 유튜브 URL에서 자동 생성)",
    type: "url",
    placeholder: "썸네일 이미지 URL",
    span: "full",
  },
  {
    id: "notes",
    label: "노트",
    type: "textarea",
    placeholder: "추가 메모나 노트를 입력하세요",
    span: "full",
  },
];

export const CHECKBOX_FIELDS: CheckboxField[] = [
  { id: "completed", label: "완곡여부" },
  { id: "recommend", label: "추천" },
  { id: "bomb", label: "💣" },
];

export const INPUT_CLASSES =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";

export const CHECKBOX_CLASSES =
  "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200";
