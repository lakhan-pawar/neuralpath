import type { Job } from '@/types/job';

const JOBSPY_API_URL = process.env.JOBSPY_API_URL || 'http://localhost:8000';

export async function searchJobSpy(
  query: string,
  location: string = 'Canada',
  sites: string[] = ['indeed', 'linkedin']
): Promise<Job[]> {
  try {
    const siteParam = sites.join(',');
    // Reduced to 10 results to avoid timeouts on Render free tier
    const url = `${JOBSPY_API_URL}/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&results_wanted=10&site=${siteParam}`;
    
    console.log('JobSpy API URL from env:', process.env.JOBSPY_API_URL);
    console.log('Fetching from JobSpy API:', url);
    
    // Add timeout using AbortController - 60 seconds for Render free tier spin-up
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    const res = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store', // Don't cache to avoid stale data
      headers: {
        'Accept': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error('JobSpy API error:', res.status, res.statusText);
      const errorText = await res.text().catch(() => 'No error details');
      console.error('Error details:', errorText);
      return [];
    }

    const data = await res.json();
    
    console.log('JobSpy response:', data.count, 'jobs from', data.sites);
    
    if (data.error) {
      console.error('JobSpy error:', data.error);
      return [];
    }

    return data.jobs || [];
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('JobSpy fetch timeout after 60 seconds - Render service may be spinning up');
    } else {
      console.error('JobSpy fetch error:', error);
    }
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
