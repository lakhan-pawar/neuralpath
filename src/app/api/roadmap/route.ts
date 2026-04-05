import { NextRequest } from 'next/server';
import { generateRoadmap } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { yearsExperience, technologies, targetRole } = body;

    if (!yearsExperience || !technologies || !targetRole) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const roadmap = await generateRoadmap({
      yearsExperience,
      technologies,
      targetRole,
    });

    return Response.json(roadmap);
  } catch (error) {
    console.error('Roadmap generation error:', error);
    return Response.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    );
  }
}
