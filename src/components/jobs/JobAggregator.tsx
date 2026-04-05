'use client';

import { useEffect } from 'react';
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

  // Auto-load jobs on mount
  useEffect(() => {
    if (!hasSearched) {
      searchJobs(jobFilter);
    }
  }, []);

  const handleSearch = () => {
    searchJobs(jobFilter);
  };

  return (
    <div className="space-y-6">
      {/* Filters with Search Button */}
      <JobFilters onSearch={handleSearch} isSearching={loading} />

      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-primary animate-progress-bar"></div>
        </div>
      )}

      {/* Results Header */}
      {hasSearched && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            {loading ? 'Searching across multiple job boards...' : `${jobs.length} positions found`}
          </span>
          <ApiStatusBadge status={error ? 'error' : loading ? 'cached' : 'live'} />
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-12 px-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && jobs.length === 0 && !error && (
        <div className="text-center py-12 px-4 bg-muted/30 rounded-lg">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-base text-muted-foreground mb-2">
            No jobs found matching your criteria
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}

      {/* Job Results - Two Column Grid */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Loading State - Two Column Grid */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} lines={4} />
          ))}
        </div>
      )}
    </div>
  );
}
