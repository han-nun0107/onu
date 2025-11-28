import type { SongData } from "@/api/songdb";

export type SearchPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  searchResults: SongData[];
  isLoading: boolean;
  onSongClick?: (song: SongData) => void;
};

