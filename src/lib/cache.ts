// In-memory cache for server-side, localStorage for client-side

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();

export function setMemoryCache<T>(key: string, data: T, ttlMs = 5 * 60 * 1000): void {
  memoryCache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export function getMemoryCache<T>(key: string): T | null {
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (!entry || Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setLocalCache<T>(key: string, data: T, ttlMs = 10 * 60 * 1000): void {
  if (typeof window === 'undefined') return;
  const entry: CacheEntry<T> = { data, expiresAt: Date.now() + ttlMs };
  localStorage.setItem(`np_${key}`, JSON.stringify(entry));
}

export function getLocalCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`np_${key}`);
  if (!raw) return null;
  try {
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(`np_${key}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}
