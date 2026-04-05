import { USE_CASES_PART1 } from './useCases1';
import { USE_CASES_PART2 } from './useCases2';
import type { AIUseCase } from '@/types/usecase';

// Combine all use cases
export const ALL_USE_CASES: AIUseCase[] = [
  ...USE_CASES_PART1,
  ...USE_CASES_PART2
];

// Get use cases by category
export function getUseCasesByCategory(category: string): AIUseCase[] {
  return ALL_USE_CASES.filter(uc => uc.category === category);
}

// Get use cases by difficulty
export function getUseCasesByDifficulty(difficulty: string): AIUseCase[] {
  return ALL_USE_CASES.filter(uc => uc.difficulty === difficulty);
}

// Search use cases
export function searchUseCases(query: string): AIUseCase[] {
  const lowerQuery = query.toLowerCase();
  return ALL_USE_CASES.filter(uc =>
    uc.title.toLowerCase().includes(lowerQuery) ||
    uc.description.toLowerCase().includes(lowerQuery) ||
    uc.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    uc.aiModels.some(model => model.toLowerCase().includes(lowerQuery))
  );
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(ALL_USE_CASES.map(uc => uc.category)));
}

// Get all tags
export function getAllTags(): string[] {
  return Array.from(new Set(ALL_USE_CASES.flatMap(uc => uc.tags))).sort();
}
