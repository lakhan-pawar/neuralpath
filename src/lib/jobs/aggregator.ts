import type { Job, JobFilter } from '@/types/job';
import { searchAdzuna, searchAdzunaCanada } from './adzuna';
import { searchMuse } from './muse';
import { searchIndeedCanada } from './indeed';
import { searchEluta } from './eluta';
import { searchLinkedIn } from './linkedin';
import { searchIndeedJobSpy, searchLinkedInJobSpy } from './jobspy';

// Check if JobSpy API is available
const JOBSPY_ENABLED = !!process.env.JOBSPY_API_URL;

export async function aggregateJobs(filter: JobFilter): Promise<Job[]> {
  const query = filter.query || 'AI engineer machine learning';
  const location = filter.location || 'Canada';

  // Use JobSpy for Indeed and LinkedIn if available, otherwise use mock data
  const indeedPromise = JOBSPY_ENABLED 
    ? searchIndeedJobSpy(query, location)
    : searchIndeedCanada(query);
    
  const linkedInPromise = JOBSPY_ENABLED
    ? searchLinkedInJobSpy(query, location)
    : searchLinkedIn(query);

  // Fetch from multiple sources
  const results = await Promise.allSettled([
    searchAdzuna(query, 'us'),
    searchAdzunaCanada(query),
    searchMuse(query),
    indeedPromise,
    searchEluta(query),
    linkedInPromise,
  ]);

  const [adzunaUS, adzunaCA, museJobs, indeedJobs, elutaJobs, linkedInJobs] = results;

  const all: Job[] = [
    ...(adzunaUS.status === 'fulfilled' ? adzunaUS.value : []),
    ...(adzunaCA.status === 'fulfilled' ? adzunaCA.value : []),
    ...(museJobs.status === 'fulfilled' ? museJobs.value : []),
    ...(indeedJobs.status === 'fulfilled' ? indeedJobs.value : []),
    ...(elutaJobs.status === 'fulfilled' ? elutaJobs.value : []),
    ...(linkedInJobs.status === 'fulfilled' ? linkedInJobs.value : []),
  ];

  // Dedupe by title+company
  const seen = new Set<string>();
  const deduped = all.filter((job) => {
    const key = `${job.title.toLowerCase()}_${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped
    .filter((job) => {
      if (filter.remote && !job.remote) return false;
      if (filter.salaryMin > 0 && job.salary && job.salary.min < filter.salaryMin) return false;
      
      // Filter by location if specified
      if (filter.location && filter.location.toLowerCase() !== 'all') {
        const jobLocation = job.location.toLowerCase();
        const filterLocation = filter.location.toLowerCase();
        if (!jobLocation.includes(filterLocation)) return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
}

// Get jobs specifically for Canada
export async function aggregateCanadianJobs(filter: JobFilter): Promise<Job[]> {
  const query = filter.query || 'AI engineer machine learning';

  const results = await Promise.allSettled([
    searchAdzunaCanada(query),
    searchIndeedCanada(query),
    searchEluta(query),
    searchLinkedIn(query),
  ]);

  const [adzunaCA, indeedCA, elutaJobs, linkedInJobs] = results;

  const all: Job[] = [
    ...(adzunaCA.status === 'fulfilled' ? adzunaCA.value : []),
    ...(indeedCA.status === 'fulfilled' ? indeedCA.value : []),
    ...(elutaJobs.status === 'fulfilled' ? elutaJobs.value : []),
    ...(linkedInJobs.status === 'fulfilled' ? linkedInJobs.value : []),
  ];

  // Dedupe by title+company
  const seen = new Set<string>();
  const deduped = all.filter((job) => {
    const key = `${job.title.toLowerCase()}_${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped
    .filter((job) => {
      if (filter.remote && !job.remote) return false;
      if (filter.salaryMin > 0 && job.salary && job.salary.min < filter.salaryMin) return false;
      return true;
    })
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
}
