// Interview Deep Dives - Part 5
// RAG & Retrieval, Production ML

import type { DeepDiveTopic } from './interviewDeepDives1';

export const DEEP_DIVE_TOPICS_PART5: DeepDiveTopic[] = [
  {
    id: 'rag-1',
    title: 'RAG (Retrieval-Augmented Generation)',
    category: 'RAG & Retrieval',
    difficulty: 'Advanced',
    concept: 'RAG combines retrieval and generation by fetching relevant documents from a knowledge base and using them as context for LLM generation. It grounds responses in factual information and reduces hallucinations.',
    howItWorks: [
      {
        step: 'Index documents',
        explanation: 'Chunk documents into passages (typically 200-500 tokens). Generate embeddings for each chunk using encoder model (e.g., sentence-transformers). Store in vector database (Pinecone, Weaviate, FAISS).',
      },
      {
        step: 'Query processing',
        explanation: 'User asks question. Encode query using same encoder model to get query embedding vector.',
      },
      {
        step: 'Retrieval',
        explanation: 'Search vector database for top-k most similar chunks using cosine similarity or dot product. Typically retrieve 3-10 chunks. This is semantic search.',
      },
      {
        step: 'Context augmentation',
        explanation: 'Combine retrieved chunks with user query into prompt: "Context: [chunk1][chunk2]... Question: [query] Answer:". This grounds the LLM.',
      },
      {
        step: 'Generation',
        explanation: 'LLM generates answer conditioned on retrieved context. It can cite sources and avoid hallucinating facts not in context.',
      },
    ],
    intuition: 'RAG is like an open-book exam. Instead of memorizing everything (parametric knowledge), you can look up information in textbooks (retrieval) and then answer questions (generation). This is more reliable than closed-book (pure LLM).',
    whenToUse: [
      'Question answering over private/recent documents',
      'When LLM knowledge is outdated',
      'To reduce hallucinations with factual grounding',
      'Customer support chatbots with knowledge bases',
      'When you need source citations',
    ],
    tradeoffs: {
      pros: [
        'Reduces hallucinations with factual grounding',
        'Can update knowledge without retraining',
        'Provides source citations',
        'Works with smaller LLMs',
      ],
      cons: [
        'Retrieval quality critical (garbage in, garbage out)',
        'Increased latency (retrieval + generation)',
        'Context window limits (can\'t retrieve too much)',
        'Requires maintaining vector database',
      ],
    },
    codeExample: {
      language: 'python',
      code: `from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from openai import OpenAI

# 1. Index documents
encoder = SentenceTransformer('all-MiniLM-L6-v2')
documents = [
    "Paris is the capital of France.",
    "The Eiffel Tower is 330 meters tall.",
    "Python was created by Guido van Rossum in 1991."
]

# Generate embeddings
doc_embeddings = encoder.encode(documents)

# Create FAISS index
dimension = doc_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(doc_embeddings.astype('float32'))

# 2. Query and retrieve
query = "How tall is the Eiffel Tower?"
query_embedding = encoder.encode([query])

# Search top-k similar documents
k = 2
distances, indices = index.search(query_embedding.astype('float32'), k)

retrieved_docs = [documents[i] for i in indices[0]]
print(f"Retrieved: {retrieved_docs}")

# 3. Generate with context
client = OpenAI()
context = "\\n".join(retrieved_docs)
prompt = f"""Context: {context}

Question: {query}

Answer based on the context above:"""

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}]
)

print(f"Answer: {response.choices[0].message.content}")`,
      explanation: 'This shows basic RAG pipeline: encode documents, store in FAISS, retrieve similar docs for query, augment prompt with context, generate answer. Production systems use chunking strategies, reranking, and hybrid search.',
    },
    visualAnalogy: 'RAG is like a research assistant. When you ask a question, they first search through relevant books and papers (retrieval), then synthesize an answer based on what they found (generation). They can cite sources and admit when information isn\'t available.',
    interviewQuestions: [
      {
        question: 'What are common chunking strategies for RAG?',
        answer: 'Fixed-size: Split by token count (e.g., 512 tokens, 50 overlap). Simple but can break sentences. Sentence-based: Split by sentences, combine until size limit. Preserves meaning. Semantic: Use NLP to identify topic boundaries. Recursive: Split by paragraphs, then sentences if needed. Trade-off: smaller chunks = more precise retrieval but less context, larger chunks = more context but less precise.',
      },
      {
        question: 'How do you evaluate RAG systems?',
        answer: 'Retrieval metrics: Recall@k (are relevant docs in top-k?), MRR (Mean Reciprocal Rank), NDCG. Generation metrics: Faithfulness (is answer grounded in context?), Answer relevance (does it address question?), Context relevance (are retrieved docs relevant?). End-to-end: Human evaluation, RAGAS framework. Key: evaluate retrieval and generation separately to identify bottlenecks.',
      },
      {
        question: 'What is hybrid search in RAG?',
        answer: 'Hybrid search combines dense (vector) and sparse (keyword) retrieval. Dense: semantic similarity via embeddings, catches synonyms and paraphrases. Sparse: BM25 keyword matching, catches exact terms. Combine scores (e.g., weighted sum). Benefits: dense handles semantic queries, sparse handles rare terms and names. Often outperforms either alone. Implemented in Elasticsearch, Weaviate.',
      },
      {
        question: 'How to handle multi-hop questions in RAG?',
        answer: 'Multi-hop: answer requires combining information from multiple documents. Solutions: 1) Iterative retrieval: retrieve, generate sub-answer, retrieve again with new context, 2) Graph-based: build knowledge graph, traverse to find connected facts, 3) Decompose question into sub-questions, retrieve for each, 4) Retrieve more documents (higher k). Challenge: context window limits. Techniques like self-ask and chain-of-thought help.',
      },
    ],
    commonMistakes: [
      'Not chunking documents properly (too large or too small)',
      'Using different encoders for indexing and querying',
      'Not handling context window limits',
      'Ignoring retrieval quality (focusing only on LLM)',
      'Not implementing reranking for better precision',
    ],
    relatedTopics: ['Vector Databases', 'Semantic Search', 'Embeddings', 'Reranking', 'Hybrid Search'],
  },
  {
    id: 'prod-1',
    title: 'Model Serving & Inference Optimization',
    category: 'Production ML',
    difficulty: 'Advanced',
    concept: 'Model serving deploys trained models for real-time or batch inference. Optimization techniques like quantization, batching, and caching reduce latency and cost while maintaining accuracy.',
    howItWorks: [
      {
        step: 'Model export',
        explanation: 'Convert trained model to deployment format: ONNX (cross-platform), TorchScript (PyTorch), SavedModel (TensorFlow). This removes training-specific code and optimizes graph.',
      },
      {
        step: 'Optimization',
        explanation: 'Apply techniques: Quantization (FP32→INT8), pruning (remove weights), distillation (smaller model), operator fusion (combine ops). Trade accuracy for speed/size.',
      },
      {
        step: 'Serving infrastructure',
        explanation: 'Deploy with serving framework: TorchServe, TensorFlow Serving, Triton, FastAPI. Handle requests, load balancing, auto-scaling, monitoring.',
      },
      {
        step: 'Inference optimization',
        explanation: 'Dynamic batching (combine requests), caching (store common predictions), model parallelism (split across GPUs), KV cache (for transformers).',
      },
      {
        step: 'Monitoring',
        explanation: 'Track latency (p50, p95, p99), throughput (QPS), error rates, model drift. Set up alerts and logging.',
      },
    ],
    intuition: 'Model serving is like running a restaurant. Training is developing recipes (model). Serving is cooking for customers (inference). You optimize: batch cooking (dynamic batching), prep ingredients ahead (caching), use efficient equipment (quantization), monitor wait times (latency).',
    whenToUse: [
      'Deploying models to production',
      'When latency or cost is critical',
      'Serving at scale (high QPS)',
      'Edge deployment (mobile, IoT)',
    ],
    tradeoffs: {
      pros: [
        'Reduced latency and cost',
        'Better resource utilization',
        'Scalable to high traffic',
        'Enables real-time applications',
      ],
      cons: [
        'Complexity in setup and maintenance',
        'Optimization can reduce accuracy',
        'Requires infrastructure expertise',
        'Monitoring and debugging harder',
      ],
    },
    codeExample: {
      language: 'python',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import time

app = FastAPI()

# Load model once at startup
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model.eval()

# Quantization for faster inference
model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# Simple cache
cache = {}

class PredictionRequest(BaseModel):
    text: str

@app.post("/predict")
async def predict(request: PredictionRequest):
    start_time = time.time()
    
    # Check cache
    if request.text in cache:
        return {"prediction": cache[request.text], "cached": True}
    
    # Tokenize and predict
    inputs = tokenizer(request.text, return_tensors="pt", truncation=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
    
    # Cache result
    cache[request.text] = prediction
    
    latency = (time.time() - start_time) * 1000
    
    return {
        "prediction": prediction,
        "latency_ms": latency,
        "cached": False
    }

# Run with: uvicorn main:app --workers 4
# Load test with: locust or ab

# Dynamic batching example (more complex)
class BatchPredictor:
    def __init__(self, model, max_batch_size=32, max_wait_ms=10):
        self.model = model
        self.max_batch_size = max_batch_size
        self.max_wait_ms = max_wait_ms
        self.queue = []
    
    async def predict(self, inputs):
        # Add to queue, wait for batch or timeout
        # Process batch together for efficiency
        pass  # Implementation details omitted`,
      explanation: 'This shows basic serving with FastAPI, quantization for speed, and caching. Production systems add: dynamic batching, model versioning, A/B testing, comprehensive monitoring, auto-scaling.',
    },
    visualAnalogy: 'Model serving is like a coffee shop. Training is perfecting the recipe. Serving is making coffee for customers. Optimizations: batch orders (dynamic batching), pre-grind beans (caching), use faster machines (quantization), track wait times (monitoring).',
    interviewQuestions: [
      {
        question: 'Explain quantization and its trade-offs',
        answer: 'Quantization reduces precision: FP32 (32-bit float) → INT8 (8-bit integer). Benefits: 4x smaller model, 2-4x faster inference, less memory. Process: calibrate on representative data to find scale/zero-point, convert weights and activations. Trade-off: slight accuracy loss (typically <1% for INT8). Post-training quantization (PTQ) is easy, quantization-aware training (QAT) maintains accuracy better. Critical for edge deployment.',
      },
      {
        question: 'What is dynamic batching and why use it?',
        answer: 'Dynamic batching combines multiple inference requests into a single batch for GPU efficiency. GPUs are optimized for parallel computation - processing 32 samples is only slightly slower than 1. Implementation: collect requests for short time window (e.g., 10ms) or until batch size reached, process together. Benefits: higher throughput, better GPU utilization. Trade-off: slight latency increase. Essential for high-QPS serving.',
      },
      {
        question: 'How do you monitor models in production?',
        answer: 'Monitor: 1) Performance: latency (p50/p95/p99), throughput (QPS), error rate, 2) Model quality: prediction distribution, confidence scores, accuracy on validation set, 3) Data drift: input distribution changes, feature statistics, 4) Infrastructure: CPU/GPU utilization, memory, costs. Tools: Prometheus, Grafana, custom dashboards. Set alerts for anomalies. Log predictions for debugging and retraining.',
      },
    ],
    commonMistakes: [
      'Not optimizing for production (using training code)',
      'Ignoring batching opportunities',
      'Not monitoring latency percentiles (p95, p99)',
      'Forgetting to set model.eval() mode',
      'Not handling errors and timeouts gracefully',
    ],
    relatedTopics: ['Quantization', 'Model Compression', 'TorchServe', 'ONNX', 'A/B Testing'],
  },
  {
    id: 'prod-2',
    title: 'A/B Testing for ML Models',
    category: 'Production ML',
    difficulty: 'Intermediate',
    concept: 'A/B testing compares two model versions by randomly assigning users to control (A) or treatment (B) groups and measuring business metrics. It validates that new models improve real-world performance.',
    howItWorks: [
      {
        step: 'Define hypothesis and metrics',
        explanation: 'Hypothesis: "New model increases click-through rate". Metrics: Primary (CTR), secondary (latency, revenue), guardrail (error rate). Set success criteria.',
      },
      {
        step: 'Random assignment',
        explanation: 'Randomly split traffic: 90% control (old model), 10% treatment (new model). Use consistent hashing to ensure same user always gets same variant.',
      },
      {
        step: 'Run experiment',
        explanation: 'Serve both models in parallel. Log predictions, user actions, and metrics. Run for sufficient duration to reach statistical significance (typically 1-2 weeks).',
      },
      {
        step: 'Statistical analysis',
        explanation: 'Compare metrics using t-test or chi-square test. Calculate confidence intervals. Check for statistical significance (p < 0.05) and practical significance (effect size).',
      },
      {
        step: 'Decision and rollout',
        explanation: 'If treatment wins: gradually increase traffic (10% → 50% → 100%). Monitor for issues. If control wins: investigate why, iterate on model.',
      },
    ],
    intuition: 'A/B testing is like a taste test. You give half the people Coke (control), half Pepsi (treatment), and see which they prefer. For ML, you serve half users the old model, half the new model, and measure which performs better on business metrics.',
    whenToUse: [
      'Deploying new model versions',
      'Validating offline improvements translate to online gains',
      'Comparing different model architectures',
      'Testing feature changes or hyperparameters',
    ],
    tradeoffs: {
      pros: [
        'Measures real-world impact',
        'Catches issues offline metrics miss',
        'Provides statistical confidence',
        'Reduces risk of bad deployments',
      ],
      cons: [
        'Requires significant traffic',
        'Takes time to reach significance',
        'Can\'t test everything (too many variants)',
        'Requires infrastructure for multi-model serving',
      ],
    },
    visualAnalogy: 'A/B testing is like testing a new recipe. You serve the old recipe to half your customers, new recipe to the other half. You measure satisfaction, not just your own opinion. If customers prefer the new recipe, you switch. If not, you keep the old one.',
    interviewQuestions: [
      {
        question: 'How do you determine sample size for A/B test?',
        answer: 'Use power analysis: n = (Z_α/2 + Z_β)² × 2σ² / δ². Where: Z_α/2 for significance level (1.96 for 95%), Z_β for power (0.84 for 80%), σ is standard deviation, δ is minimum detectable effect. Example: to detect 1% CTR improvement from 5% baseline with 80% power, need ~40K samples per variant. Smaller effects need more samples.',
      },
      {
        question: 'What are guardrail metrics in A/B testing?',
        answer: 'Guardrail metrics ensure new model doesn\'t harm other aspects. Examples: latency (new model shouldn\'t be 2x slower), error rate (shouldn\'t increase), revenue (shouldn\'t decrease), user engagement. Even if primary metric improves, failing guardrails means don\'t ship. They protect against unintended consequences. Set thresholds before experiment.',
      },
      {
        question: 'How to handle multiple comparisons problem?',
        answer: 'Testing multiple metrics increases false positive rate. If testing 20 metrics at p<0.05, expect 1 false positive. Solutions: 1) Bonferroni correction: divide α by number of tests (conservative), 2) Choose one primary metric before experiment, others are secondary, 3) Use FDR (False Discovery Rate) control, 4) Require practical significance, not just statistical. Best: pre-register hypothesis and primary metric.',
      },
    ],
    commonMistakes: [
      'Not running test long enough (need statistical power)',
      'Peeking at results and stopping early (inflates false positives)',
      'Testing too many variants (reduces power)',
      'Not checking for novelty effects (users try new things)',
      'Ignoring practical significance (statistically significant but tiny effect)',
    ],
    relatedTopics: ['Statistical Significance', 'Model Monitoring', 'Causal Inference', 'Multi-Armed Bandits'],
  },
  {
    id: 'rag-2',
    title: 'Vector Databases',
    category: 'RAG & Retrieval',
    difficulty: 'Intermediate',
    concept: 'Vector databases store and efficiently search high-dimensional embeddings using approximate nearest neighbor algorithms. They enable semantic search at scale for RAG systems.',
    howItWorks: [
      {
        step: 'Indexing',
        explanation: 'Store embeddings with metadata. Build index structure (HNSW, IVF, LSH) for fast search. Index optimizes for similarity search, not exact match.',
      },
      {
        step: 'Query',
        explanation: 'Convert query to embedding using same encoder. Search index for k nearest neighbors using cosine similarity or dot product.',
      },
      {
        step: 'Approximate search',
        explanation: 'Use ANN (Approximate Nearest Neighbor) algorithms. Trade accuracy for speed. HNSW, IVF-PQ common. Much faster than brute force.',
      },
      {
        step: 'Return results',
        explanation: 'Return top-k most similar vectors with metadata (original text, document ID, etc.).',
      },
    ],
    intuition: 'Vector databases are like a smart library where books are organized by meaning, not alphabetically. When you ask a question, it finds books with similar meaning, even if they use different words. Much faster than reading every book.',
    whenToUse: [
      'RAG systems (semantic search)',
      'Recommendation systems',
      'Similarity search at scale (millions of vectors)',
      'When you need sub-second search',
    ],
    tradeoffs: {
      pros: [
        'Fast semantic search (milliseconds)',
        'Scales to billions of vectors',
        'Supports filtering and metadata',
        'Many managed options (Pinecone, Weaviate)',
      ],
      cons: [
        'Approximate (may miss exact nearest neighbors)',
        'Requires tuning index parameters',
        'Memory intensive',
        'Additional infrastructure to maintain',
      ],
    },
    visualAnalogy: 'Vector databases are like a GPS for meaning. Instead of finding locations by coordinates, you find documents by semantic coordinates (embeddings). The index is like a map that helps you navigate quickly without checking every point.',
    interviewQuestions: [
      {
        question: 'What is HNSW and why is it popular?',
        answer: 'HNSW (Hierarchical Navigable Small World): Graph-based ANN algorithm. Builds multi-layer graph where each node is a vector. Search starts at top layer (sparse, long jumps), descends to bottom (dense, precise). Benefits: fast search (log n), high recall, no training needed. Used in FAISS, Qdrant, Weaviate. Trade-off: high memory usage. Best for high-recall applications.',
      },
      {
        question: 'How do you choose between vector database options?',
        answer: 'Factors: Scale (millions vs billions), latency requirements, filtering needs, managed vs self-hosted. Pinecone: Managed, easy, expensive. Weaviate: Open-source, flexible, requires hosting. FAISS: Library (not database), fastest, no persistence. Qdrant: Open-source, good filtering. Milvus: Scalable, complex. Start with managed (Pinecone) for simplicity, self-host for cost/control.',
      },
      {
        question: 'What is the difference between exact and approximate search?',
        answer: 'Exact: Brute force, compute distance to all vectors, return true k-nearest. O(n) time. Accurate but slow for large datasets. Approximate (ANN): Use index to quickly find approximate k-nearest. O(log n) or O(√n) time. May miss some true neighbors but much faster. Trade recall for speed. For RAG, 95% recall is usually sufficient. Tune index parameters to balance speed/accuracy.',
      },
    ],
    commonMistakes: [
      'Not normalizing embeddings (affects cosine similarity)',
      'Using wrong distance metric (cosine vs dot product vs L2)',
      'Not tuning index parameters (default may be suboptimal)',
      'Forgetting to handle embedding model updates (need reindexing)',
    ],
    relatedTopics: ['FAISS', 'HNSW', 'Approximate Nearest Neighbors', 'Semantic Search', 'RAG'],
  },
  {
    id: 'prod-3',
    title: 'Model Monitoring and Drift Detection',
    category: 'Production ML',
    difficulty: 'Advanced',
    concept: 'Model monitoring tracks model performance and data distribution in production. Drift detection identifies when model assumptions break down, triggering retraining or alerts.',
    howItWorks: [
      {
        step: 'Define metrics',
        explanation: 'Performance: accuracy, latency, error rate. Data: feature distributions, prediction distributions. Business: revenue, user engagement.',
      },
      {
        step: 'Collect data',
        explanation: 'Log predictions, features, ground truth (when available), timestamps. Store in data warehouse or monitoring system.',
      },
      {
        step: 'Detect drift',
        explanation: 'Compare current distribution to training distribution. Statistical tests: KS test, PSI, KL divergence. Alert if drift exceeds threshold.',
      },
      {
        step: 'Analyze and respond',
        explanation: 'Investigate drift cause. Retrain model, update features, or adjust serving logic. Monitor impact of changes.',
      },
    ],
    intuition: 'Model monitoring is like a health checkup. You track vital signs (metrics) and compare to baseline (training data). If something changes significantly (drift), you investigate and treat the issue before it becomes serious.',
    whenToUse: [
      'All production ML systems',
      'When data distribution can change',
      'High-stakes applications (finance, healthcare)',
      'When model performance is critical',
    ],
    tradeoffs: {
      pros: [
        'Catches issues before they impact business',
        'Enables proactive retraining',
        'Provides visibility into model health',
        'Helps debug production issues',
      ],
      cons: [
        'Requires infrastructure and tooling',
        'Can generate false alarms',
        'Needs ground truth labels (delayed)',
        'Adds operational complexity',
      ],
    },
    visualAnalogy: 'Model monitoring is like a car dashboard. You track speed (performance), fuel (data quality), engine temperature (drift). Warning lights (alerts) tell you when something needs attention before breakdown.',
    interviewQuestions: [
      {
        question: 'What are the types of drift in ML?',
        answer: 'Concept drift: P(y|X) changes (relationship between features and target). Example: user preferences change. Data drift (covariate shift): P(X) changes (feature distribution). Example: new user demographics. Label drift: P(y) changes (target distribution). Example: fraud patterns evolve. Upstream drift: Data pipeline changes. Each requires different response: concept drift needs retraining, data drift may need feature engineering.',
      },
      {
        question: 'How do you detect drift without ground truth labels?',
        answer: 'Prediction drift: Monitor prediction distribution. If suddenly predicting 90% positive (was 50%), investigate. Feature drift: Track feature statistics (mean, std, quantiles). Use KS test or PSI. Embedding drift: Monitor embedding space (if using). Proxy metrics: User engagement, click-through rate. Delayed labels: Collect labels later, backfill analysis. Combine multiple signals for robust detection.',
      },
      {
        question: 'What is PSI and how is it used?',
        answer: 'PSI (Population Stability Index): Measures distribution shift. PSI = Σ(actual% - expected%) × ln(actual%/expected%). Bins feature into buckets, compares current vs baseline. PSI < 0.1: no drift, 0.1-0.25: moderate drift, >0.25: significant drift. Simple, interpretable, works for categorical and continuous features. Widely used in credit scoring and risk models. Limitation: sensitive to binning strategy.',
      },
    ],
    commonMistakes: [
      'Not monitoring at all (flying blind)',
      'Only monitoring accuracy (miss drift)',
      'Setting thresholds too tight (false alarms)',
      'Not having retraining pipeline ready',
      'Ignoring business metrics',
    ],
    relatedTopics: ['Data Drift', 'Concept Drift', 'A/B Testing', 'Model Retraining', 'MLOps'],
  },
];