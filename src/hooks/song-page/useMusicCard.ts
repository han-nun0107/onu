import { convertYoutubeToThumbnail } from "@/utils/convertYoutubeToThumbnail";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabase";
import { useAuthStore } from "@/stores/authStore";
import type { FavoriteItem } from "@/types";

export function useMusicCard(image: string, title: string, singer: string) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const session = useAuthStore((state) => state.session);

  // 초기 로드 시 현재 노래가 favorites에 있는지 확인
  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session?.user?.id) {
        return;
      }

      try {
        const { data: profile } = await supabase
          .from("user_profile_stats")
          .select("favorites")
          .eq("user_id", session.user.id)
          .maybeSingle();

        const currentFavorites: FavoriteItem[] =
          profile &&
          Array.isArray((profile as { favorites?: unknown[] }).favorites)
            ? ((profile as { favorites: unknown[] })
                .favorites as FavoriteItem[])
            : [];

        const isAlreadyLiked = currentFavorites.some(
          (item) => item.song === title && item.singer === singer,
        );

        setIsLiked(isAlreadyLiked);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };

    checkIfLiked();
  }, [session?.user?.id, title, singer]);

  const thumbnail = convertYoutubeToThumbnail(image);

  const handleHeartClick = async () => {
    if (!session?.user?.id) {
      return;
    }

    try {
      // 현재 favorites 가져오기
      const { data: profile } = await supabase
        .from("user_profile_stats")
        .select("favorites")
        .eq("user_id", session.user.id)
        .maybeSingle();

      const currentFavorites: FavoriteItem[] =
        profile &&
        Array.isArray((profile as { favorites?: unknown[] }).favorites)
          ? ((profile as { favorites: unknown[] }).favorites as FavoriteItem[])
          : [];

      const newFavorite: FavoriteItem = { song: title, singer };

      // 이미 좋아요 상태면 제거, 아니면 추가
      const isAlreadyLiked = currentFavorites.some(
        (item) => item.song === title && item.singer === singer,
      );

      let updatedFavorites: FavoriteItem[];

      if (isAlreadyLiked) {
        // 제거
        updatedFavorites = currentFavorites.filter(
          (item) => !(item.song === title && item.singer === singer),
        );
        setIsLiked(false);
      } else {
        // 추가
        updatedFavorites = [...currentFavorites, newFavorite];
        setIsLiked(true);
      }

      // Supabase 업데이트
      const { error } = await supabase
        .from("user_profile_stats")
        .update({ favorites: updatedFavorites } as never)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error updating favorites:", error);
        // 에러 발생 시 상태 롤백
        setIsLiked(isAlreadyLiked);
      }
    } catch (error) {
      console.error("Error in handleHeartClick:", error);
    }
  };

  const handleImageClick = async () => {
    const textToCopy = `신청 ${title}`;
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
