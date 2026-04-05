'use client';

import { TrendCard } from './TrendCard';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ApiStatusBadge } from '@/components/shared/ApiStatusBadge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useTrends } from '@/hooks/useTrends';

export function TrendFeed() {
  const { trends, loading, error, refetch } = useTrends();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${trends.length} trending posts`}
          </span>
          <ApiStatusBadge status={error ? 'error' : loading ? 'cached' : 'live'} />
        </div>
        <Button size="sm" variant="ghost" onClick={refetch} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {loading && Array.from({ length: 5 }).map((_, i) => <LoadingCard key={i} lines={2} />)}
      {!loading && error && <p className="text-sm text-destructive">{error}</p>}
      {!loading && trends.map((t) => <TrendCard key={t.id} trend={t} />)}
    </div>
  );
}
