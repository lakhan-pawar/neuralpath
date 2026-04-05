export interface RedditPost {
  id: string;
  title: string;
  url: string;
  score: number;
  subreddit: string;
  createdAt: string;
  numComments: number;
}

export interface HNPost {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export interface Keyword {
  term: string;
  definition: string;
  example: string;
  relatedTerms: string[];
}

export interface Trend {
  id: string;
  title: string;
  source: 'reddit' | 'hackernews' | 'arxiv';
  url: string;
  score: number;
  summary: string;
  tags: string[];
  createdAt: string;
}
