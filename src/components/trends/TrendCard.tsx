import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, TrendingUp, MessageSquare } from 'lucide-react';
import type { Trend } from '@/types/trend';

const SOURCE_COLORS = {
  reddit: 'border-orange-500/30 text-orange-500',
  hackernews: 'border-yellow-500/30 text-yellow-500',
  arxiv: 'border-blue-500/30 text-blue-500',
};

export function TrendCard({ trend }: { trend: Trend }) {
  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <a
              href={trend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 flex items-start gap-1"
            >
              {trend.title}
              <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 opacity-50" />
            </a>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />{trend.score.toLocaleString()}
              </span>
              <span>{new Date(trend.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className={`text-xs ${SOURCE_COLORS[trend.source]}`}>
                {trend.source}
              </Badge>
              {trend.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
