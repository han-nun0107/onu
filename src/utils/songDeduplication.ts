import type { SongData } from "@/api/songdb";

export function getSongUniqueKey(song: SongData): string {
  if (song.id !== undefined) {
    return `song-${song.id}`;
  }
  return `song-key-${song.key}`;
}
