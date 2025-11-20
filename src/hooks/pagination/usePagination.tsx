import { useMemo, useCallback } from "react";

type UsePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export function usePagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: UsePaginationProps) {
  const DOTS = "...";

  const paginationRange = useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => i + 1,
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i,
      );
      return [firstPage, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: 2 * siblingCount + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
    }
  }, [currentPage, totalPages, siblingCount]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, onPageChange, totalPages]);

  return {
    pages: paginationRange ?? [],
    onPagePrevious: handlePrevious,
    onPageNext: handleNext,
  };
}
