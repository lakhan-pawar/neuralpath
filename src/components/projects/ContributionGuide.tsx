'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitFork, Loader2 } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';
import type { Repo } from '@/types/project';

export function ContributionGuide({ repo }: { repo: Repo }) {
  const [shown, setShown] = useState(false);
  const { response, loading, ask } = useGemini();

  const generate = () => {
    setShown(true);
    ask(
      `Give a beginner-friendly step-by-step contribution guide for the GitHub repo "${repo.fullName}" (${repo.description}). Topics: ${repo.topics.join(', ')}. Cover: 1) Setup, 2) Finding good first issues, 3) Making a PR, 4) What skills you'll gain. Keep it practical and encouraging for a C# developer new to open source AI projects.`,
      'You are a senior open source maintainer helping a C# developer make their first AI project contribution.'
    );
  };

  if (!shown) {
    return (
      <Button size="sm" variant="outline" onClick={generate} className="gap-1.5">
        <GitFork className="h-3.5 w-3.5" /> How to contribute?
      </Button>
    );
  }

  return (
    <Card className="glass border-primary/20 mt-3">
      <CardHeader>
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <GitFork className="h-4 w-4 text-primary" /> Contribution Guide
        </h4>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Generating guide...
          </div>
        )}
        {response && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{response}</div>
        )}
      </CardContent>
    </Card>
  );
}
