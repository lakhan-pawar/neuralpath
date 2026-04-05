import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import type { Repo } from '@/types/project';

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <img src={repo.owner.avatarUrl} alt={repo.owner.login} className="h-5 w-5 rounded-full" />
              <span className="text-xs text-muted-foreground">{repo.owner.login}</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">{repo.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                {repo.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />{repo.forks.toLocaleString()}
              </span>
              {repo.language && (
                <span className="flex items-center gap-1">
                  <Code2 className="h-3 w-3" />{repo.language}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 4).map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button size="sm" variant="outline">
              View <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
