import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import type { SocialPost } from '@/types/social';

interface SocialPostCardProps {
  post: SocialPost;
  onTagClick?: (tag: string) => void;
}

export function SocialPostCard({ post, onTagClick }: SocialPostCardProps) {
  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const platformColors = {
    reddit: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    hackernews: 'bg-orange-600/10 text-orange-600 border-orange-600/30'
  };

  const platformLabels = {
    reddit: 'Reddit',
    hackernews: 'Hacker News'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-5 pb-5">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <h3 className="font-semibold text-base mb-2 line-clamp-2">
                  {post.title}
                </h3>
              </a>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="outline" className={`text-xs ${platformColors[post.platform]}`}>
                  {platformLabels[post.platform]}
                </Badge>
                {post.subreddit && (
                  <Badge variant="outline" className="text-xs">
                    r/{post.subreddit}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">by {post.author}</span>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          {post.content && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.content}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onTagClick) onTagClick(tag);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {post.score} upvotes
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {post.numComments} comments
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(post.createdAt)}
            </span>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-primary hover:underline"
            >
              View Discussion <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
