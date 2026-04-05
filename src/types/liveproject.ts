export type ProjectStatus = 'Production' | 'Beta' | 'Open Source';
export type ProjectScale = 'Individual' | 'Startup' | 'Enterprise';

export interface LiveAIProject {
  id: string;
  name: string;
  company: string;
  description: string;
  category: string;
  status: ProjectStatus;
  scale: ProjectScale;
  
  // Real metrics
  users?: string;
  revenue?: string;
  github?: string;
  website?: string;
  
  // Technical details
  aiModels: string[];
  techStack: string[];
  
  // Success metrics
  metrics: {
    label: string;
    value: string;
  }[];
  
  // Story
  story: string;
  launchedDate?: string;
  
  tags: string[];
}
