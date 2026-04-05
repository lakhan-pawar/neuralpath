'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, SkipForward, CheckCircle2 } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';

const MOCK_QUESTIONS = [
  'Explain the difference between RAG and fine-tuning. When would you choose each?',
  'How would you design a production LLM pipeline with low latency requirements?',
  'What is attention mechanism and why is it important in transformers?',
  'How do you handle hallucinations in a customer-facing LLM application?',
  'Describe your approach to evaluating an LLM in production.',
];

export function MockInterview() {
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const { response, loading, ask, reset } = useGemini();

  const currentQ = MOCK_QUESTIONS[qIndex];
  const isLast = qIndex === MOCK_QUESTIONS.length - 1;

  const getFeedback = () => {
    if (!userAnswer.trim()) return;
    ask(
      `Interview question: "${currentQ}"\n\nCandidate answer: "${userAnswer}"\n\nProvide brief feedback: 1) What was good, 2) What was missing, 3) Score out of 10.`,
      'You are a senior AI Engineering interviewer. Be constructive and specific.'
    );
    setFeedback(response);
  };

  const next = () => {
    setQIndex((i) => i + 1);
    setUserAnswer('');
    reset();
  };

  if (!started) {
    return (
      <Card className="glass border-primary/20">
        <CardContent className="pt-6 text-center space-y-4">
          <Brain className="h-12 w-12 text-primary mx-auto" />
          <h3 className="font-semibold text-lg">Mock Interview Session</h3>
          <p className="text-sm text-muted-foreground">
            {MOCK_QUESTIONS.length} questions · Gemini-powered feedback · ~20 minutes
          </p>
          <Button onClick={() => setStarted(true)} className="gap-2">
            <Play className="h-4 w-4" /> Start Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Question {qIndex + 1} / {MOCK_QUESTIONS.length}</Badge>
          <div className="h-1.5 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((qIndex) / MOCK_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{currentQ}</p>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={5}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
        <div className="flex gap-2">
          <Button onClick={getFeedback} disabled={loading || !userAnswer.trim()} className="gap-1">
            <Brain className="h-4 w-4" />
            {loading ? 'Analyzing...' : 'Get Feedback'}
          </Button>
          {!isLast && (
            <Button variant="outline" onClick={next} className="gap-1">
              <SkipForward className="h-4 w-4" /> Next
            </Button>
          )}
          {isLast && response && (
            <Button variant="outline" onClick={() => setStarted(false)} className="gap-1">
              <CheckCircle2 className="h-4 w-4" /> Finish
            </Button>
          )}
        </div>
        {response && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm leading-relaxed whitespace-pre-wrap">
            {response}
            {loading && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
