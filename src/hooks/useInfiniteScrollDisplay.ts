import { useRef, useState, useEffect, useMemo } from "react";

const INITIAL_DISPLAY_COUNT = 40;
const LOAD_MORE_COUNT = 20;

export function useInfiniteScrollDisplay<T>(
  items: T[],
  resetDependencies: unknown[] = [],
) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  }, resetDependencies);

  const displayedItems = useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount],
  );

  const hasMore = displayCount < items.length;

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer || !hasMore) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((prev) =>
            Math.min(prev + LOAD_MORE_COUNT, items.length),
          );
        }
      },
      { threshold: 0.1 },
    );

    intersectionObserver.observe(observer);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [hasMore, items.length]);

  return {
    displayedItems,
    hasMore,
    observerRef,
  };
}
