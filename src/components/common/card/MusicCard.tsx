import { Button, Icon, Tag } from "@/components";
import HeartIcon from "@/assets/icons/heart/heartButton.svg?react";
import FullHeartIcon from "@/assets/icons/heart/fullHeart.svg?react";
import { useMusicCard } from "@/hooks";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/utils";

type MusicCardProps = {
  title: string;
  singer: string;
  categories: string[];
  noteKey: string;
  image: string;
  completed?: boolean;
  recommend?: boolean;
  bomb?: boolean;
  youtubeUrl: string;
};

export default function MusicCard({
  title,
  singer,
  categories,
  noteKey,
  image,
  completed,
  recommend,
  bomb,
  youtubeUrl,
}: MusicCardProps) {
  const { isLiked, isCopied, thumbnail, handleHeartClick, handleImageClick } =
    useMusicCard(image, title);
  const session = useAuthStore((state) => state.session);

  const handleYoutubeClick = () => {
    window.open(youtubeUrl, "_blank");
  };
  return (
    <article className="flex h-72 w-58 flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
        <div
          className="group relative h-32 w-full cursor-pointer overflow-hidden"
          onClick={handleImageClick}
        >
          <div className="relative h-full w-full bg-gray-200">
            <img
              src={thumbnail}
              alt="music-card"
              className="pointer-events-none h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="backdrop-blur-0 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm">
            <span className="text-lg font-bold text-white drop-shadow-lg">
              {isCopied ? "✓ 복사됨!" : "클릭하여 복사"}
            </span>
          </div>
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
            {completed && (
              <Tag
                type="badge"
                completed={true}
                className="pointer-events-none"
              />
            )}
            {recommend && (
              <Tag
                type="badge"
                recommend={true}
                className="pointer-events-none"
              />
            )}
            {bomb && (
              <Tag type="badge" bomb={true} className="pointer-events-none" />
            )}
          </div>
        </div>
        <div className="mx-3 flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-[2px]">
            <p className="text-sm font-bold text-[#1f2937]">{title}</p>
            <p className="text-[10px] font-medium text-[#6b7280]">{singer}</p>
          </div>
          <div className={cn(!session && "pointer-events-none invisible")}>
            <Button variant="ICON" onClick={handleHeartClick}>
              <Icon
                icon={isLiked ? FullHeartIcon : HeartIcon}
                size={30}
                color="black"
              />
            </Button>
          </div>
        </div>
        <div className="mx-3">
          <div className="mt-2 flex items-center gap-1 overflow-hidden">
            {categories.map((cat) => (
              <Tag type="tag" key={cat} className="shrink-0 text-[8px]">
                {cat}
              </Tag>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-1">
            <Button
              variant="MUSIC_CARD"
              onClick={handleYoutubeClick}
              className="transition-all duration-300 hover:scale-105"
            >
              INSTRUMENTAL
            </Button>
            <Tag type="note">{noteKey}</Tag>
          </div>
        </div>
      </div>
    </article>
  );
}
