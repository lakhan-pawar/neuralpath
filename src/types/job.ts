export type JobSource = 'adzuna' | 'muse' | 'remotive' | 'indeed' | 'eluta' | 'linkedin';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary?: { min: number; max: number; currency: string };
  description: string;
  url: string;
  source: JobSource;
  postedAt: string;
  tags: string[];
}

export interface JobFilter {
  query: string;
  location: string;
  remote: boolean;
  seniority: 'all' | 'junior' | 'mid' | 'senior';
  salaryMin: number;
  sources: JobSource[];
}
