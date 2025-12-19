import { memo } from "react";
import {
  Card,
  GridContainer,
  LoadingState,
  EmptyState,
  LoadingIndicator,
} from "@/components";
import {
  useAllSongs,
  useSinger,
  useModalState,
  useInfiniteList,
} from "@/hooks";

function Singer() {
  const { data: allSongs, isLoading } = useAllSongs();
  const { singers } = useSinger(allSongs);
  const { getIsOpen, setIsOpen } = useModalState();
  const {
    displayedItems: displayedSingers,
    hasNextPage,
    observerRef,
    isLoadingMore,
  } = useInfiniteList(singers);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <GridContainer>
      {displayedSingers.length === 0 ? (
        <EmptyState message="가수가 없습니다." />
      ) : (
        displayedSingers.map((singer, index) => {
          const key = singer.name || `singer-${index}`;
          return (
            <Card
              key={key}
              type="indexAnotherCard"
              data={{
                image: singer.image,
                categories: [singer.name],
                songs: singer.songs,
                isOpen: getIsOpen(key),
                setIsOpen: (open: boolean) => setIsOpen(key, open),
                type: "singer",
              }}
            />
          );
        })
      )}
      {hasNextPage && (
        <>
          <div ref={observerRef} className="h-10 w-full" />
          {isLoadingMore && <LoadingIndicator />}
        </>
      )}
    </GridContainer>
  );
}

export default memo(Singer);
