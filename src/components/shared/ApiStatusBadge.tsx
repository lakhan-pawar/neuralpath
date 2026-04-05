import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Clock } from 'lucide-react';

type Status = 'live' | 'cached' | 'error';

export function ApiStatusBadge({ status }: { status: Status }) {
  if (status === 'live') {
    return (
      <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-500 text-xs gap-1">
        <Wifi className="h-3 w-3" /> Live
      </Badge>
    );
  }
  if (status === 'cached') {
    return (
      <Badge variant="outline" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs gap-1">
        <Clock className="h-3 w-3" /> Cached
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-500 text-xs gap-1">
      <WifiOff className="h-3 w-3" /> Error
    </Badge>
  );
}
