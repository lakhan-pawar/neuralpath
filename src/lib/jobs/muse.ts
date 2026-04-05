import type { Job } from '@/types/job';

const BASE = 'https://www.themuse.com/api/public/jobs';

export async function searchMuse(query: string, page = 1): Promise<Job[]> {
  try {
    // The Muse API works better without strict category filters
    // We'll search broadly and filter by query terms
    const url = `${BASE}?descending=true&page=${page}`;
    
    console.log('Fetching from Muse API:', url);
    
    const res = await fetch(url, { 
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Muse API error:', res.status);
      return [];
    }
    
    const data = await res.json();
    console.log('Muse API response:', data.total, 'total jobs,', data.results?.length, 'in this page');

    if (!data.results || data.results.length === 0) {
      return [];
    }

    // Filter by query terms
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    return data.results
      .filter((r: Record<string, unknown>) => {
        const searchText = `${r.name} ${r.contents}`.toLowerCase();
        // Match if any query term is found, or if it's a tech/data/AI related job
        const matchesQuery = queryTerms.some(term => searchText.includes(term));
        const isTechJob = searchText.includes('engineer') || 
                         searchText.includes('developer') || 
                         searchText.includes('data') ||
                         searchText.includes('ai') ||
                         searchText.includes('machine learning') ||
                         searchText.includes('software');
        return matchesQuery || isTechJob;
      })
      .slice(0, 15)
      .map((r: Record<string, unknown>) => {
        const company = r.company as Record<string, string> | undefined;
        const locations = r.locations as Array<Record<string, string>> | undefined;
        const refs = r.refs as Record<string, string> | undefined;
        const categories = r.categories as Array<Record<string, string>> | undefined;
        
        const locationName = locations?.[0]?.name ?? 'Remote';
        const isRemote = locationName.toLowerCase().includes('remote') || 
                        locationName.toLowerCase().includes('flexible');
        
        return {
          id: `muse_${r.id}`,
          title: String(r.name ?? 'Untitled'),
          company: company?.name ?? 'Unknown',
          location: locationName,
          remote: isRemote,
          description: String(r.contents ?? '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 300) + '...',
          url: refs?.landing_page ?? '#',
          source: 'muse' as const,
          postedAt: (r.publication_date as string) ?? new Date().toISOString(),
          tags: categories?.map((c) => c.name).slice(0, 5) ?? [],
        };
      });
  } catch (error) {
    console.error('Muse API fetch error:', error);
    return [];
  }
}
