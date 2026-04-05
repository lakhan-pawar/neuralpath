// Resume-Ready AI/ML Projects - Part 1
// Detailed project descriptions for interview preparation

export interface ResumeProject {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  overview: string;
  techStack: string[];
  keyFeatures: string[];
  implementation: {
    step: string;
    details: string;
  }[];
  challenges: string[];
  results: string;
  interviewTips: string[];
  githubIdeas: string[];
}

export const RESUME_PROJECTS_PART1: ResumeProject[] = [
  // RAG PROJECTS
  {
    id: 'rag-1',
    title: 'Enterprise Document Q&A System with RAG',
    category: 'RAG (Retrieval-Augmented Generation)',
    difficulty: 'Advanced',
    duration: '3-4 weeks',
    overview: 'Built a production-ready RAG system that allows employees to query internal company documents (PDFs, Word docs, wikis) using natural language. The system retrieves relevant context and generates accurate answers using LLMs.',
    techStack: ['Python', 'LangChain', 'OpenAI GPT-4', 'Pinecone', 'FastAPI', 'React', 'Docker'],
    keyFeatures: [
      'Multi-format document ingestion (PDF, DOCX, TXT, Markdown)',
      'Semantic chunking with overlap for context preservation',
      'Hybrid search (dense + sparse) for better retrieval',
      'Citation tracking - shows which documents were used',
      'Conversation memory for follow-up questions',
      'Admin dashboard for document management',
    ],
    implementation: [
      {
        step: 'Document Processing Pipeline',
        details: 'Used PyPDF2 and python-docx to extract text. Implemented recursive text splitter with 500-token chunks and 50-token overlap. Generated embeddings using OpenAI text-embedding-ada-002.',
      },
      {
        step: 'Vector Database Setup',
        details: 'Stored embeddings in Pinecone with metadata (source, page number, timestamp). Created separate namespaces for different document types. Implemented incremental updates to avoid re-processing.',
      },
      {
        step: 'Retrieval Strategy',
        details: 'Combined semantic search (cosine similarity) with BM25 keyword search. Retrieved top 5 chunks, re-ranked using cross-encoder. Added MMR (Maximal Marginal Relevance) to reduce redundancy.',
      },
      {
        step: 'Generation with Citations',
        details: 'Passed retrieved chunks to GPT-4 with prompt engineering to cite sources. Implemented streaming responses for better UX. Added confidence scores based on retrieval similarity.',
      },
      {
        step: 'Conversation Memory',
        details: 'Used ConversationBufferMemory to maintain context across turns. Implemented sliding window (last 5 messages) to control token usage. Stored conversations in PostgreSQL for analytics.',
      },
    ],
    challenges: [
      'Handling large PDFs (1000+ pages) - solved with parallel processing and batch embeddings',
      'Reducing hallucinations - added strict prompt instructions and confidence thresholds',
      'Cost optimization - cached embeddings and used GPT-3.5-turbo for simple queries',
    ],
    results: '85% answer accuracy on internal test set. Reduced employee time spent searching docs by 40%. Processed 10,000+ documents with <2s query latency.',
    interviewTips: [
      'Explain why you chose chunking size (500 tokens) - balance between context and precision',
      'Discuss trade-offs: semantic search finds similar concepts, keyword search finds exact terms',
      'Mention how you evaluated the system - used human feedback and RAGAS metrics',
      'Talk about production concerns: rate limiting, caching, monitoring token usage',
    ],
    githubIdeas: [
      'Include sample documents and queries in README',
      'Add evaluation notebook with RAGAS scores',
      'Document your prompt engineering iterations',
      'Show before/after examples of retrieval quality improvements',
    ],
  },
  {
    id: 'rag-2',
    title: 'Multi-Modal RAG for Technical Documentation',
    category: 'RAG (Retrieval-Augmented Generation)',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Developed a RAG system that handles text, images, tables, and code snippets from technical documentation. Used multi-modal embeddings to retrieve relevant visual and textual content.',
    techStack: ['Python', 'LlamaIndex', 'CLIP', 'GPT-4V', 'Weaviate', 'Streamlit', 'Tesseract OCR'],
    keyFeatures: [
      'Image understanding using CLIP embeddings',
      'Table extraction and structured querying',
      'Code snippet retrieval with syntax highlighting',
      'Diagram explanation using GPT-4 Vision',
      'Cross-modal search (text query → image results)',
      'Export answers as formatted reports',
    ],
    implementation: [
      {
        step: 'Multi-Modal Parsing',
        details: 'Used pdfplumber to extract tables, images, and text separately. Applied Tesseract OCR for text in images. Detected code blocks using regex patterns and language detection.',
      },
      {
        step: 'Embedding Strategy',
        details: 'Generated CLIP embeddings for images, OpenAI embeddings for text, and CodeBERT embeddings for code. Stored all in Weaviate with cross-references between related content.',
      },
      {
        step: 'Hybrid Retrieval',
        details: 'Implemented query routing - text queries use text embeddings, visual queries use CLIP. For complex queries, retrieved from multiple modalities and fused results using reciprocal rank fusion.',
      },
      {
        step: 'Vision-Language Integration',
        details: 'Passed retrieved images to GPT-4V with context from surrounding text. Generated detailed explanations of diagrams, charts, and architecture drawings.',
      },
      {
        step: 'Structured Output',
        details: 'Used Pydantic models to enforce output format. Generated markdown reports with embedded images and code blocks. Added export to PDF using WeasyPrint.',
      },
    ],
    challenges: [
      'Image quality issues - enhanced with PIL before OCR, used super-resolution for low-res images',
      'Table structure preservation - used camelot-py for complex tables, fallback to pdfplumber',
      'Cross-modal relevance - tuned fusion weights based on query type classification',
    ],
    results: 'Achieved 78% accuracy on multi-modal queries. Successfully extracted 95% of tables and images. Users reported 50% faster documentation navigation.',
    interviewTips: [
      'Explain CLIP - it learns joint embeddings for images and text in the same space',
      'Discuss why you need different embeddings for different modalities',
      'Mention evaluation challenges - hard to measure multi-modal quality automatically',
      'Talk about when to use GPT-4V vs CLIP - GPT-4V for reasoning, CLIP for retrieval',
    ],
    githubIdeas: [
      'Include sample technical docs with images and tables',
      'Show embedding space visualization (t-SNE plot)',
      'Add comparison: single-modal vs multi-modal retrieval',
      'Document your OCR preprocessing pipeline',
    ],
  },
  {
    id: 'rag-3',
    title: 'Hierarchical RAG with Parent-Child Chunking',
    category: 'RAG (Retrieval-Augmented Generation)',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    overview: 'Implemented advanced RAG with hierarchical document structure. Small chunks for precise retrieval, but returns larger parent chunks for better context during generation.',
    techStack: ['Python', 'LangChain', 'Anthropic Claude', 'ChromaDB', 'FastAPI', 'PostgreSQL'],
    keyFeatures: [
      'Two-level chunking: sentences (retrieval) + paragraphs (context)',
      'Document hierarchy preservation (sections, subsections)',
      'Automatic summary generation for long documents',
      'Query expansion using LLM',
      'Relevance feedback loop',
      'A/B testing framework for chunk strategies',
    ],
    implementation: [
      {
        step: 'Hierarchical Chunking',
        details: 'Split documents into sections using headers. Created child chunks (100 tokens) and parent chunks (500 tokens). Stored parent-child relationships in PostgreSQL with foreign keys.',
      },
      {
        step: 'Dual Embedding Strategy',
        details: 'Embedded child chunks for retrieval precision. When child chunk is retrieved, fetched its parent chunk for generation. This gives precise matching but rich context.',
      },
      {
        step: 'Query Expansion',
        details: 'Used Claude to generate 3 variations of user query. Retrieved results for all variations, merged using score-based ranking. Improved recall by 25%.',
      },
      {
        step: 'Summary Indexing',
        details: 'Generated summaries for documents >5000 tokens. Indexed summaries separately. For broad queries, retrieved summaries first, then drilled down to specific chunks.',
      },
      {
        step: 'Feedback Loop',
        details: 'Added thumbs up/down on answers. Stored feedback with query-chunk pairs. Used feedback to fine-tune retrieval weights and re-rank results.',
      },
    ],
    challenges: [
      'Chunk boundary issues - solved by adding overlap and preserving sentence boundaries',
      'Parent chunk too large - implemented dynamic parent size based on document structure',
      'Query expansion noise - filtered expansions using semantic similarity threshold',
    ],
    results: 'Improved answer quality by 30% compared to flat chunking. Reduced "context not found" errors by 40%. User satisfaction score: 4.2/5.',
    interviewTips: [
      'Explain the trade-off: small chunks = precise retrieval but lack context',
      'Discuss when hierarchical RAG helps - long documents with clear structure',
      'Mention alternative: use small chunks but retrieve neighbors (sliding window)',
      'Talk about evaluation - used both retrieval metrics (MRR) and generation metrics (BLEU)',
    ],
    githubIdeas: [
      'Visualize parent-child relationships in a tree diagram',
      'Compare retrieval quality: flat vs hierarchical chunking',
      'Show query expansion examples',
      'Include A/B test results with statistical significance',
    ],
  },
  {
    id: 'rag-4',
    title: 'Self-Querying RAG with Metadata Filtering',
    category: 'RAG (Retrieval-Augmented Generation)',
    difficulty: 'Intermediate',
    duration: '2 weeks',
    overview: 'Built a RAG system that automatically extracts filters from natural language queries and applies them to metadata before semantic search. Improves precision for queries with specific constraints.',
    techStack: ['Python', 'LangChain', 'OpenAI', 'Qdrant', 'Pydantic', 'FastAPI'],
    keyFeatures: [
      'Automatic metadata extraction from queries',
      'Structured filtering (date ranges, categories, authors)',
      'Fallback to pure semantic search if no filters detected',
      'Query intent classification',
      'Metadata-aware re-ranking',
      'Explainable results with filter visualization',
    ],
    implementation: [
      {
        step: 'Metadata Schema Design',
        details: 'Defined metadata fields: date, author, category, document_type, tags. Stored in Qdrant payload alongside embeddings. Indexed metadata fields for fast filtering.',
      },
      {
        step: 'Query Parsing with LLM',
        details: 'Used GPT-3.5 with structured output (Pydantic) to extract filters from query. Example: "Show me Python tutorials from 2023" → {language: "Python", year: 2023, type: "tutorial"}.',
      },
      {
        step: 'Hybrid Search Pipeline',
        details: 'Applied metadata filters first to reduce search space. Then performed semantic search within filtered results. This is much faster than post-filtering.',
      },
      {
        step: 'Intent Classification',
        details: 'Classified queries into: factual, comparison, how-to, troubleshooting. Adjusted retrieval strategy per intent - factual queries use strict filters, how-to queries are more lenient.',
      },
      {
        step: 'Explainability',
        details: 'Showed users which filters were applied. Added "Remove filter" buttons to refine search. Logged filter accuracy for continuous improvement.',
      },
    ],
    challenges: [
      'Ambiguous queries - "recent documents" could mean last week or last year. Solved with default values and user confirmation.',
      'Filter extraction errors - added validation and fallback to no-filter search',
      'Performance with many filters - optimized Qdrant indexes and used filter caching',
    ],
    results: 'Reduced irrelevant results by 60%. Query latency decreased from 800ms to 300ms due to pre-filtering. 90% filter extraction accuracy.',
    interviewTips: [
      'Explain why metadata filtering before semantic search is faster',
      'Discuss structured output with Pydantic - ensures LLM returns valid JSON',
      'Mention when self-querying helps - large document collections with rich metadata',
      'Talk about error handling - what if LLM extracts wrong filters?',
    ],
    githubIdeas: [
      'Show query parsing examples with extracted filters',
      'Compare performance: with vs without pre-filtering',
      'Document your metadata schema design decisions',
      'Add filter extraction accuracy metrics',
    ],
  },
  {
    id: 'rag-5',
    title: 'Corrective RAG (CRAG) with Self-Reflection',
    category: 'RAG (Retrieval-Augmented Generation)',
    difficulty: 'Advanced',
    duration: '3 weeks',
    overview: 'Implemented Corrective RAG that evaluates retrieval quality and takes corrective actions: web search fallback, query rewriting, or confidence-based rejection. Reduces hallucinations significantly.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'Tavily Search API', 'Redis', 'Prometheus'],
    keyFeatures: [
      'Retrieval quality scoring using LLM-as-judge',
      'Automatic web search fallback for low-quality retrieval',
      'Query rewriting when retrieval fails',
      'Confidence-based answer rejection',
      'Iterative refinement (up to 3 attempts)',
      'Monitoring dashboard for failure analysis',
    ],
    implementation: [
      {
        step: 'Retrieval Grading',
        details: 'After retrieving chunks, used GPT-4 to grade relevance (0-10). If average score <6, triggered corrective action. Prompt: "Rate how relevant this passage is to answering the question."',
      },
      {
        step: 'Corrective Actions',
        details: 'Low score (0-4): Rewrite query and retry. Medium score (5-6): Augment with web search. High score (7-10): Proceed with generation. Implemented action decision tree.',
      },
      {
        step: 'Web Search Integration',
        details: 'Used Tavily API to search web when internal docs insufficient. Combined web results with internal chunks. Added source attribution (internal vs web).',
      },
      {
        step: 'Query Rewriting',
        details: 'Used LLM to rephrase query for better retrieval. Techniques: add context, expand acronyms, break down complex queries. Cached rewrites in Redis to avoid redundant LLM calls.',
      },
      {
        step: 'Confidence Scoring',
        details: 'Generated answer with confidence score (0-100). If <70, showed "Low confidence" warning. If <50, rejected answer and suggested query refinement.',
      },
    ],
    challenges: [
      'Grading latency - added parallel grading for multiple chunks, reduced from 5s to 1.5s',
      'Web search noise - filtered results by domain reputation and content quality',
      'Infinite loops - limited to 3 correction attempts, then returned best effort answer',
    ],
    results: 'Reduced hallucination rate from 15% to 3%. Improved answer accuracy by 35%. 92% of queries resolved without web search.',
    interviewTips: [
      'Explain CRAG concept - self-correcting RAG that evaluates its own retrieval',
      'Discuss LLM-as-judge - using LLM to evaluate LLM outputs',
      'Mention when to use web search - when internal knowledge is insufficient',
      'Talk about production trade-offs - CRAG is slower but more accurate',
    ],
    githubIdeas: [
      'Show decision tree for corrective actions',
      'Compare hallucination rates: RAG vs CRAG',
      'Document your grading prompt engineering',
      'Add monitoring dashboard screenshots',
    ],
  },

  // AGENT PROJECTS
  {
    id: 'agent-1',
    title: 'Autonomous Research Agent with Tool Use',
    category: 'AI Agents',
    difficulty: 'Advanced',
    duration: '4 weeks',
    overview: 'Built an autonomous agent that conducts research on any topic by searching the web, reading articles, synthesizing information, and generating comprehensive reports. Uses ReAct pattern for reasoning and tool selection.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'Tavily API', 'BeautifulSoup', 'Playwright', 'MongoDB'],
    keyFeatures: [
      'Multi-step reasoning with ReAct (Reason + Act)',
      'Tool selection: web search, web scraping, calculator, Wikipedia',
      'Iterative research with follow-up questions',
      'Source verification and fact-checking',
      'Structured report generation with citations',
      'Research history tracking and resumption',
    ],
    implementation: [
      {
        step: 'ReAct Agent Loop',
        details: 'Implemented Thought-Action-Observation loop. Agent thinks about next step, selects tool, observes result, repeats. Used GPT-4 with few-shot examples to teach reasoning.',
      },
      {
        step: 'Tool Implementation',
        details: 'Created 5 tools: search_web (Tavily), scrape_url (Playwright), search_wikipedia, calculate (Python eval), save_note. Each tool has description for LLM to understand when to use.',
      },
      {
        step: 'Planning and Decomposition',
        details: 'Agent breaks complex research into sub-questions. Example: "AI in healthcare" → ["What are current AI applications?", "What are challenges?", "What is future outlook?"]. Answers each sequentially.',
      },
      {
        step: 'Memory Management',
        details: 'Stored research progress in MongoDB. Implemented short-term memory (current session) and long-term memory (past research). Agent can reference previous findings.',
      },
      {
        step: 'Report Synthesis',
        details: 'After research complete, agent synthesizes findings into structured report. Used GPT-4 with long context (128k tokens) to process all gathered information. Generated markdown with sections and citations.',
      },
    ],
    challenges: [
      'Agent getting stuck in loops - added max iterations (15) and loop detection',
      'Irrelevant tool calls - improved tool descriptions and added negative examples',
      'Cost control - cached search results and limited web scraping to 10 pages per research',
    ],
    results: 'Generated 50+ research reports with 90% factual accuracy. Average research time: 3 minutes. Users rated reports 4.5/5 for comprehensiveness.',
    interviewTips: [
      'Explain ReAct pattern - combines reasoning (Chain-of-Thought) with actions (tool use)',
      'Discuss tool selection - LLM chooses tools based on descriptions, not hardcoded logic',
      'Mention failure modes - agents can hallucinate tool calls or get stuck',
      'Talk about evaluation - hard to measure agent quality, used human feedback',
    ],
    githubIdeas: [
      'Show example research traces (Thought-Action-Observation)',
      'Include sample reports with citations',
      'Document your tool descriptions and few-shot examples',
      'Add cost analysis per research task',
    ],
  },
  {
    id: 'agent-2',
    title: 'Multi-Agent Code Review System',
    category: 'AI Agents',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Developed a multi-agent system where specialized agents collaborate to review code. Agents have different roles: security expert, performance optimizer, code quality checker, and documentation reviewer.',
    techStack: ['Python', 'LangGraph', 'GPT-4', 'Claude', 'GitHub API', 'PostgreSQL', 'FastAPI'],
    keyFeatures: [
      'Role-based agent specialization',
      'Agent communication and consensus building',
      'Parallel review execution',
      'Conflict resolution when agents disagree',
      'Priority scoring for issues',
      'Integration with GitHub PR workflow',
    ],
    implementation: [
      {
        step: 'Agent Architecture',
        details: 'Created 4 specialized agents with different system prompts. Security Agent: checks for vulnerabilities. Performance Agent: identifies bottlenecks. Quality Agent: checks style and best practices. Docs Agent: reviews comments and README.',
      },
      {
        step: 'LangGraph Workflow',
        details: 'Used LangGraph to orchestrate agents. Workflow: 1) Coordinator assigns code sections to agents, 2) Agents review in parallel, 3) Aggregator combines findings, 4) Resolver handles conflicts.',
      },
      {
        step: 'Agent Communication',
        details: 'Agents share findings via shared state. If Security Agent finds SQL injection, Performance Agent skips optimization for that code. Implemented message passing with priority queues.',
      },
      {
        step: 'Consensus Mechanism',
        details: 'When agents disagree (e.g., "refactor" vs "keep as-is"), Coordinator agent makes final decision based on severity scores. Used weighted voting with agent confidence.',
      },
      {
        step: 'GitHub Integration',
        details: 'Listened to PR webhooks. Fetched diff, ran agent review, posted comments on specific lines. Added "Fix" button that generates code suggestions.',
      },
    ],
    challenges: [
      'Agent coordination overhead - optimized by running independent checks in parallel',
      'Conflicting recommendations - added priority system (security > performance > style)',
      'Token costs - used GPT-3.5 for simple checks, GPT-4 only for complex logic',
    ],
    results: 'Reviewed 200+ PRs with 85% useful feedback rate. Found 15 security issues missed by humans. Reduced review time from 30min to 5min.',
    interviewTips: [
      'Explain multi-agent benefits - specialization leads to better quality than single generalist',
      'Discuss LangGraph - framework for building agent workflows with state management',
      'Mention coordination challenges - agents need to communicate without conflicts',
      'Talk about when multi-agent is overkill - simple tasks don\'t need multiple agents',
    ],
    githubIdeas: [
      'Visualize agent workflow with LangGraph diagram',
      'Show example PR review with agent comments',
      'Compare single-agent vs multi-agent review quality',
      'Document agent specialization prompts',
    ],
  },
];
