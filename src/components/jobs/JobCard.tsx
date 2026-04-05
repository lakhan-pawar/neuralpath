import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, ExternalLink, Wifi, Brain, Database } from 'lucide-react';
import type { Job } from '@/types/job';
import Link from 'next/link';

export function JobCard({ job }: { job: Job }) {
  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const sourceColors = {
    adzuna: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    muse: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    remotive: 'bg-green-500/10 text-green-500 border-green-500/30',
    indeed: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    eluta: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    linkedin: 'bg-blue-600/10 text-blue-600 border-blue-600/30'
  };

  const sourceLabels = {
    adzuna: 'Adzuna',
    muse: 'The Muse',
    remotive: 'Remotive',
    indeed: 'Indeed',
    eluta: 'Eluta',
    linkedin: 'LinkedIn'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-base">{job.title}</h3>
              {job.remote && (
                <Badge variant="outline" className="border-green-500/30 text-green-500 text-xs gap-1">
                  <Wifi className="h-3 w-3" /> Remote
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <Badge variant="outline" className={`text-xs ${sourceColors[job.source]}`}>
                <Database className="h-3 w-3 mr-1" />
                {sourceLabels[job.source]}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{job.location}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary.min.toLocaleString()}–{job.salary.max.toLocaleString()} {job.salary.currency}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />{timeAgo(job.postedAt)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{job.description}</p>
            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {job.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
          <div className="shrink-0 flex flex-col gap-2">
            <Link 
              href={{
                pathname: `/jobs/${job.id}/interview`,
                query: {
                  title: job.title,
                  company: job.company,
                  description: job.description
                }
              }}
            >
              <Button size="sm" variant="default" className="w-full whitespace-nowrap">
                <Brain className="mr-1 h-3 w-3" /> Interview Prep
              </Button>
            </Link>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="w-full whitespace-nowrap">
                Apply <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
