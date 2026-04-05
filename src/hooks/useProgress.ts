'use client';

import { useState, useEffect, useCallback } from 'react';

interface Progress {
  completedItems: string[];
  lastUpdated: string;
}

const STORAGE_KEY = 'np_progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ completedItems: [], lastUpdated: '' });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setProgress(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const markComplete = useCallback((itemId: string) => {
    setProgress((prev) => {
      const updated = {
        completedItems: [...new Set([...prev.completedItems, itemId])],
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markIncomplete = useCallback((itemId: string) => {
    setProgress((prev) => {
      const updated = {
        completedItems: prev.completedItems.filter((id) => id !== itemId),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isComplete = useCallback(
    (itemId: string) => progress.completedItems.includes(itemId),
    [progress.completedItems]
  );

  return { progress, markComplete, markIncomplete, isComplete };
}
