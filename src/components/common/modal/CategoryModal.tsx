import type { SongData } from "@/api/songdb";
import SongListModal from "./SongListModal";

type CategoryModalProps = {
  songs: SongData[];
  categoryName: string;
};

export default function CategoryModal({
  songs,
  categoryName,
}: CategoryModalProps) {
  return (
    <SongListModal
      songs={songs}
      filterName={categoryName}
      filterType="category"
    />
  );
}
