export type UseCaseCategory = 
  | 'Computer Vision'
  | 'NLP & Text'
  | 'Audio & Speech'
  | 'Business Automation'
  | 'Healthcare'
  | 'Finance'
  | 'Education'
  | 'E-commerce'
  | 'Personal Productivity'
  | 'Creative & Design'
  | 'Development Tools'
  | 'Data Analysis';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AIUseCase {
  id: string;
  title: string;
  description: string;
  category: UseCaseCategory;
  difficulty: DifficultyLevel;
  aiModels: string[];
  technologies: string[];
  realWorldExample?: string;
  estimatedTime?: string;
  potentialSavings?: string;
  tags: string[];
}
