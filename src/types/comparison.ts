export type ComparisonCategory = 'Frameworks' | 'Models' | 'Cloud Providers' | 'Vector DBs' | 'Tools';

export interface ComparisonItem {
  id: string;
  name: string;
  category: ComparisonCategory;
  description: string;
  logo?: string;
  website: string;
  
  // General attributes
  openSource: boolean;
  license?: string;
  language?: string[];
  maintainer: string;
  githubStars?: number;
  
  // Specific attributes (not all apply to every item)
  pros: string[];
  cons: string[];
  useCases: string[];
  pricing?: string;
  performance?: string;
  easeOfUse?: number; // 1-5
  documentation?: number; // 1-5
  community?: number; // 1-5
  
  // Technical specs
  features: { name: string; supported: boolean; notes?: string }[];
}
