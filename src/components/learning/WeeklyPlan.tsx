'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';

interface DayPlan {
  day: string;
  tasks: string[];
  hours: number;
}

const WEEK: DayPlan[] = [
  { day: 'Monday', tasks: ['Python syntax review (C# comparison)', 'Variables, functions, classes'], hours: 1.5 },
  { day: 'Tuesday', tasks: ['NumPy arrays — think C# arrays + LINQ', 'Practice: matrix operations'], hours: 1.5 },
  { day: 'Wednesday', tasks: ['Pandas DataFrames', 'CSV loading, filtering, groupby'], hours: 2 },
  { day: 'Thursday', tasks: ['Jupyter notebook setup', 'First ML notebook walkthrough'], hours: 1.5 },
  { day: 'Friday', tasks: ['Scikit-learn: train first model', 'Evaluate with accuracy/F1'], hours: 2 },
  { day: 'Weekend', tasks: ['Build mini project: sentiment classifier', 'Review week, update progress'], hours: 3 },
];

export function WeeklyPlan() {
  const [expanded, setExpanded] = useState<string | null>('Monday');

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Weekly Study Plan</h2>
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            ~11.5 hrs/week
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {WEEK.map((day) => (
          <div key={day.day} className="rounded-lg border border-border/50 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors text-left"
              onClick={() => setExpanded(expanded === day.day ? null : day.day)}
            >
              <div className="flex items-center gap-3">
                {expanded === day.day ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium text-sm">{day.day}</span>
              </div>
              <span className="text-xs text-muted-foreground">{day.hours}h</span>
            </button>
            {expanded === day.day && (
              <ul className="px-4 pb-3 space-y-1">
                {day.tasks.map((task) => (
                  <li key={task} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
