import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { TrendFeed } from '@/components/trends/TrendFeed';
import { GlossarySearch } from '@/components/trends/GlossarySearch';
import { ArxivFeed } from '@/components/trends/ArxivFeed';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export const metadata: Metadata = {
  title: 'AI Trends & Terminology | NeuralPath',
  description: 'Live AI trends from Reddit, Hacker News, and ArXiv with Gemini-powered definitions.',
};

export default function TrendsPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5">
            <TrendingUp className="mr-2 h-3 w-3" /> Module 3
          </Badge>
          <h1 className="text-4xl font-bold mb-3">AI Trends & Terminology</h1>
          <p className="text-lg text-muted-foreground">
            Stay current — live from Reddit, HN, and ArXiv
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ErrorBoundary>
              <GlossarySearch />
            </ErrorBoundary>
            <div>
              <h2 className="text-lg font-semibold mb-4">Trending Discussions</h2>
              <ErrorBoundary>
                <TrendFeed />
              </ErrorBoundary>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Latest Papers</h2>
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} lines={2} />)}
                  </div>
                }>
                  <ArxivFeed query="large language models agents RAG" />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
