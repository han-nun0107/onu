import { convertYoutubeToThumbnail } from "@/utils/convertYoutubeToThumbnail";
import { useState } from "react";

export function useMusicCard(image: string, title: string) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const thumbnail = convertYoutubeToThumbnail(image);

  const handleHeartClick = () => {
    setIsLiked((prev) => !prev);
  };

  const handleImageClick = async () => {
    const textToCopy = `신청 - ${title}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };
  return {
    isLiked,
    isCopied,
    thumbnail,
    handleHeartClick,
    handleImageClick,
  };
}
