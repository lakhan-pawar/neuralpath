export type ImplementationType = 
  | 'RAG Application'
  | 'AI Agent'
  | 'Agentic Workflow'
  | 'Multimodal Agent'
  | 'Tool-Using Agent'
  | 'Multi-Agent System'
  | 'LLM Application'
  | 'Computer Vision'
  | 'Voice Agent';

export type TechStack = 'LangChain' | 'LlamaIndex' | 'AutoGPT' | 'CrewAI' | 'LangGraph' | 'Haystack' | 'Custom';

export interface AIImplementation {
  id: string;
  name: string;
  organization: string;
  description: string;
  type: ImplementationType;
  techStack: TechStack[];
  
  // GitHub & Links
  github?: string;
  demo?: string;
  blog?: string;
  stars?: number;
  
  // Technical Details
  aiModels: string[];
  frameworks: string[];
  vectorDB?: string;
  features: string[];
  
  // Implementation Details
  architecture: string;
  useCase: string;
  complexity: 'Simple' | 'Intermediate' | 'Advanced';
  
  // Metrics
  metrics?: {
    label: string;
    value: string;
  }[];
  
  tags: string[];
  language: string;
}
