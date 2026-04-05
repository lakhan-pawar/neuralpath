import { NextRequest } from 'next/server';
import { ALL_USE_CASES, searchUseCases, getUseCasesByCategory, getUseCasesByDifficulty } from '@/data/useCasesIndex';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');

  try {
    let useCases = ALL_USE_CASES;

    // Apply filters
    if (query) {
      useCases = searchUseCases(query);
    }

    if (category && category !== 'all') {
      useCases = useCases.filter(uc => uc.category === category);
    }

    if (difficulty && difficulty !== 'all') {
      useCases = useCases.filter(uc => uc.difficulty === difficulty);
    }

    return Response.json({ 
      useCases, 
      count: useCases.length,
      total: ALL_USE_CASES.length
    });
  } catch (err) {
    console.error('Use Cases API error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to fetch use cases';
    return Response.json({ error: msg }, { status: 500 });
  }
}
