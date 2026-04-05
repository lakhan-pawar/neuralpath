import type { Job } from '@/types/job';

const BASE = 'https://www.themuse.com/api/public/jobs';

export async function searchMuse(query: string, page = 1): Promise<Job[]> {
  const res = await fetch(
    `${BASE}?descending=true&page=${page}&category=Data+Science&category=Software+Engineer`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];
  const data = await res.json();

  const q = query.toLowerCase();
  return (data.results ?? [])
    .filter((r: Record<string, unknown>) =>
      String(r.name).toLowerCase().includes(q) ||
      String(r.contents).toLowerCase().includes(q)
    )
    .slice(0, 20)
    .map((r: Record<string, unknown>) => ({
      id: `muse_${r.id}`,
      title: r.name,
      company: (r.company as Record<string, string>)?.name ?? 'Unknown',
      location: ((r.locations as Array<Record<string, string>>)?.[0]?.name) ?? 'Remote',
      remote: ((r.locations as Array<Record<string, string>>)?.[0]?.name ?? '').toLowerCase().includes('remote'),
      description: String(r.contents ?? '').replace(/<[^>]+>/g, '').slice(0, 500),
      url: r.refs ? (r.refs as Record<string, string>).landing_page : '#',
      source: 'muse' as const,
      postedAt: r.publication_date as string,
      tags: (r.categories as Array<Record<string, string>>)?.map((c) => c.name) ?? [],
    }));
}
