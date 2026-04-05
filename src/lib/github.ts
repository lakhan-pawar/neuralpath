import type { Repo, Contributor } from '@/types/project';
import { getMemoryCache, setMemoryCache } from './cache';

const BASE = 'https://api.github.com';

async function ghFetch(path: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`${BASE}${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getTrendingAIRepos(topic = 'llm', perPage = 20): Promise<Repo[]> {
  const cacheKey = `gh_trending_${topic}`;
  const cached = getMemoryCache<Repo[]>(cacheKey);
  if (cached) return cached;

  const query = `topic:${topic} stars:>100`;
  const data = await ghFetch(
    `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`
  );

  const repos: Repo[] = data.items.map((r: Record<string, unknown>) => ({
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description ?? '',
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language ?? 'Unknown',
    topics: r.topics ?? [],
    updatedAt: r.updated_at,
    owner: {
      login: (r.owner as Record<string, string>).login,
      avatarUrl: (r.owner as Record<string, string>).avatar_url,
    },
  }));

  setMemoryCache(cacheKey, repos, 60 * 60 * 1000);
  return repos;
}

export async function getRepoContributors(fullName: string): Promise<Contributor[]> {
  const data = await ghFetch(`/repos/${fullName}/contributors?per_page=5`);
  return data.map((c: Record<string, unknown>) => ({
    login: c.login,
    avatarUrl: c.avatar_url,
    contributions: c.contributions,
    url: c.html_url,
  }));
}
