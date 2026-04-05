'use client';

import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ApiStatusBadge } from '@/components/shared/ApiStatusBadge';
import { Search } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useAppStore } from '@/store/appStore';

export function JobAggregator() {
  const { jobFilter } = useAppStore();
  const { jobs, loading, error, hasSearched, searchJobs } = useJobs();

  const handleSearch = () => {
    searchJobs(jobFilter);
  };

  return (
    <div className="space-y-4">
      {/* Filters with Search Button */}
      <JobFilters onSearch={handleSearch} isSearching={loading} />

      {/* Results Header */}
      {hasSearched && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {loading ? 'Searching...' : `${jobs.length} positions found`}
          </span>
          <ApiStatusBadge status={error ? 'error' : loading ? 'cached' : 'live'} />
        </div>
      )}

      {/* Loading State */}
      {loading && Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} lines={3} />)}

      {/* Error State */}
      {!loading && error && (
        <p className="text-sm text-destructive text-center py-8">{error}</p>
      )}

      {/* Empty State */}
      {!loading && hasSearched && jobs.length === 0 && !error && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No jobs found. Try adjusting your filters.
        </p>
      )}

      {/* Initial State */}
      {!hasSearched && !loading && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg text-muted-foreground mb-2">
            Ready to find your next opportunity?
          </p>
          <p className="text-sm text-muted-foreground">
            Enter your search criteria and click Search to start
          </p>
        </div>
      )}

      {/* Job Results */}
      {!loading && jobs.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
}
