import { NextRequest } from 'next/server';
import { AI_IMPLEMENTATIONS } from '@/data/aiImplementations';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const query = searchParams.get('q');
  const type = searchParams.get('type');
  const complexity = searchParams.get('complexity');

  try {
    let implementations = AI_IMPLEMENTATIONS;

    // Search filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      implementations = implementations.filter(impl =>
        impl.name.toLowerCase().includes(lowerQuery) ||
        impl.description.toLowerCase().includes(lowerQuery) ||
        impl.organization.toLowerCase().includes(lowerQuery) ||
        impl.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        impl.aiModels.some(model => model.toLowerCase().includes(lowerQuery))
      );
    }

    // Type filter
    if (type && type !== 'all') {
      implementations = implementations.filter(impl => impl.type === type);
    }

    // Complexity filter
    if (complexity && complexity !== 'all') {
      implementations = implementations.filter(impl => impl.complexity === complexity);
    }

    return Response.json({ 
      implementations, 
      count: implementations.length,
      total: AI_IMPLEMENTATIONS.length
    });
  } catch (err) {
    console.error('Implementations API error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to fetch implementations';
    return Response.json({ error: msg }, { status: 500 });
  }
}
