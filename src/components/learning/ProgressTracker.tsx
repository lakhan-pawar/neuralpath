'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useProgress } from '@/hooks/useProgress';

const TOTAL_ITEMS = 13; // matches RoadmapTimeline items

export function ProgressTracker() {
  const { progress } = useProgress();
  const completed = progress.completedItems.length;
  const pct = Math.round((completed / TOTAL_ITEMS) * 100);

  return (
    <Card className="glass border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-2xl font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{completed} of {TOTAL_ITEMS} topics completed</p>
      </CardContent>
    </Card>
  );
}
