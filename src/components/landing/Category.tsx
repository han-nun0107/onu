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
  useCategory,
  useModalState,
  useInfiniteList,
} from "@/hooks";

function Category() {
  const { data: allSongs, isLoading } = useAllSongs();
  const { categories } = useCategory(allSongs);
  const { getIsOpen, setIsOpen } = useModalState();
  const {
    displayedItems: displayedCategories,
    hasNextPage,
    observerRef,
    isLoadingMore,
  } = useInfiniteList(categories);

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

export default memo(Category);
