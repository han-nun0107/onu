import { SEARCH_MAPPINGS } from "@/constants";

export function expandSearchQuery(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  const queries = [normalizedQuery];

  // 장르/카테고리 키 목록 (가수 그룹과 구분)
  const genreKeys = ["케이팝", "팝", "제이팝"];

  for (const [key, values] of Object.entries(SEARCH_MAPPINGS)) {
    const normalizedKey = key.toLowerCase();
    const isGenre = genreKeys.includes(key);

    // 정확히 일치하는 경우
    if (
      normalizedQuery === normalizedKey ||
      values.some((v) => v.toLowerCase() === normalizedQuery)
    ) {
      queries.push(normalizedKey);

      // 장르/카테고리인 경우: 검색어가 키이거나 값 중 하나면 모든 값 추가
      if (isGenre) {
        queries.push(...values.map((v) => v.toLowerCase()));
      } else {
        // 가수 그룹의 경우: 키로 검색한 경우에만 모든 값 추가
        // 멤버 이름으로 검색한 경우에는 키만 추가 (다른 멤버 제외)
        if (normalizedQuery === normalizedKey) {
          queries.push(...values.map((v) => v.toLowerCase()));
        }
      }
    }
    // 부분 일치
    else if (normalizedQuery.length >= 2) {
      const hasWordBoundaryMatch = values.some((v) => {
        const normalizedValue = v.toLowerCase();
        return (
          normalizedValue.startsWith(normalizedQuery) ||
          normalizedValue.endsWith(normalizedQuery) ||
          normalizedValue === normalizedQuery
        );
      });

      const hasKeyMatch =
        normalizedKey.startsWith(normalizedQuery) ||
        normalizedKey.endsWith(normalizedQuery) ||
        normalizedKey === normalizedQuery;

      if (hasWordBoundaryMatch || hasKeyMatch) {
        queries.push(normalizedKey);
        // 장르/카테고리인 경우 모든 값 추가
        if (isGenre) {
          queries.push(...values.map((v) => v.toLowerCase()));
        }
      }
    }
  }

  return Array.from(new Set(queries));
}

export function matchesSearchQuery(text: string, query: string): boolean {
  const normalizedText = text.toLowerCase();
  const expandedQueries = expandSearchQuery(query);

  return expandedQueries.some((expandedQuery) =>
    normalizedText.includes(expandedQuery),
  );
}
