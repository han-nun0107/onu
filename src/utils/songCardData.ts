import type { SongData } from "@/api/songdb";

type ProcessedSong = SongData & {
  processedSinger: string;
  processedCategories: string[];
};

export type MusicCardData = {
  title: string;
  singer: string;
  categories: string[];
  noteKey: string;
  image: string;
  completed?: boolean;
  recommend?: boolean;
  bomb?: boolean;
  youtubeUrl: string;
  songId?: number;
  songData?: SongData;
};

export const transformSongToCardData = (song: ProcessedSong): MusicCardData => {
  return {
    title: song.title || "",
    singer: song.processedSinger,
    categories: song.processedCategories,
    noteKey: song.key,
    image: song.thumbnail_url,
    completed: song.completed,
    recommend: song.recommend,
    bomb: song.bomb,
    youtubeUrl: song.inst || "",
    songId: song.id,
    songData: song,
  };
};

