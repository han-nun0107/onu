import { useState, useRef, useMemo, useCallback } from "react";
import { useInfinityScroll } from "@/hooks";

const ITEMS_PER_PAGE = 20;

export const useInfiniteList = <T,>(items: T[]) => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedItems = useMemo(() => {
    return items.slice(0, displayCount);
  }, [items, displayCount]);

  const hasNextPage = displayCount < items.length;

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
        setIsLoadingMore(false);
      }, 100);
    }
  }, [hasNextPage, isLoadingMore]);

  useInfinityScroll({
    observerRef,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingMore,
  });

  return {
    displayedItems,
    hasNextPage,
    observerRef,
    isLoadingMore,
  };
};

