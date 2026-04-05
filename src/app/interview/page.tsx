'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { CategoryFilter } from '@/components/interview/CategoryFilter';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { MockInterview } from '@/components/interview/MockInterview';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useAppStore } from '@/store/appStore';
import type { Question } from '@/types/interview';

export default function InterviewPage() {
  const { selectedCategory } = useAppStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
    setLoading(true);
    fetch(`/api/interview${params}`)
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions ?? []))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <MessageSquare className="mr-2 h-3 w-3" /> Module 4
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Interview Prep</h1>
          <p className="text-lg text-muted-foreground">
            Real AI Engineering questions with Gemini-powered answers and mock sessions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ErrorBoundary>
              <CategoryFilter />
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} lines={3} />)
                  : questions.map((q) => <QuestionCard key={q.id} question={q} />)
                }
                {!loading && questions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No questions found for this category.</p>
                )}
              </div>
            </ErrorBoundary>
          </div>
          <div>
            <ErrorBoundary>
              <MockInterview />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
