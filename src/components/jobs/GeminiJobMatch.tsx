'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';
import type { Job } from '@/types/job';

export function GeminiJobMatch({ job }: { job: Job }) {
  const { response, loading, ask } = useGemini();

  const analyze = () => {
    ask(
      `Analyze this AI job for a C# developer transitioning to AI Engineering:\n\nTitle: ${job.title}\nCompany: ${job.company}\nDescription: ${job.description}\n\nProvide: 1) Match score (0-100) for a 5yr C# dev, 2) Key skills to highlight, 3) Gaps to address, 4) One-line pitch.`,
      'You are a career coach specializing in helping .NET developers transition to AI Engineering. Be concise and actionable.'
    );
  };

  return (
    <Card className="glass border-primary/20">
      <CardContent className="pt-4 pb-4">
        {!response && !loading && (
          <Button size="sm" onClick={analyze} className="w-full gap-2">
            <Sparkles className="h-4 w-4" />
            Analyze Match with Gemini
          </Button>
        )}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4 animate-pulse text-primary" />
            Analyzing...
          </div>
        )}
        {response && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{response}</div>
        )}
      </CardContent>
    </Card>
  );
}
