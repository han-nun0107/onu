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
  useSearchSongs,
} from "@/hooks";
import { getSongUniqueKey } from "@/utils";
import { useSortFilterStore } from "@/stores/sortFilterStore";
import { useSearchStore } from "@/stores/searchStore";

export default function Song() {
  const { sortType, filterType } = useSortFilterStore();
  const { searchQuery } = useSearchStore();
  const { data: allSongsData, isLoading } = useAllSongs();
  const { searchResults, isLoading: isSearchLoading } = useSearchSongs(searchQuery);

  // 검색어가 있으면 검색 결과를, 없으면 전체 노래를 사용
  const rawSongs = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    return allSongsData ?? [];
  }, [searchQuery, searchResults, allSongsData]);

  const processedSongs = useProcessedSongs(rawSongs);

  const {
    displayedItems: displayedSongs,
    hasMore,
    observerRef,
  } = useInfiniteScrollDisplay(processedSongs, [sortType, filterType, searchQuery]);

  if (isLoading || isSearchLoading) {
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
