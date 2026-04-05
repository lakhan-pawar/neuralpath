import type { InterviewQuestion } from '@/types/interviewQuestion';
import { INTERVIEW_QUESTIONS_PART1 } from './interviewQuestions1';
import { INTERVIEW_QUESTIONS_PART2 } from './interviewQuestions2';
import { INTERVIEW_QUESTIONS_PART3 } from './interviewQuestions3';

// Merge all question parts (75 questions total)
export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  ...INTERVIEW_QUESTIONS_PART1,
  ...INTERVIEW_QUESTIONS_PART2,
  ...INTERVIEW_QUESTIONS_PART3,
];

// Helper functions
export const getQuestionsByCompany = (company: string) => {
  return INTERVIEW_QUESTIONS.filter(q => q.company === company);
};

export const getQuestionsByDifficulty = (difficulty: string) => {
  return INTERVIEW_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByType = (type: string) => {
  return INTERVIEW_QUESTIONS.filter(q => q.type === type);
};

export const getRandomQuestion = () => {
  return INTERVIEW_QUESTIONS[Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)];
};

export const COMPANIES = Array.from(new Set(INTERVIEW_QUESTIONS.map(q => q.company).filter(Boolean))) as string[];
export const TOPICS = Array.from(new Set(INTERVIEW_QUESTIONS.flatMap(q => q.topics)));
