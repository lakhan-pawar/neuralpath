import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

/** Generate interview questions using Groq */
export async function generateInterviewQuestionsGroq(
  jobTitle: string,
  company: string,
  jobDescription: string
): Promise<any> {
  const prompt = `Generate comprehensive interview preparation for this job:

Job Title: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription}

Generate EXACTLY 30 interview questions that are HIGHLY SPECIFIC to this job description. Analyze the requirements and responsibilities carefully.

For each question:
- Make it directly relevant to the technologies, skills, and responsibilities mentioned
- Include the question text
- Category (Technical, Behavioral, System Design, Coding, ML/AI, Company Culture)
- Difficulty level (Easy, Medium, Hard)
- Companies that have asked similar questions (e.g., Google, Microsoft, Amazon, Meta, Oracle, Netflix, etc.)
- A detailed sample answer (3-5 sentences with specific examples and metrics)
- 2-3 ACTIONABLE tips with CONCRETE EXAMPLES (NOT generic instructions like "Explain the concept" or "Discuss advantages")

IMPORTANT FOR TIPS - Use this format:
✅ GOOD: "Mention specific frameworks like TensorFlow 2.x or PyTorch, e.g., 'I used tf.keras for building a CNN that achieved 94% accuracy'"
✅ GOOD: "Quantify your impact: 'Reduced model inference time from 200ms to 50ms using TensorRT optimization'"
✅ GOOD: "Reference real projects: 'In my last role, I deployed a BERT model on AWS SageMaker serving 10K requests/day'"

❌ BAD: "Explain the concept clearly"
❌ BAD: "Discuss the advantages and disadvantages"
❌ BAD: "Provide examples of use cases"

Also provide:
- List of key skills required (extract from job description)
- 5-7 preparation tips specific to this role (with concrete examples)

Return as JSON with this structure:
{
  "jobTitle": string,
  "company": string,
  "questions": [
    {
      "id": string,
      "question": string,
      "category": string,
      "difficulty": "Easy" | "Medium" | "Hard",
      "companies": string[],
      "answer": string,
      "tips": string[]
    }
  ],
  "skillsRequired": string[],
  "preparationTips": string[]
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert technical interviewer and career coach. Generate detailed, job-specific interview questions in valid JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // Fast and capable model
      temperature: 0.7,
      max_tokens: 8000,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

/** Generate text using Groq (for other features) */
export async function generateTextGroq(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

/** Stream text using Groq (for chat features) */
export async function* streamTextGroq(
  prompt: string,
  systemPrompt?: string
): AsyncGenerator<string> {
  try {
    const stream = await groq.chat.completions.create({
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Groq streaming error:', error);
    throw error;
  }
}
