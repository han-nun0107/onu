import { create } from "zustand";
import type { SongData } from "@/api/songdb";

type EditSongStore = {
  songToEdit: SongData | null;
  setSongToEdit: (song: SongData | null) => void;
  clearSongToEdit: () => void;
};

export const useEditSongStore = create<EditSongStore>((set) => ({
  songToEdit: null,
  setSongToEdit: (song) => set({ songToEdit: song }),
  clearSongToEdit: () => set({ songToEdit: null }),
}));
