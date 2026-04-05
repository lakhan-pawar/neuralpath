'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { FlaskConical } from 'lucide-react';
import { TopicFilter } from '@/components/projects/TopicFilter';
import { RepoCard } from '@/components/projects/RepoCard';
import { ContributionGuide } from '@/components/projects/ContributionGuide';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ApiStatusBadge } from '@/components/shared/ApiStatusBadge';
import { GeminiChat } from '@/components/shared/GeminiChat';
import { useAppStore } from '@/store/appStore';
import type { Repo } from '@/types/project';

export default function ProjectsPage() {
  const { selectedTopic } = useAppStore();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const topic = selectedTopic === 'all' ? 'llm' : selectedTopic;
    setLoading(true);
    setError(null);
    fetch(`/api/projects?topic=${topic}`)
      .then((r) => r.json())
      .then((d) => setRepos(d.repos ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedTopic]);

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <FlaskConical className="mr-2 h-3 w-3" /> Module 5
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Project Lab</h1>
          <p className="text-lg text-muted-foreground">
            Trending AI repos to study, fork, and contribute to
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TopicFilter />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {loading ? 'Loading...' : `${repos.length} repositories`}
              </span>
              <ApiStatusBadge status={error ? 'error' : loading ? 'cached' : 'live'} />
            </div>
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <LoadingCard key={i} lines={3} />)
                : repos.map((repo) => (
                    <div key={repo.id} className="space-y-2">
                      <RepoCard repo={repo} />
                      <div className="pl-2">
                        <ContributionGuide repo={repo} />
                      </div>
                    </div>
                  ))
              }
              {!loading && error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <div>
            <GeminiChat
              title="Project Guide"
              placeholder="Ask about a project or concept..."
              systemPrompt="You are a senior AI Engineer helping a C# developer explore open source AI projects. Explain concepts clearly, suggest good first issues, and relate everything to .NET equivalents where possible."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
