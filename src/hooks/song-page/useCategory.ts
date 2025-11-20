import { useMemo } from "react";
import type { SongData } from "@/api/songdb";
import { mapToCategory } from "@/utils";
import { useGroupedData } from "./useGroupedData";

export const useCategory = (allSongs: SongData[] | undefined) => {
  const extractCategoryKeys = useMemo(
    () => (song: SongData) => mapToCategory(song),
    [],
  );

  const categories = useGroupedData(allSongs, extractCategoryKeys);

  return { categories };
};
