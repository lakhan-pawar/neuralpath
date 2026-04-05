'use client';

import { useState, useCallback } from 'react';
import type { Job, JobFilter } from '@/types/job';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchJobs = useCallback(async (filter: JobFilter) => {
    console.log('=== Starting job search ===');
    console.log('Filter:', filter);
    
    const params = new URLSearchParams({
      q: filter.query,
      location: filter.location,
      remote: String(filter.remote),
      seniority: filter.seniority,
      salaryMin: String(filter.salaryMin),
    });

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const url = `/api/jobs?${params}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response:', data);
      
      let filteredJobs = data.jobs ?? [];
      console.log('Jobs before source filter:', filteredJobs.length);
      
      // Filter by sources if any are selected
      if (filter.sources && filter.sources.length > 0) {
        filteredJobs = filteredJobs.filter((job: Job) => 
          filter.sources.includes(job.source)
        );
        console.log('Jobs after source filter:', filteredJobs.length);
      }
      
      console.log('Final jobs count:', filteredJobs.length);
      setJobs(filteredJobs);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch jobs';
      console.error('Job search error:', errorMsg, err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, hasSearched, searchJobs };
}
