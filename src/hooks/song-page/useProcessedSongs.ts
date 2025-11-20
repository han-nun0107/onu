import { useMemo } from "react";
import type { SongData } from "@/api/songdb";
import { parseSongs, sortAndFilterSongs } from "@/utils";
import { useSortFilterStore } from "@/stores/sortFilterStore";

export function useProcessedSongs(rawSongs: SongData[]) {
  const { sortType, filterType } = useSortFilterStore();

  const deduplicatedSongs = useMemo(() => {
    const seenIds = new Set<number>();
    return rawSongs.filter((song) => {
      if (song.id !== undefined) {
        if (seenIds.has(song.id)) {
          return false;
        }
        seenIds.add(song.id);
      }
      return true;
    });
  }, [rawSongs]);

  const sortedAndFilteredSongs = useMemo(
    () => sortAndFilterSongs(deduplicatedSongs, sortType, filterType),
    [deduplicatedSongs, sortType, filterType],
  );

  const processedSongs = useMemo(
    () => parseSongs(sortedAndFilteredSongs),
    [sortedAndFilteredSongs],
  );

  return processedSongs;
}
