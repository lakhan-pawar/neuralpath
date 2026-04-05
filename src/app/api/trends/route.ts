import { getRedditPosts } from '@/lib/reddit';
import { searchHN } from '@/lib/hackernews';
import type { Trend } from '@/types/trend';

export async function GET() {
  const [redditML, redditLLaMA, hnResults] = await Promise.allSettled([
    getRedditPosts('MachineLearning'),
    getRedditPosts('LocalLLaMA'),
    searchHN('LLM AI machine learning'),
  ]);

  const trends: Trend[] = [];

  // Process MachineLearning subreddit
  if (redditML.status === 'fulfilled') {
    redditML.value.slice(0, 5).forEach((p) => {
      trends.push({
        id: `reddit_${p.id}`,
        title: p.title,
        source: 'reddit',
        url: p.url,
        score: p.score,
        summary: '',
        tags: [p.subreddit],
        createdAt: p.createdAt,
      });
    });
  }

  // Process LocalLLaMA subreddit
  if (redditLLaMA.status === 'fulfilled') {
    redditLLaMA.value.slice(0, 5).forEach((p) => {
      trends.push({
        id: `reddit_${p.id}`,
        title: p.title,
        source: 'reddit',
        url: p.url,
        score: p.score,
        summary: '',
        tags: [p.subreddit],
        createdAt: p.createdAt,
      });
    });
  }

  // Process Hacker News results
  if (hnResults.status === 'fulfilled') {
    hnResults.value.slice(0, 10).forEach((p) => {
      trends.push({
        id: `hn_${p.id}`,
        title: p.title,
        source: 'hackernews',
        url: p.url,
        score: p.score,
        summary: '',
        tags: [],
        createdAt: new Date(p.time * 1000).toISOString(),
      });
    });
  }

  trends.sort((a, b) => b.score - a.score);
  return Response.json({ trends });
}
