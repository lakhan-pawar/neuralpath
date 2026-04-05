'use client';

import { useState, useEffect } from 'react';
import type { Job, JobFilter } from '@/types/job';

export function useJobs(filter: JobFilter) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      q: filter.query,
      location: filter.location,
      remote: String(filter.remote),
      seniority: filter.seniority,
      salaryMin: String(filter.salaryMin),
    });

    setLoading(true);
    setError(null);

    fetch(`/api/jobs?${params}`)
      .then((r) => r.json())
      .then((data) => {
        let filteredJobs = data.jobs ?? [];
        
        // Filter by sources if any are selected
        if (filter.sources && filter.sources.length > 0) {
          filteredJobs = filteredJobs.filter((job: Job) => 
            filter.sources.includes(job.source)
          );
        }
        
        setJobs(filteredJobs);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter.query, filter.location, filter.remote, filter.seniority, filter.salaryMin, filter.sources]);

  return { jobs, loading, error };
}
