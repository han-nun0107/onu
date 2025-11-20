import type { SongData } from "@/api/songdb";

export function normalizeCategories(song: SongData): string[] {
  const categories = [
    ...(Array.isArray(song.categories)
      ? song.categories
      : song.categories
        ? [song.categories]
        : []),

    ...(Array.isArray(song.category)
      ? song.category
      : song.category
        ? [song.category]
        : []),
  ];

  if (song.notes) {
    const notesText = song.notes.trim();
    if (notesText) {
      const noteItems = notesText
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      noteItems.forEach((item) => {
        if (!categories.includes(item)) {
          categories.push(item);
        }
      });
    }
  }

  return categories;
}

export function normalizeSinger(song: SongData): string {
  return (song.artist || song.singer || "") as string;
}

export function parseSong(song: SongData) {
  return {
    ...song,
    processedCategories: normalizeCategories(song),
    processedSinger: normalizeSinger(song),
  };
}

export function parseSongs(songs: SongData[]) {
  return songs.map(parseSong);
}
