'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Loader2 } from 'lucide-react';

interface TermResult {
  term: string;
  definition: string;
  url?: string;
}

export function GlossarySearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TermResult | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/glossary?term=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ term: query, definition: 'Definition unavailable.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookup()}
            placeholder="Search AI term (e.g. RAG, embeddings, RLHF)..."
            className="pl-10"
          />
        </div>
        <Button onClick={lookup} disabled={loading || !query.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Define'}
        </Button>
      </div>

      {result && (
        <Card className="glass border-primary/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">{result.term}</Badge>
              {result.url && (
                <a href={result.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                  Wikipedia <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed">{result.definition}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
