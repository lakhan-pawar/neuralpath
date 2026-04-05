'use client';

import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// Disable SSR for components that use Zustand persist
const JobFilters = dynamic(() => import('@/components/jobs/JobFilters').then(mod => ({ default: mod.JobFilters })), { ssr: false });
const JobAggregator = dynamic(() => import('@/components/jobs/JobAggregator').then(mod => ({ default: mod.JobAggregator })), { ssr: false });

export default function JobsPage() {
  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Job Finder</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            AI Engineering roles aggregated from multiple sources
          </p>
        </div>

        <div className="space-y-6">
          <ErrorBoundary>
            <JobAggregator />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
