'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';
import type { Repo } from '@/types/project';

export function ProjectExplainer({ repo }: { repo: Repo }) {
  const { response, loading, ask } = useGemini();

  const explain = () => {
    ask(
      `Explain this GitHub project to a C# developer transitioning to AI Engineering:\n\nRepo: ${repo.fullName}\nDescription: ${repo.description}\nTopics: ${repo.topics.join(', ')}\nLanguage: ${repo.language}\n\nCover: 1) What it does, 2) Key AI concepts used, 3) How a C# dev can learn from it, 4) Suggested first contribution.`,
      'You are a senior AI Engineer mentoring a C# developer. Be practical and encouraging.'
    );
  };

  return (
    <Card className="glass border-primary/20">
      <CardContent className="pt-4 pb-4">
        {!response && !loading && (
          <Button size="sm" onClick={explain} className="w-full gap-2">
            <Sparkles className="h-4 w-4" /> Explain with Gemini
          </Button>
        )}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4 animate-pulse text-primary" /> Analyzing repo...
          </div>
        )}
        {response && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{response}</div>
        )}
      </CardContent>
    </Card>
  );
}
