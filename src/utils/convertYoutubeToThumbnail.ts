function getYouTubeID(u: string): string | null {
  if (typeof u !== "string") return null;
  const m = u.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/);
  return m ? m[1] : null;
}

export function convertYoutubeToThumbnail(url: string) {
  if (!url) return "";

  if (url.endsWith(".jpg") || url.endsWith(".png") || url.includes("ytimg")) {
    return url;
  }

  const id = getYouTubeID(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "https://via.placeholder.com/320x180";
}
