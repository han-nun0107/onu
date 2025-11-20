import { useState, useRef, useMemo } from "react";
import {
  Card,
  GridContainer,
  LoadingState,
  EmptyState,
  LoadingIndicator,
} from "@/components";
import {
  useAllSongs,
  useCategory,
  useModalState,
  useInfinityScroll,
} from "@/hooks";

const ITEMS_PER_PAGE = 20;

export default function Category() {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data: allSongs, isLoading } = useAllSongs();
  const { categories } = useCategory(allSongs);
  const { getIsOpen, setIsOpen } = useModalState();

  const displayedCategories = useMemo(() => {
    return categories.slice(0, displayCount);
  }, [categories, displayCount]);

  const hasNextPage = displayCount < categories.length;

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchNextPage = () => {
    if (hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
        setIsLoadingMore(false);
      }, 100);
    }
  };

  useInfinityScroll({
    observerRef,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingMore,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <GridContainer>
      {displayedCategories.length === 0 ? (
        <EmptyState message="카테고리가 없습니다." />
      ) : (
        displayedCategories.map((category, index) => {
          const key = category.name || `category-${index}`;
          return (
            <Card
              key={key}
              type="indexAnotherCard"
              data={{
                image: category.image,
                categories: [category.name],
                songs: category.songs,
                isOpen: getIsOpen(key),
                setIsOpen: (open: boolean) => setIsOpen(key, open),
                type: "category",
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
