export type QuestionType = 'Technical' | 'Behavioral' | 'System Design' | 'Coding' | 'ML Theory';
export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface InterviewQuestion {
  id: string;
  question: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  company?: string;
  topics: string[];
  answer?: string;
  hints?: string[];
  followUpQuestions?: string[];
  timeToSolve?: string;
  isPracticed?: boolean;
}
