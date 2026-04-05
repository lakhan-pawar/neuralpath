import { getMemoryCache, setMemoryCache } from './cache';

export interface WikiSummary {
  title: string;
  extract: string;
  url: string;
}

export async function getWikiSummary(term: string): Promise<WikiSummary | null> {
  const cacheKey = `wiki_${term}`;
  const cached = getMemoryCache<WikiSummary>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) return null;
  const data = await res.json();

  const summary: WikiSummary = {
    title: data.title,
    extract: data.extract,
    url: data.content_urls?.desktop?.page ?? '',
  };

  setMemoryCache(cacheKey, summary, 24 * 60 * 60 * 1000);
  return summary;
}
