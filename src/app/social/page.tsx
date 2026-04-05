'use client';

import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { SocialFeed } from '@/components/social/SocialFeed';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export default function SocialPage() {
  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Users className="mr-2 h-3 w-3" /> Community Insights
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI/ML Discussions</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Real conversations from developers about Claude, Gemini, OpenAI, Hugging Face, and more
          </p>
        </div>

        <div className="space-y-6">
          <ErrorBoundary>
            <SocialFeed />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
