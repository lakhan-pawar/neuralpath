import type { Job } from '@/types/job';

const BASE = 'https://api.adzuna.com/v1/api/jobs';

export async function searchAdzuna(query: string, location = 'us', page = 1): Promise<Job[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return [];

  const res = await fetch(
    `${BASE}/${location}/search/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=20&content-type=application/json`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];
  const data = await res.json();

  return (data.results ?? []).map((r: Record<string, unknown>) => ({
    id: `adzuna_${location}_${r.id}`,
    title: r.title,
    company: (r.company as Record<string, string>)?.display_name ?? 'Unknown',
    location: (r.location as Record<string, string>)?.display_name ?? '',
    remote: String(r.title).toLowerCase().includes('remote'),
    salary:
      r.salary_min && r.salary_max
        ? { 
            min: r.salary_min as number, 
            max: r.salary_max as number, 
            currency: location === 'ca' ? 'CAD' : 'USD' 
          }
        : undefined,
    description: r.description ?? '',
    url: r.redirect_url,
    source: 'adzuna' as const,
    postedAt: r.created,
    tags: [],
  }));
}

// Search specifically in Canada
export async function searchAdzunaCanada(query: string, page = 1): Promise<Job[]> {
  return searchAdzuna(query, 'ca', page);
}
