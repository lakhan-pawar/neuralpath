import { NextRequest } from 'next/server';
import { aggregateSocialDiscussions } from '@/lib/social-media';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filter = searchParams.get('q') ?? undefined;

  try {
    const posts = await aggregateSocialDiscussions(filter);
    return Response.json({ posts, count: posts.length });
  } catch (err) {
    console.error('Social API error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to fetch social posts';
    return Response.json({ error: msg }, { status: 500 });
  }
}
