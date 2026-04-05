'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Brain, Send, RotateCcw } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';

interface Props {
  systemPrompt?: string;
  placeholder?: string;
  title?: string;
}

export function GeminiChat({ systemPrompt, placeholder = 'Ask anything...', title = 'AI Assistant' }: Props) {
  const [input, setInput] = useState('');
  const { response, loading, error, ask, reset } = useGemini();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    ask(input.trim(), systemPrompt);
    setInput('');
  };

  return (
    <Card className="glass shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">{title}</span>
          </div>
          {response && (
            <Button size="icon-sm" variant="ghost" onClick={reset} className="shrink-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {response && (
          <div className="rounded-xl bg-primary/5 border-2 border-primary/20 p-5 text-base leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto shadow-soft">
            {response}
            {loading && <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse" />}
          </div>
        )}
        {error && (
          <div className="text-base text-destructive bg-destructive/5 border-2 border-destructive/20 rounded-xl p-4 font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={loading}
            className="flex-1 text-base h-12 px-4 rounded-xl border-2"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="sm" className="shrink-0 h-12 px-5">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
