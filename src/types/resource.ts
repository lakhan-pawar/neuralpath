export type ResourceType = 'Book' | 'Course' | 'Video' | 'Podcast' | 'Paper' | 'Blog' | 'Tool';
export type ResourceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  level: ResourceLevel;
  author: string;
  description: string;
  url: string;
  topics: string[];
  rating: number; // 1-5
  reviewCount: number;
  isPaid: boolean;
  price?: string;
  duration?: string;
  releaseYear?: number;
  platform?: string;
  thumbnail?: string;
}

export interface UserResourceStatus {
  resourceId: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  userRating?: number;
  notes?: string;
  completedDate?: string;
}
