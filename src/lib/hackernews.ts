import type { HNPost } from '@/types/trend';
import { getMemoryCache, setMemoryCache } from './cache';

export async function searchHN(query: string, limit = 20): Promise<HNPost[]> {
  const cacheKey = `hn_${query}`;
  const cached = getMemoryCache<HNPost[]>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=${limit}`,
    { next: { revalidate: 900 } }
  );

  if (!res.ok) throw new Error(`HN API error: ${res.status}`);
  const data = await res.json();

  const posts: HNPost[] = data.hits.map((h: Record<string, unknown>) => ({
    id: h.objectID,
    title: h.title,
    url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
    score: h.points ?? 0,
    by: h.author,
    time: h.created_at_i,
    descendants: h.num_comments ?? 0,
  }));

  setMemoryCache(cacheKey, posts, 15 * 60 * 1000);
  return posts;
}
