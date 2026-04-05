export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string[];
  author?: string;
  thumbnail?: string;
}

export interface RSSFeed {
  name: string;
  url: string;
  category: string;
  enabled: boolean;
}
