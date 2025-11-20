import type { SongData } from "@/api/songdb";

export function getSongTags(song: SongData): string[] {
  const tags: string[] = [];

  if (song.notes) tags.push(song.notes);
  if (song.completed) tags.push("숙제곡");
  if (song.recommend) tags.push("추천");
  if (song.bomb) tags.push("반숙");

  return tags;
}
