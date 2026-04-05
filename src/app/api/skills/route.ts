import { NextRequest } from 'next/server';
import { analyzeSkillGap } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentSkills, targetSkills } = body;

    if (!currentSkills || !targetSkills) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const analysis = await analyzeSkillGap({
      currentSkills,
      targetSkills,
      transferableSkills: [],
      skillsToLearn: [],
    });

    return Response.json(analysis);
  } catch (error) {
    console.error('Skill analysis error:', error);
    return Response.json(
      { error: 'Failed to analyze skills' },
      { status: 500 }
    );
  }
}
