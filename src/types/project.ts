export type ProjectTopic = 'llm' | 'rag' | 'agents' | 'mlops' | 'cv' | 'nlp' | 'multimodal';

export interface Repo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  contributions: number;
  url: string;
}
