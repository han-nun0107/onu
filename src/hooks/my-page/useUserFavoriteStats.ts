import { useState, useMemo } from "react";
import type { FavoriteItem } from "@/types";

export const useUserFavoriteStats = (favoriteItems: FavoriteItem[]) => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favoriteItems.length / ITEMS_PER_PAGE);

  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return favoriteItems.slice(startIndex, endIndex);
  }, [currentPage, favoriteItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPageItems,
    totalPages,
    handlePageChange,
    currentPage,
    ITEMS_PER_PAGE,
  };
};
