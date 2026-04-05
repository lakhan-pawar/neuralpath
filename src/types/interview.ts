export type InterviewCategory =
  | 'ml-fundamentals'
  | 'llm'
  | 'mlops'
  | 'system-design'
  | 'coding'
  | 'behavioral';

export interface Question {
  id: string;
  question: string;
  category: InterviewCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'reddit' | 'hackernews' | 'github' | 'curated';
  sourceUrl?: string;
  answer?: string;
  tags: string[];
}

export interface Answer {
  questionId: string;
  content: string;
  generatedAt: string;
  model: string;
}

export interface MockSession {
  id: string;
  questions: Question[];
  answers: Record<string, string>;
  startedAt: string;
  completedAt?: string;
}
