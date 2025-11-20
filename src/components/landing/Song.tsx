import { useMemo } from "react";
import {
  Card,
  GridContainer,
  LoadingState,
  LoadingIndicator,
} from "@/components";
import {
  useAllSongs,
  useProcessedSongs,
  useInfiniteScrollDisplay,
} from "@/hooks";
import { getSongUniqueKey } from "@/utils";
import { useSortFilterStore } from "@/stores/sortFilterStore";

export default function Song() {
  const { sortType, filterType } = useSortFilterStore();
  const { data: allSongsData, isLoading } = useAllSongs();

  const rawSongs = useMemo(() => allSongsData ?? [], [allSongsData]);
  const processedSongs = useProcessedSongs(rawSongs);

  const {
    displayedItems: displayedSongs,
    hasMore,
    observerRef,
  } = useInfiniteScrollDisplay(processedSongs, [sortType, filterType]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <GridContainer>
      {displayedSongs.map((song) => (
        <Card
          key={getSongUniqueKey(song)}
          type="musicCard"
          data={{
            title: song.title || "",
            singer: song.processedSinger,
            categories: song.processedCategories,
            noteKey: song.key,
            image: song.thumbnail_url,
            completed: song.completed,
            recommend: song.recommend,
            bomb: song.bomb,
            youtubeUrl: song.inst || "",
          }}
        />
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          className="flex h-10 w-full items-center justify-center"
        >
          <LoadingIndicator />
        </div>
      )}
    </GridContainer>
  );
}
