import { Modal } from "@/components";
import type { SongData } from "@/api/songdb";
import { CategoryModal, SingerModal } from "@/components";

type IndexAnotherCardProps = {
  image: string;
  categories: string[];
  songs?: SongData[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: "category" | "singer";
};

export default function IndexAnotherCard({
  image,
  categories,
  songs = [],
  isOpen,
  setIsOpen,
  type,
}: IndexAnotherCardProps) {
  const categoryName = categories[0] || "";

  return (
    <article>
      <div
        className="relative flex h-32 w-57 cursor-pointer items-center justify-center overflow-hidden rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={image}
          alt="카드 이미지"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        <p className="relative z-10 text-center text-sm font-bold text-[#fafafb] drop-shadow-lg">
          {categoryName}
        </p>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={categoryName}
      >
        {type === "category" ? (
          <CategoryModal songs={songs} categoryName={categoryName} />
        ) : (
          <SingerModal songs={songs} singerName={categoryName} />
        )}
      </Modal>
    </article>
  );
}
