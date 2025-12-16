import { Card, Pagination } from "@/components";
import type { FavoriteItem } from "@/types";
import { useUserFavoriteStats } from "@/hooks";

export default function UserFavoritesStats({
  favoriteItems,
}: {
  favoriteItems: FavoriteItem[];
}) {
  const {
    currentPageItems,
    totalPages,
    handlePageChange,
    ITEMS_PER_PAGE,
    currentPage,
  } = useUserFavoriteStats(favoriteItems);

  return (
    <article className="mt-6 px-4 sm:mt-8">
      <h2 className="mb-3 text-left text-base font-extrabold text-[#7c3aed] sm:mb-4 sm:text-[1.05rem]">
        즐겨찾기 곡
      </h2>
      <div className="mt-8 flex min-h-[200px] flex-col gap-1 sm:mt-12 sm:min-h-[325px]">
        {currentPageItems.map((item) => (
          <Card
            key={`${item.song}-${item.singer}`}
            type="favoriteCard"
            data={{ song: item.song, singer: item.singer }}
          />
        ))}
      </div>

      {favoriteItems.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </article>
  );
}
