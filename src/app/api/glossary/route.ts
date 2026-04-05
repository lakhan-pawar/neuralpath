import { NextRequest } from 'next/server';
import { getWikiSummary } from '@/lib/wikipedia';
import { generateText } from '@/lib/gemini';

const AI_TERMS = [
  'Large language model', 'Retrieval-augmented generation', 'Vector database',
  'Transformer', 'Attention mechanism', 'Fine-tuning', 'Prompt engineering',
  'Embeddings', 'Semantic search', 'MLOps', 'Reinforcement learning from human feedback',
  'Hallucination AI', 'Tokenization', 'Inference', 'Quantization',
];

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get('term');

  if (term) {
    // Single term lookup
    const wiki = await getWikiSummary(term).catch(() => null);
    let definition = wiki?.extract ?? '';

    if (!definition && process.env.GEMINI_API_KEY) {
      definition = await generateText({
        prompt: `Define "${term}" in the context of AI/ML engineering in 2-3 sentences. Be concise and technical.`,
      }).catch(() => 'Definition unavailable.');
    }

    return Response.json({ term, definition, url: wiki?.url });
  }

  return Response.json({ terms: AI_TERMS });
}
