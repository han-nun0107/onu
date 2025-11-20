import { useMemo } from "react";
import type { SongData } from "@/api/songdb";
import { useAllSongs } from "./useSongs";
import { useDebounce } from "@/hooks";
import { normalizeSinger, normalizeCategories } from "@/utils/parseSong";

export function useSearchSongs(searchQuery: string) {
  const { data: allSongs, isLoading } = useAllSongs();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const searchResults = useMemo(() => {
    if (!allSongs || !debouncedSearchQuery.trim()) {
      return allSongs || [];
    }

    const query = debouncedSearchQuery.toLowerCase().trim();

    return allSongs.filter((song: SongData) => {
      const title = (song.title || "").toLowerCase();
      const singer = normalizeSinger(song).toLowerCase();
      const categories = normalizeCategories(song).map((cat) =>
        (cat || "").toLowerCase(),
      );

      if (title.includes(query) || singer.includes(query)) {
        return true;
      }

      const categoryMatch = categories.some((cat) => {
        if (cat === query) {
          return true;
        }

        if (cat.includes(query)) {
          if (query === "pop") {
            const specialPatterns = ["kpop", "jpop", "k-pop", "j-pop"];
            const isSpecialCategory = specialPatterns.some((pattern) =>
              cat.includes(pattern),
            );
            if (isSpecialCategory) {
              return false;
            }
          }

          return true;
        }
        return false;
      });

      return categoryMatch;
    });
  }, [allSongs, debouncedSearchQuery]);

  return {
    searchResults,
    isLoading,
    searchQuery: debouncedSearchQuery,
  };
}
