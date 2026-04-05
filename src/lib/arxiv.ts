import { XMLParser } from 'fast-xml-parser';
import { getMemoryCache, setMemoryCache } from './cache';

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  url: string;
  categories: string[];
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

export async function searchArxiv(query: string, maxResults = 10): Promise<ArxivPaper[]> {
  const cacheKey = `arxiv_${query}_${maxResults}`;
  const cached = getMemoryCache<ArxivPaper[]>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=descending&max_results=${maxResults}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`ArXiv API error: ${res.status}`);
  const xml = await res.text();
  const parsed = parser.parse(xml);

  const entries = parsed?.feed?.entry ?? [];
  const list = Array.isArray(entries) ? entries : [entries];

  const papers: ArxivPaper[] = list.map((e: Record<string, unknown>) => {
    const rawAuthors = e.author as Record<string, string> | Array<Record<string, string>>;
    const authorList = Array.isArray(rawAuthors) ? rawAuthors : [rawAuthors];
    const categories = e.category
      ? (Array.isArray(e.category) ? e.category : [e.category]).map(
          (c: Record<string, string>) => c['@_term'] ?? ''
        )
      : [];

    const idStr = String(e.id ?? '');
    return {
      id: idStr.split('/abs/').pop() ?? idStr,
      title: String(e.title ?? '').replace(/\s+/g, ' ').trim(),
      summary: String(e.summary ?? '').replace(/\s+/g, ' ').trim().slice(0, 300) + '...',
      authors: authorList.slice(0, 3).map((a) => a.name ?? ''),
      published: String(e.published ?? '').slice(0, 10),
      url: idStr,
      categories,
    };
  });

  setMemoryCache(cacheKey, papers, 60 * 60 * 1000);
  return papers;
}

export async function fetchArxivPapers(): Promise<ArxivPaper[]> {
  return searchArxiv('cat:cs.AI OR cat:cs.LG OR cat:cs.CL', 20);
}
