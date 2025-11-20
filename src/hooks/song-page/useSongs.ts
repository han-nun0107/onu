import {
  fetchSongs,
  fetchAllSongs,
  fetchTotalSongCount,
  PAGE_SIZE,
} from "@/api/songdb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useInfiniteSongs = () => {
  return useInfiniteQuery({
    queryKey: ["songs", "infinite"],
    queryFn: ({ pageParam = 0 }) => fetchSongs({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useTotalSongCount = () => {
  return useQuery({
    queryKey: ["songs", "totalCount"],
    queryFn: fetchTotalSongCount,
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
};

export const useAllSongs = () => {
  return useQuery({
    queryKey: ["songs", "all"],
    queryFn: fetchAllSongs,
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
};
