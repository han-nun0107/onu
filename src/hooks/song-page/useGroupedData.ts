import { useMemo } from "react";
import type { SongData } from "@/api/songdb";
import { convertYoutubeToThumbnail } from "@/utils";

type GroupedCard = {
  name: string;
  image: string;
  songs: SongData[];
};

type GroupKeyExtractor = (song: SongData) => string | string[] | null;

export const useGroupedData = (
  allSongs: SongData[] | undefined,
  extractGroupKeys: GroupKeyExtractor,
) => {
  const groupedData = useMemo(() => {
    if (!allSongs || allSongs.length === 0) return [];

    const groupMap = new Map<string, { image: string; songs: SongData[] }>();

    allSongs.forEach((song) => {
      const groupKeys = extractGroupKeys(song);
      if (!groupKeys) return;

      const keys = Array.isArray(groupKeys) ? groupKeys : [groupKeys];
      const thumbnail = song.thumbnail_url || song.inst;

      keys.forEach((key) => {
        if (!key) return;

        if (!groupMap.has(key)) {
          const thumbnailUrl = thumbnail
            ? convertYoutubeToThumbnail(thumbnail)
            : "https://via.placeholder.com/320x180";
          groupMap.set(key, {
            image: thumbnailUrl || "https://via.placeholder.com/320x180",
            songs: [],
          });
        }
        const groupData = groupMap.get(key);
        if (groupData) {
          groupData.songs.push(song);
        }
      });
    });

    const groupArray: GroupedCard[] = Array.from(groupMap.entries()).map(
      ([name, data]) => ({
        name,
        image: data.image,
        songs: data.songs,
      }),
    );

    return groupArray.sort((a, b) => a.name.localeCompare(b.name));
  }, [allSongs, extractGroupKeys]);

  return groupedData;
};
