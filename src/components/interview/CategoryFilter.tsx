'use client';

import { useAppStore } from '@/store/appStore';
import type { InterviewCategory } from '@/types/interview';
import { useEffect, useState } from 'react';

const CATEGORIES: Array<{ value: InterviewCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'ml-fundamentals', label: 'ML Fundamentals' },
  { value: 'llm', label: 'LLMs' },
  { value: 'mlops', label: 'MLOps' },
  { value: 'system-design', label: 'System Design' },
  { value: 'coding', label: 'Coding' },
  { value: 'behavioral', label: 'Behavioral' },
];

export function CategoryFilter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <CategoryFilterContent />;
}

function CategoryFilterContent() {
  const { selectedCategory, setSelectedCategory } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setSelectedCategory(value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selectedCategory === value
              ? 'bg-primary/10 border-primary/30 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/30'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
