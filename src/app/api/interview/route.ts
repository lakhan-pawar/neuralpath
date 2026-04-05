import type { Question, InterviewCategory } from '@/types/interview';

// Curated seed questions — in production, augment with Reddit/HN scraping
const QUESTIONS: Question[] = [
  { id: '1', question: 'Explain the transformer architecture and self-attention.', category: 'ml-fundamentals', difficulty: 'medium', source: 'curated', tags: ['transformers', 'attention'] },
  { id: '2', question: 'What is RAG and when would you use it over fine-tuning?', category: 'llm', difficulty: 'medium', source: 'curated', tags: ['rag', 'fine-tuning'] },
  { id: '3', question: 'How do you evaluate an LLM in production?', category: 'mlops', difficulty: 'hard', source: 'curated', tags: ['evaluation', 'production'] },
  { id: '4', question: 'Design a real-time ML feature store.', category: 'system-design', difficulty: 'hard', source: 'curated', tags: ['feature-store', 'architecture'] },
  { id: '5', question: 'What is the difference between RLHF and DPO?', category: 'llm', difficulty: 'hard', source: 'curated', tags: ['rlhf', 'alignment'] },
  { id: '6', question: 'Explain gradient descent and its variants (SGD, Adam, AdamW).', category: 'ml-fundamentals', difficulty: 'easy', source: 'curated', tags: ['optimization'] },
  { id: '7', question: 'How would you detect and mitigate hallucinations in an LLM app?', category: 'llm', difficulty: 'medium', source: 'curated', tags: ['hallucination', 'reliability'] },
  { id: '8', question: 'Design a vector similarity search system at scale.', category: 'system-design', difficulty: 'hard', source: 'curated', tags: ['vector-db', 'search'] },
  { id: '9', question: 'What is model quantization and why does it matter?', category: 'mlops', difficulty: 'medium', source: 'curated', tags: ['quantization', 'inference'] },
  { id: '10', question: 'Explain the difference between precision, recall, and F1 score.', category: 'ml-fundamentals', difficulty: 'easy', source: 'curated', tags: ['metrics', 'evaluation'] },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as InterviewCategory | null;
  const difficulty = searchParams.get('difficulty');

  let questions = QUESTIONS;
  if (category) questions = questions.filter((q) => q.category === category);
  if (difficulty) questions = questions.filter((q) => q.difficulty === difficulty);

  return Response.json({ questions });
}
