'use client';

import { GeminiChat } from '@/components/shared/GeminiChat';

export function GeminiDesigner() {
  return (
    <GeminiChat
      title="AI System Design Assistant"
      placeholder="e.g. Design a RAG pipeline for a 10M document corpus..."
      systemPrompt="You are a principal AI Systems Architect. Help design scalable AI systems. Always include: components, data flow, scaling considerations, and cost estimates. Mention Azure/AWS services where relevant. Draw ASCII diagrams when helpful."
    />
  );
}
