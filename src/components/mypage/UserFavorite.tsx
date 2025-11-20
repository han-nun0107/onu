import { Card } from "@/components";

export default function UserFavorite({
  favoriteSingsLength,
}: {
  favoriteSingsLength: number;
}) {
  const MY_PAGE_CARD = [
    {
      count: 0,
      label: "신청곡 수",
      favorite: false,
    },
    {
      count: favoriteSingsLength,
      label: "즐겨찾기",
      favorite: true,
    },
  ];
  return (
    <article className="mt-9 flex w-[430px] flex-col justify-center">
      <h2 className="mt-6 mb-2 text-left text-[1.05rem] font-extrabold text-[#7c3aed]">
        내 신청곡/즐겨찾기 통계
      </h2>
      <div className="flex items-center justify-center gap-2">
        {MY_PAGE_CARD.map((card) => (
          <Card
            type="myPage"
            data={{
              count: card.count,
              label: card.label,
              favorite: card.favorite,
            }}
          />
        ))}
      </div>
    </article>
  );
}
