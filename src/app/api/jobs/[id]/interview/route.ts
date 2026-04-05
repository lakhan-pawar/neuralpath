import { NextRequest, NextResponse } from 'next/server';
import { generateInterviewQuestions } from '@/lib/gemini';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Extract job data from URL search params (passed from job card)
    const searchParams = request.nextUrl.searchParams;
    const jobTitle = searchParams.get('title') || 'AI Engineer';
    const company = searchParams.get('company') || 'Company';
    const description = searchParams.get('description') || 'AI/ML role with Python, TensorFlow, and cloud experience.';
    
    console.log('Generating interview prep for:', { jobTitle, company, id });
    
    // Generate job-specific questions using Gemini (30 questions minimum)
    const interviewPrep = await generateInterviewQuestions(
      jobTitle,
      company,
      description
    );

    console.log('Interview prep generated successfully:', interviewPrep.questions?.length, 'questions');
    
    return NextResponse.json(interviewPrep);
  } catch (error) {
    console.error('Interview prep error details:', error);
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to generate interview questions',
        message: error instanceof Error ? error.message : 'Please try again later',
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    );
  }
}
