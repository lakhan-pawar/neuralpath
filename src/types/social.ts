export type SocialPlatform = 'reddit' | 'hackernews';

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  url: string;
  author: string;
  score: number;
  platform: SocialPlatform;
  subreddit?: string;
  createdAt: string;
  numComments: number;
  tags: string[];
}

export interface SocialFilter {
  platform?: SocialPlatform | 'all';
  topic?: string;
  sortBy?: 'score' | 'recent' | 'comments';
}
