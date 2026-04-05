import { NextRequest } from 'next/server';
import { getResourceRecommendations } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experience, currentSkills } = body;

    const recommendations = await getResourceRecommendations({
      experience: experience || 0,
      currentSkills: currentSkills || [],
    });

    return Response.json(recommendations);
  } catch (error) {
    console.error('Resource recommendation error:', error);
    return Response.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}
