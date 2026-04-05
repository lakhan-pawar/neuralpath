'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';
import { SourceBadge } from './SourceBadge';
import type { Question } from '@/types/interview';

const DIFFICULTY_COLORS = {
  easy: 'border-green-500/30 text-green-500',
  medium: 'border-yellow-500/30 text-yellow-500',
  hard: 'border-red-500/30 text-red-500',
};

export function QuestionCard({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false);
  const { response, loading, ask } = useGemini();

  const getAnswer = () => {
    if (response) { setExpanded(true); return; }
    ask(
      `Answer this AI Engineering interview question concisely and technically:\n\n${question.question}\n\nProvide a structured answer with key points. Mention any C#/.NET parallels where relevant.`,
      'You are a senior AI Engineer helping a C# developer prepare for AI Engineering interviews. Be precise and practical.'
    );
    setExpanded(true);
  };

  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="font-medium text-sm leading-relaxed flex-1">{question.question}</p>
          <SourceBadge source={question.source} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[question.difficulty]}`}>
            {question.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-xs">{question.category}</Badge>
          {question.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-border/50">{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={getAnswer} disabled={loading} className="gap-1">
            <Brain className="h-3 w-3" />
            {loading ? 'Generating...' : response ? 'Show Answer' : 'Get AI Answer'}
          </Button>
          {response && (
            <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
        {expanded && response && (
          <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm leading-relaxed whitespace-pre-wrap">
            {response}
            {loading && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
