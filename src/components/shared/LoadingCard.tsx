import { Card, CardContent } from '@/components/ui/card';

export function LoadingCard({ lines = 3 }: { lines?: number }) {
  return (
    <Card className="glass animate-pulse">
      <CardContent className="pt-6 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-muted rounded" style={{ width: `${90 - i * 10}%` }} />
        ))}
      </CardContent>
    </Card>
  );
}
