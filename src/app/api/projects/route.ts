import { NextRequest } from 'next/server';
import { getTrendingAIRepos } from '@/lib/github';

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic') ?? 'llm';

  try {
    const repos = await getTrendingAIRepos(topic);
    return Response.json({ repos });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch repos';
    return Response.json({ error: msg }, { status: 500 });
  }
}
