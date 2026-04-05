import type { Job, JobFilter } from '@/types/job';
import { searchAdzuna, searchAdzunaCanada } from './adzuna';
import { searchMuse } from './muse';
import { searchIndeedCanada } from './indeed';
import { searchEluta } from './eluta';
import { searchLinkedIn } from './linkedin';
import { searchLinkedInJobSpy } from './jobspy';

export async function aggregateJobs(filter: JobFilter): Promise<Job[]> {
  // Check if JobSpy API is available at runtime (only for LinkedIn)
  const JOBSPY_ENABLED = !!process.env.JOBSPY_API_URL;
  
  console.log('=== Job Aggregator Configuration ===');
  console.log('JobSpy API URL:', process.env.JOBSPY_API_URL);
  console.log('JobSpy Enabled (LinkedIn only):', JOBSPY_ENABLED);
  console.log('Indeed: Using RSS feed');
  console.log('Filter:', filter);
  
  const query = filter.query || 'AI engineer machine learning';
  const location = filter.location || 'Canada';

  // Use RSS feed for Indeed (always)
  const indeedPromise = searchIndeedCanada(query, location);
    
  // Use JobSpy for LinkedIn if available, otherwise use mock data
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
  const location = 'Canada';

  const results = await Promise.allSettled([
    searchAdzunaCanada(query),
    searchIndeedCanada(query, location),
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
