'use client';

import { useState, useEffect } from 'react';
import type { Trend } from '@/types/trend';

export function useTrends(pollIntervalMs = 0) {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = () => {
    setLoading(true);
    fetch('/api/trends')
      .then((r) => r.json())
      .then((data) => setTrends(data.trends ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrends();
    if (pollIntervalMs > 0) {
      const id = setInterval(fetchTrends, pollIntervalMs);
      return () => clearInterval(id);
    }
  }, [pollIntervalMs]);

  return { trends, loading, error, refetch: fetchTrends };
}
