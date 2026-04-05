'use client';

import { useAppStore } from '@/store/appStore';
import type { ProjectTopic } from '@/types/project';
import { useEffect, useState } from 'react';

const TOPICS: Array<{ value: ProjectTopic | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'llm', label: 'LLM' },
  { value: 'rag', label: 'RAG' },
  { value: 'agents', label: 'Agents' },
  { value: 'mlops', label: 'MLOps' },
  { value: 'cv', label: 'Computer Vision' },
  { value: 'nlp', label: 'NLP' },
  { value: 'multimodal', label: 'Multimodal' },
];

export function TopicFilter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <TopicFilterContent />;
}

function TopicFilterContent() {
  const { selectedTopic, setSelectedTopic } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setSelectedTopic(value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selectedTopic === value
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
