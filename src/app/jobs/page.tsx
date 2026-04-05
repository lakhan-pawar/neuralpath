import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobAggregator } from '@/components/jobs/JobAggregator';
import { GeminiChat } from '@/components/shared/GeminiChat';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export const metadata: Metadata = {
  title: 'AI Job Finder | NeuralPath',
  description: 'Live AI Engineering job listings aggregated from multiple sources.',
};

export default function JobsPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Briefcase className="mr-2 h-3 w-3" /> Module 2
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Job Finder</h1>
          <p className="text-lg text-muted-foreground">
            AI Engineering roles aggregated from multiple sources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ErrorBoundary>
              <JobFilters />
              <JobAggregator />
            </ErrorBoundary>
          </div>
          <div className="space-y-6">
            <GeminiChat
              title="Job Match Advisor"
              placeholder="Paste a job description to analyze..."
              systemPrompt="You are a career advisor for C# developers transitioning to AI Engineering. Analyze job descriptions, identify skill gaps, and suggest how to position their .NET experience. Be specific and actionable. Output: match score 0-100, strengths, gaps, tips, estimated time to qualify."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
