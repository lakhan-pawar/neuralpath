import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText } from 'lucide-react';
import { searchArxiv } from '@/lib/arxiv';

export async function ArxivFeed({ query = 'large language models' }: { query?: string }) {
  let papers = [];
  try {
    papers = await searchArxiv(query, 8);
  } catch {
    return <p className="text-sm text-muted-foreground">Could not load papers.</p>;
  }

  return (
    <div className="space-y-3">
      {papers.map((paper) => (
        <Card key={paper.id} className="glass hover:border-primary/40 transition-colors">
          <CardContent className="pt-4 pb-4">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm hover:text-primary transition-colors flex items-start gap-1 mb-2"
            >
              <FileText className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
              {paper.title}
              <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 opacity-50" />
            </a>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{paper.summary}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{paper.authors.join(', ')}{paper.authors.length === 3 ? ' et al.' : ''}</span>
              <span>{paper.published}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
