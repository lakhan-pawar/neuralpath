import { Badge } from '@/components/ui/badge';

const SOURCE_STYLES: Record<string, string> = {
  reddit: 'border-orange-500/30 text-orange-500',
  hackernews: 'border-yellow-500/30 text-yellow-500',
  github: 'border-purple-500/30 text-purple-500',
  curated: 'border-primary/30 text-primary',
};

export function SourceBadge({ source }: { source: string }) {
  return (
    <Badge variant="outline" className={`text-xs shrink-0 ${SOURCE_STYLES[source] ?? ''}`}>
      {source}
    </Badge>
  );
}
