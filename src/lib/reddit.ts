import type { RedditPost } from '@/types/trend';
import { getMemoryCache, setMemoryCache } from './cache';

// Reddit's public JSON API — no auth required, just append .json to any URL
const USER_AGENT = 'NeuralPath/1.0 (public JSON API)';

async function redditFetch(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Reddit fetch failed: ${res.status}`);
  return res.json();
}

export async function getRedditPosts(subreddit: string, limit = 20): Promise<RedditPost[]> {
  const cacheKey = `reddit_${subreddit}_${limit}`;
  const cached = getMemoryCache<RedditPost[]>(cacheKey);
  if (cached) return cached;

  const data = await redditFetch(
    `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`
  );

  const posts: RedditPost[] = (data.data?.children ?? []).map(
    (child: { data: Record<string, unknown> }) => ({
      id: String(child.data.id),
      title: String(child.data.title),
      url: child.data.url
        ? String(child.data.url)
        : `https://reddit.com${child.data.permalink}`,
      score: Number(child.data.score),
      subreddit: String(child.data.subreddit),
      createdAt: new Date((child.data.created_utc as number) * 1000).toISOString(),
      numComments: Number(child.data.num_comments),
    })
  );

  setMemoryCache(cacheKey, posts, 5 * 60 * 1000);
  return posts;
}

export async function searchReddit(query: string, limit = 25): Promise<RedditPost[]> {
  const cacheKey = `reddit_search_${query}`;
  const cached = getMemoryCache<RedditPost[]>(cacheKey);
  if (cached) return cached;

  const data = await redditFetch(
    `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=top&t=year&limit=${limit}`
  );

  const posts: RedditPost[] = (data.data?.children ?? []).map(
    (child: { data: Record<string, unknown> }) => ({
      id: String(child.data.id),
      title: String(child.data.title),
      url: child.data.url
        ? String(child.data.url)
        : `https://reddit.com${child.data.permalink}`,
      score: Number(child.data.score),
      subreddit: String(child.data.subreddit),
      createdAt: new Date((child.data.created_utc as number) * 1000).toISOString(),
      numComments: Number(child.data.num_comments),
    })
  );

  setMemoryCache(cacheKey, posts, 5 * 60 * 1000);
  return posts;
}

export async function fetchRedditTrending(): Promise<RedditPost[]> {
  const subreddits = ['MachineLearning', 'LocalLLaMA', 'artificial', 'deeplearning'];
  const results = await Promise.allSettled(
    subreddits.map((sub) => getRedditPosts(sub, 10))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<RedditPost[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => b.score - a.score);
}
