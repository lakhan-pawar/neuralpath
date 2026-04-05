import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeminiRequest } from '@/types/gemini';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Using Gemini 2.5 Flash - fastest and cheapest model
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.7,
    topP: 0.9,
  },
});

/** Non-streaming: returns parsed JSON. Use for structured responses. */
export async function geminiJSON<T>(prompt: string, system?: string): Promise<T> {
  const chat = geminiModel.startChat({
    history: system
      ? [
          { role: 'user', parts: [{ text: system }] },
          { role: 'model', parts: [{ text: 'Understood.' }] },
        ]
      : [],
  });
  const result = await chat.sendMessage(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(clean) as T;
}

/** Streaming: yields text chunks. Use for chat, explanations, mock interviews. */
export async function* geminiStream(
  prompt: string,
  system?: string
): AsyncGenerator<string> {
  const chat = geminiModel.startChat({
    history: system
      ? [
          { role: 'user', parts: [{ text: system }] },
          { role: 'model', parts: [{ text: 'Understood.' }] },
        ]
      : [],
  });
  const result = await chat.sendMessageStream(prompt);
  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

/** Convenience wrapper kept for backward compat with existing route handlers */
export async function generateText(request: GeminiRequest): Promise<string> {
  const chat = geminiModel.startChat({
    history: request.systemPrompt
      ? [
          { role: 'user', parts: [{ text: request.systemPrompt }] },
          { role: 'model', parts: [{ text: 'Understood.' }] },
        ]
      : [],
  });
  const result = await chat.sendMessage(request.prompt);
  return result.response.text();
}

/** Generate a personalized learning roadmap */
export async function generateRoadmap(params: {
  yearsExperience: number;
  technologies: string[];
  targetRole: string;
}): Promise<any> {
  const prompt = `Generate a detailed learning roadmap for a developer with ${params.yearsExperience} years of experience in ${params.technologies.join(', ')}. Target role: ${params.targetRole}. 

Provide a structured roadmap with:
1. Current skill assessment
2. Skills gap analysis
3. Phase-by-phase learning plan (Foundation, Intermediate, Advanced)
4. Recommended timeline
5. Key resources and projects

Return as JSON with this structure:
{
  "phases": [{"name": string, "duration": string, "topics": string[], "projects": string[]}],
  "timeline": string,
  "keySkills": string[]
}`;

  return await geminiJSON(prompt);
}

/** Analyze skill gap between current and target skills */
export async function analyzeSkillGap(params: {
  currentSkills: string[];
  targetSkills: string[];
  transferableSkills: string[];
  skillsToLearn: string[];
}): Promise<any> {
  const prompt = `Analyze the skill gap for a developer transitioning to AI Engineering.

Current skills: ${params.currentSkills.join(', ')}
Target skills needed: ${params.targetSkills.join(', ')}

Provide:
1. Transferable skills (what they already know that applies)
2. Skills to learn (prioritized list)
3. Learning difficulty estimate for each new skill
4. Recommended learning order

Return as JSON with this structure:
{
  "transferableSkills": [{"skill": string, "relevance": string}],
  "skillsToLearn": [{"skill": string, "priority": "high"|"medium"|"low", "estimatedTime": string}],
  "learningPath": string[]
}`;

  return await geminiJSON(prompt);
}

/** Get personalized resource recommendations */
export async function getResourceRecommendations(params: {
  experience: number;
  currentSkills: string[];
}): Promise<any> {
  const prompt = `Recommend learning resources for a developer with ${params.experience} years of experience in ${params.currentSkills.join(', ')} who wants to learn AI Engineering.

Provide:
1. Online courses (free and paid)
2. Books
3. YouTube channels
4. Practice platforms
5. Communities to join

Return as JSON with this structure:
{
  "courses": [{"name": string, "platform": string, "url": string, "free": boolean}],
  "books": [{"title": string, "author": string, "level": string}],
  "channels": [{"name": string, "focus": string}],
  "platforms": [{"name": string, "description": string}],
  "communities": [{"name": string, "platform": string}]
}`;

  return await geminiJSON(prompt);
}

/** Generate comprehensive interview questions for a specific job */
export async function generateInterviewQuestions(
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
- A detailed sample answer (3-5 sentences)
- 2-3 specific tips for answering

Also provide:
- List of key skills required (extract from job description)
- 5-7 preparation tips specific to this role

IMPORTANT: Questions must be SPECIFIC to the job description. For example:
- If job mentions "TensorFlow", ask about TensorFlow specifically
- If job mentions "NLP", include NLP-specific questions
- If job mentions "production deployment", ask about MLOps and deployment
- If job mentions specific cloud platforms, ask about those platforms

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

  return await geminiJSON(prompt);
}
