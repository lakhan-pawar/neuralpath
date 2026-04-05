import type { SocialPost } from '@/types/social';
import { getMemoryCache, setMemoryCache } from './cache';

const USER_AGENT = 'NeuralPath/1.0 (public JSON API)';

// Reddit API
async function redditFetch(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Reddit fetch failed: ${res.status}`);
  return res.json();
}

export async function searchRedditAI(query: string, limit = 15): Promise<SocialPost[]> {
  const cacheKey = `reddit_ai_${query}`;
  const cached = getMemoryCache<SocialPost[]>(cacheKey);
  if (cached) return cached;

  // Search in AI-focused subreddits only
  const subreddits = ['MachineLearning', 'artificial', 'LocalLLaMA', 'deeplearning', 'OpenAI', 'ClaudeAI', 'GoogleGeminiAI', 'ArtificialIntelligence', 'learnmachinelearning', 'MLQuestions'];
  const searchQuery = `${query} subreddit:${subreddits.join(' OR subreddit:')}`;

  const data = await redditFetch(
    `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=top&t=month&limit=${limit}`
  );

  // AI/ML keywords for additional filtering
  const aiKeywords = [
    'ai', 'ml', 'machine learning', 'deep learning', 'neural', 'llm', 'gpt', 'claude', 
    'gemini', 'openai', 'anthropic', 'model', 'training', 'dataset', 'transformer',
    'hugging face', 'pytorch', 'tensorflow', 'nlp', 'computer vision', 'rag',
    'embedding', 'fine-tuning', 'prompt', 'inference', 'api', 'chatbot'
  ];

  // Extract relevant tags from content
  const extractTags = (title: string, content: string): string[] => {
    const text = `${title} ${content}`.toLowerCase();
    const tags: string[] = [];
    
    // Platform/Tool tags
    if (text.includes('claude')) tags.push('Claude AI');
    if (text.includes('gpt') || text.includes('chatgpt')) tags.push('ChatGPT');
    if (text.includes('gemini')) tags.push('Google Gemini');
    if (text.includes('openai')) tags.push('OpenAI');
    if (text.includes('anthropic')) tags.push('Anthropic');
    if (text.includes('hugging face') || text.includes('huggingface')) tags.push('Hugging Face');
    if (text.includes('llama')) tags.push('LLaMA');
    if (text.includes('mistral')) tags.push('Mistral');
    if (text.includes('cohere')) tags.push('Cohere');
    
    // Framework tags
    if (text.includes('pytorch')) tags.push('PyTorch');
    if (text.includes('tensorflow')) tags.push('TensorFlow');
    if (text.includes('keras')) tags.push('Keras');
    if (text.includes('langchain')) tags.push('LangChain');
    
    // Topic tags
    if (text.includes('llm') || text.includes('large language model')) tags.push('LLM');
    if (text.includes('rag') || text.includes('retrieval augmented')) tags.push('RAG');
    if (text.includes('fine-tun')) tags.push('Fine-tuning');
    if (text.includes('prompt')) tags.push('Prompt Engineering');
    if (text.includes('nlp') || text.includes('natural language')) tags.push('NLP');
    if (text.includes('computer vision') || text.includes('cv')) tags.push('Computer Vision');
    if (text.includes('mlops')) tags.push('MLOps');
    if (text.includes('deployment')) tags.push('Deployment');
    
    return tags;
  };

  const posts: SocialPost[] = (data.data?.children ?? [])
    .filter((child: { data: Record<string, unknown> }) => {
      const title = String(child.data.title).toLowerCase();
      const content = String(child.data.selftext || '').toLowerCase();
      const text = `${title} ${content}`;
      
      // Must contain at least one AI/ML keyword
      return aiKeywords.some(keyword => text.includes(keyword));
    })
    .map((child: { data: Record<string, unknown> }) => {
      const title = String(child.data.title);
      const content = String(child.data.selftext || '');
      const subreddit = String(child.data.subreddit);
      
      // Extract relevant tags
      const contentTags = extractTags(title, content);
      const allTags = [subreddit, ...contentTags];
      
      return {
        id: String(child.data.id),
        title: title,
        content: content.slice(0, 300),
        url: `https://reddit.com${child.data.permalink}`,
        author: String(child.data.author),
        score: Number(child.data.score),
        platform: 'reddit' as const,
        subreddit: subreddit,
        createdAt: new Date((child.data.created_utc as number) * 1000).toISOString(),
        numComments: Number(child.data.num_comments),
        tags: allTags
      };
    });

  setMemoryCache(cacheKey, posts, 5 * 60 * 1000);
  return posts;
}

export async function getRedditAIDiscussions(): Promise<SocialPost[]> {
  const topics = [
    'Claude AI assistant',
    'Gemini Google AI',
    'OpenAI GPT ChatGPT',
    'Hugging Face transformers',
    'LLM large language model',
    'machine learning deployment',
    'AI model training',
    'deep learning neural network'
  ];

  const results = await Promise.allSettled(
    topics.map((topic) => searchRedditAI(topic, 8))
  );

  const posts = results
    .filter((r): r is PromiseFulfilledResult<SocialPost[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  // Deduplicate by ID
  const seen = new Set<string>();
  const uniquePosts = posts.filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  });

  // Sort by score and limit to top 30
  return uniquePosts
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}

// Hacker News API (free public API with JSON)
async function hackerNewsFetch(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Hacker News fetch failed: ${res.status}`);
  return res.json();
}

export async function getHackerNewsAIDiscussions(): Promise<SocialPost[]> {
  const cacheKey = 'hackernews_ai_discussions';
  const cached = getMemoryCache<SocialPost[]>(cacheKey);
  if (cached) return cached;

  // Extract relevant tags from content
  const extractTags = (title: string, text: string): string[] => {
    const content = `${title} ${text}`.toLowerCase();
    const tags: string[] = ['Hacker News'];
    
    // Platform/Tool tags
    if (content.includes('claude')) tags.push('Claude AI');
    if (content.includes('gpt') || content.includes('chatgpt')) tags.push('ChatGPT');
    if (content.includes('gemini')) tags.push('Google Gemini');
    if (content.includes('openai')) tags.push('OpenAI');
    if (content.includes('anthropic')) tags.push('Anthropic');
    if (content.includes('hugging face') || content.includes('huggingface')) tags.push('Hugging Face');
    if (content.includes('llama')) tags.push('LLaMA');
    if (content.includes('mistral')) tags.push('Mistral');
    
    // Framework tags
    if (content.includes('pytorch')) tags.push('PyTorch');
    if (content.includes('tensorflow')) tags.push('TensorFlow');
    if (content.includes('langchain')) tags.push('LangChain');
    
    // Topic tags
    if (content.includes('llm') || content.includes('large language model')) tags.push('LLM');
    if (content.includes('rag') || content.includes('retrieval augmented')) tags.push('RAG');
    if (content.includes('fine-tun')) tags.push('Fine-tuning');
    if (content.includes('prompt')) tags.push('Prompt Engineering');
    if (content.includes('machine learning') || content.includes(' ml ')) tags.push('Machine Learning');
    if (content.includes('deep learning')) tags.push('Deep Learning');
    
    return tags;
  };

  try {
    // Search for AI-related stories using Algolia HN Search API
    const searchTerms = ['AI', 'machine learning', 'LLM', 'GPT', 'Claude', 'OpenAI'];
    const allPosts: SocialPost[] = [];

    for (const term of searchTerms) {
      try {
        const searchUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(term)}&tags=story&hitsPerPage=10`;
        const data = await fetch(searchUrl).then(r => r.json());
        
        if (data.hits && Array.isArray(data.hits)) {
          const posts = data.hits
            .filter((hit: any) => hit.points > 10) // Filter for quality
            .map((hit: any) => {
              const title = hit.title || 'Untitled';
              const text = hit.story_text || '';
              
              return {
                id: String(hit.objectID),
                title: title,
                content: text ? String(text).slice(0, 300) : '',
                url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
                author: hit.author || 'Anonymous',
                score: hit.points || 0,
                platform: 'hackernews' as const,
                createdAt: hit.created_at || new Date().toISOString(),
                numComments: hit.num_comments || 0,
                tags: extractTags(title, text)
              };
            });
          
          allPosts.push(...posts);
        }
      } catch (err) {
        console.error(`Failed to fetch HN for term ${term}:`, err);
      }
    }

    // Deduplicate by ID
    const seen = new Set<string>();
    const uniquePosts = allPosts.filter(post => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });

    // Sort by score and take top 20
    const sortedPosts = uniquePosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    setMemoryCache(cacheKey, sortedPosts, 5 * 60 * 1000);
    return sortedPosts;
  } catch (error) {
    console.error('Hacker News fetch error:', error);
    return [];
  }
}

export async function aggregateSocialDiscussions(filter?: string): Promise<SocialPost[]> {
  const [reddit, hackernews] = await Promise.allSettled([
    getRedditAIDiscussions(),
    getHackerNewsAIDiscussions()
  ]);

  const allPosts = [
    ...(reddit.status === 'fulfilled' ? reddit.value : []),
    ...(hackernews.status === 'fulfilled' ? hackernews.value : [])
  ];

  // Filter by search term if provided
  if (filter) {
    const lowerFilter = filter.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowerFilter) ||
      post.content.toLowerCase().includes(lowerFilter) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerFilter))
    );
  }

  return allPosts.sort((a, b) => b.score - a.score);
}
