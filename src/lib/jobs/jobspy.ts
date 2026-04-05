import type { Job } from '@/types/job';

const JOBSPY_API_URL = process.env.JOBSPY_API_URL || 'http://localhost:8000';

export async function searchJobSpy(
  query: string,
  location: string = 'Canada',
  sites: string[] = ['indeed', 'linkedin']
): Promise<Job[]> {
  try {
    const siteParam = sites.join(',');
    const url = `${JOBSPY_API_URL}/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&results_wanted=15&site=${siteParam}`;
    
    console.log('Fetching from JobSpy API:', url);
    
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('JobSpy API error:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    
    if (data.error) {
      console.error('JobSpy error:', data.error);
      return [];
    }

    return data.jobs || [];
  } catch (error) {
    console.error('JobSpy fetch error:', error);
    return [];
  }
}

// Search Indeed via JobSpy
export async function searchIndeedJobSpy(query: string, location: string = 'Canada'): Promise<Job[]> {
  return searchJobSpy(query, location, ['indeed']);
}

// Search LinkedIn via JobSpy
export async function searchLinkedInJobSpy(query: string, location: string = 'Canada'): Promise<Job[]> {
  return searchJobSpy(query, location, ['linkedin']);
}

// Search ZipRecruiter via JobSpy
export async function searchZipRecruiterJobSpy(query: string, location: string = 'USA'): Promise<Job[]> {
  return searchJobSpy(query, location, ['zip_recruiter']);
}

// Search Glassdoor via JobSpy
export async function searchGlassdoorJobSpy(query: string, location: string = 'Canada'): Promise<Job[]> {
  return searchJobSpy(query, location, ['glassdoor']);
}
