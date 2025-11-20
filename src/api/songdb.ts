import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL || "",
  headers: {
    "Content-Type": "application/json",
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ""}`,
  },
});

export type SongData = {
  id?: number;
  key: string;
  transpose?: number;
  notes?: string;
  completed: boolean;
  recommend: boolean;
  inst?: string;
  created_at?: string;
  bomb: boolean;
  thumbnail_url: string;
  title?: string;
  singer?: string;
  category?: string | string[];
  [key: string]: unknown;
};

export const PAGE_SIZE = 20;

export type FetchSongsParams = {
  pageParam?: number;
};

export const fetchSongs = async ({
  pageParam = 0,
}: FetchSongsParams = {}): Promise<SongData[]> => {
  try {
    const response = await apiClient.get("/rest/v1/onusongdb", {
      params: {
        select: "*",
        order: "created_at.desc",
        limit: PAGE_SIZE,
        offset: pageParam * PAGE_SIZE,
      },
    });

    return response.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "데이터를 불러오는데 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const fetchAllSongs = async (): Promise<SongData[]> => {
  try {
    const response = await apiClient.get("/rest/v1/onusongdb", {
      params: {
        select: "*",
        order: "created_at.desc",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "데이터를 불러오는데 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const fetchTotalSongCount = async (): Promise<number> => {
  try {
    const response = await apiClient.head("/rest/v1/onusongdb", {
      params: {
        select: "id",
      },
      headers: {
        Prefer: "count=exact",
      },
    });

    const contentRange = response.headers["content-range"];
    if (contentRange) {
      const match = contentRange.match(/\/(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    const countResponse = await apiClient.get("/rest/v1/onusongdb", {
      params: {
        select: "id",
        limit: 1,
      },
      headers: {
        Prefer: "count=exact",
      },
    });

    const countHeader = countResponse.headers["content-range"];
    if (countHeader) {
      const match = countHeader.match(/\/(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    return 0;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "전체 곡수를 불러오는데 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
