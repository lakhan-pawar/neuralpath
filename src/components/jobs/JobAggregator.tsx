'use client';

import { JobCard } from './JobCard';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ApiStatusBadge } from '@/components/shared/ApiStatusBadge';
import { useJobs } from '@/hooks/useJobs';
import { useAppStore } from '@/store/appStore';

export function JobAggregator() {
  const { jobFilter } = useAppStore();
  const { jobs, loading, error } = useJobs(jobFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {loading ? 'Searching...' : `${jobs.length} positions found`}
        </span>
        <ApiStatusBadge status={error ? 'error' : loading ? 'cached' : 'live'} />
      </div>

      {loading && Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} lines={3} />)}

      {!loading && error && (
        <p className="text-sm text-destructive text-center py-8">{error}</p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No jobs found. Try adjusting your filters.
        </p>
      )}

      {!loading && jobs.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
}
