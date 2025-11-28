import { useMemo } from "react";
import {
  Card,
  GridContainer,
  LoadingState,
  LoadingIndicator,
  EditSong,
} from "@/components";
import {
  useAllSongs,
  useProcessedSongs,
  useInfiniteScrollDisplay,
  useSearchSongs,
} from "@/hooks";
import { getSongUniqueKey, transformSongToCardData } from "@/utils";
import { useSortFilterStore } from "@/stores/sortFilterStore";
import { useSearchStore } from "@/stores/searchStore";
import { useEditModeStore } from "@/stores/editModeStore";

export default function Song() {
  const { sortType, filterType } = useSortFilterStore();
  const { searchQuery } = useSearchStore();
  const { data: allSongsData, isLoading } = useAllSongs();
  const { searchResults, isLoading: isSearchLoading } =
    useSearchSongs(searchQuery);

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
  } = useInfiniteScrollDisplay(processedSongs, [
    sortType,
    filterType,
    searchQuery,
  ]);

  const { isEditMode } = useEditModeStore();

  if (isLoading || isSearchLoading) {
    return <LoadingState />;
  }

  return (
    <>
      {isEditMode && <EditSong />}
      <GridContainer>
        {displayedSongs.map((song) => (
          <Card
            key={getSongUniqueKey(song)}
            type="musicCard"
            data={transformSongToCardData(song)}
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
    </>
  );
}
