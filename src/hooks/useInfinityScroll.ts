import { useLayoutEffect, useCallback } from "react";

interface Params {
  observerRef: React.RefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export function useInfinityScroll({
  observerRef,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: Params) {
  // fetchNextPage를 안정적인 참조로 만들기
  const stableFetchNextPage = useCallback(() => {
    if (!hasNextPage || isFetching) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  useLayoutEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (isIntersecting) {
        stableFetchNextPage();
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.1,
      rootMargin: "100px", // ★ 미리 로드 시작
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [observerRef, stableFetchNextPage]); // ★ 의존성 단순화
}
