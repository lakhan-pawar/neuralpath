// Comprehensive interview question database with company tags
export type InterviewQuestion = {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  answer: string;
  tips: string[];
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // TECHNICAL - MACHINE LEARNING
  {
    id: 'ml-1',
    question: 'Explain the difference between supervised and unsupervised learning with examples.',
    category: 'Machine Learning',
    difficulty: 'Easy',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
    answer: 'Supervised learning uses labeled data where the model learns from input-output pairs (e.g., spam classification with labeled emails). Unsupervised learning finds patterns in unlabeled data (e.g., customer segmentation without predefined groups). Supervised is like learning with a teacher, unsupervised is discovering patterns independently.',
    tips: [
      'Use concrete examples from your experience',
      'Mention when to use each approach',
      'Discuss trade-offs like data requirements and interpretability'
    ]
  },
  {
    id: 'ml-2',
    question: 'What is overfitting and how do you prevent it?',
    category: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Netflix', 'Uber', 'Apple'],
    answer: 'Overfitting occurs when a model learns training data too well, including noise, leading to poor generalization. Prevention techniques: 1) Use more training data, 2) Apply regularization (L1/L2), 3) Use dropout in neural networks, 4) Early stopping, 5) Cross-validation, 6) Reduce model complexity, 7) Data augmentation.',
    tips: [
      'Explain the bias-variance tradeoff',
      'Mention specific regularization techniques you\'ve used',
      'Discuss how to detect overfitting (validation curves)'
    ]
  },
  {
    id: 'ml-3',
    question: 'Explain gradient descent and its variants.',
    category: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'OpenAI', 'DeepMind'],
    answer: 'Gradient descent optimizes model parameters by iteratively moving in the direction of steepest descent. Variants: 1) Batch GD - uses entire dataset, 2) Stochastic GD - uses one sample, 3) Mini-batch GD - uses small batches, 4) Adam - adaptive learning rates, 5) RMSprop - addresses learning rate issues. Each has trade-offs in convergence speed and stability.',
    tips: [
      'Draw the optimization landscape if possible',
      'Discuss learning rate selection',
      'Mention momentum and adaptive methods'
    ]
  },
  {
    id: 'ml-4',
    question: 'How do you handle imbalanced datasets?',
    category: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'PayPal', 'Stripe'],
    answer: 'Techniques for imbalanced data: 1) Resampling - oversample minority or undersample majority, 2) SMOTE - synthetic minority oversampling, 3) Class weights - penalize misclassification of minority class, 4) Ensemble methods - use balanced subsets, 5) Anomaly detection - treat minority as anomalies, 6) Different metrics - use F1, precision-recall instead of accuracy.',
    tips: [
      'Mention real-world examples like fraud detection',
      'Discuss evaluation metrics for imbalanced data',
      'Explain why accuracy is misleading'
    ]
  },
  {
    id: 'ml-5',
    question: 'Explain the bias-variance tradeoff.',
    category: 'Machine Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Netflix', 'Airbnb'],
    answer: 'Bias is error from overly simplistic assumptions (underfitting). Variance is error from sensitivity to training data fluctuations (overfitting). High bias = model too simple, high variance = model too complex. Goal is to find the sweet spot minimizing total error = bias² + variance + irreducible error. Regularization helps balance this tradeoff.',
    tips: [
      'Use visual examples or diagrams',
      'Relate to model complexity',
      'Discuss how cross-validation helps assess this'
    ]
  },

  // TECHNICAL - DEEP LEARNING
  {
    id: 'dl-1',
    question: 'Explain how backpropagation works in neural networks.',
    category: 'Deep Learning',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'OpenAI', 'NVIDIA'],
    answer: 'Backpropagation computes gradients of loss with respect to weights using chain rule. Process: 1) Forward pass - compute predictions, 2) Calculate loss, 3) Backward pass - compute gradients layer by layer from output to input, 4) Update weights using optimizer. It efficiently computes partial derivatives by reusing intermediate results.',
    tips: [
      'Mention the chain rule explicitly',
      'Discuss computational efficiency',
      'Relate to automatic differentiation frameworks'
    ]
  },
  {
    id: 'dl-2',
    question: 'What are the differences between CNN, RNN, and Transformer architectures?',
    category: 'Deep Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'OpenAI', 'Microsoft'],
    answer: 'CNN - uses convolution for spatial data (images), captures local patterns. RNN - processes sequences with memory, but suffers from vanishing gradients. Transformer - uses self-attention, processes sequences in parallel, no recurrence. Transformers dominate NLP (BERT, GPT), CNNs excel at vision, RNNs are legacy for sequences.',
    tips: [
      'Mention specific use cases for each',
      'Discuss why Transformers replaced RNNs',
      'Talk about computational efficiency'
    ]
  },
  {
    id: 'dl-3',
    question: 'Explain attention mechanism and self-attention.',
    category: 'Deep Learning',
    difficulty: 'Hard',
    companies: ['Google', 'OpenAI', 'Meta', 'DeepMind'],
    answer: 'Attention allows models to focus on relevant parts of input. Self-attention relates different positions in a sequence to compute representation. Formula: Attention(Q,K,V) = softmax(QK^T/√d)V. Query attends to Keys, retrieves Values. Multi-head attention runs multiple attention mechanisms in parallel. This is the core of Transformers.',
    tips: [
      'Draw the attention mechanism diagram',
      'Explain Query, Key, Value intuition',
      'Mention scaled dot-product attention'
    ]
  },
  {
    id: 'dl-4',
    question: 'What is batch normalization and why is it useful?',
    category: 'Deep Learning',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'NVIDIA', 'Tesla'],
    answer: 'Batch normalization normalizes layer inputs to have mean 0 and variance 1 across mini-batches. Benefits: 1) Faster training, 2) Higher learning rates possible, 3) Reduces internal covariate shift, 4) Acts as regularization, 5) Makes network less sensitive to initialization. It\'s applied before or after activation functions.',
    tips: [
      'Discuss internal covariate shift',
      'Mention layer normalization as alternative',
      'Explain behavior during training vs inference'
    ]
  },
  {
    id: 'dl-5',
    question: 'Explain dropout and when to use it.',
    category: 'Deep Learning',
    difficulty: 'Easy',
    companies: ['Google', 'Microsoft', 'Amazon', 'Apple'],
    answer: 'Dropout randomly sets a fraction of neurons to zero during training, preventing co-adaptation. It acts as ensemble learning - training multiple sub-networks. Use when: 1) Model is overfitting, 2) You have limited data, 3) Network is large. Typical rate: 0.2-0.5. Turn off during inference. Modern alternatives include batch norm and data augmentation.',
    tips: [
      'Explain the ensemble interpretation',
      'Mention inverted dropout for scaling',
      'Discuss when NOT to use dropout'
    ]
  },

  // TECHNICAL - NLP & LLMs
  {
    id: 'nlp-1',
    question: 'Explain how tokenization works in LLMs.',
    category: 'NLP & LLMs',
    difficulty: 'Medium',
    companies: ['OpenAI', 'Google', 'Anthropic', 'Cohere'],
    answer: 'Tokenization breaks text into subword units. Common methods: 1) BPE (Byte Pair Encoding) - merges frequent character pairs, 2) WordPiece - similar to BPE, 3) SentencePiece - language-agnostic. Tokens balance vocabulary size and representation. "ChatGPT" might be ["Chat", "G", "PT"]. Affects context window and model performance.',
    tips: [
      'Mention vocabulary size trade-offs',
      'Discuss handling of rare words',
      'Explain impact on multilingual models'
    ]
  },
  {
    id: 'nlp-2',
    question: 'What is the difference between BERT and GPT?',
    category: 'NLP & LLMs',
    difficulty: 'Medium',
    companies: ['Google', 'OpenAI', 'Microsoft', 'Meta'],
    answer: 'BERT - bidirectional encoder, masked language modeling, good for understanding tasks (classification, NER). GPT - unidirectional decoder, autoregressive generation, good for text generation. BERT sees full context, GPT only left context. BERT requires fine-tuning, GPT can do zero/few-shot. Modern trend favors decoder-only models like GPT.',
    tips: [
      'Explain pre-training objectives',
      'Discuss use cases for each',
      'Mention T5 as encoder-decoder alternative'
    ]
  },
  {
    id: 'nlp-3',
    question: 'Explain prompt engineering and its importance.',
    category: 'NLP & LLMs',
    difficulty: 'Easy',
    companies: ['OpenAI', 'Anthropic', 'Google', 'Microsoft'],
    answer: 'Prompt engineering designs inputs to get desired LLM outputs. Techniques: 1) Zero-shot - direct instruction, 2) Few-shot - provide examples, 3) Chain-of-thought - ask for reasoning, 4) System prompts - set behavior, 5) Temperature control - adjust randomness. Good prompts are clear, specific, and provide context. Critical for LLM applications.',
    tips: [
      'Give concrete examples of good vs bad prompts',
      'Mention prompt templates and variables',
      'Discuss iterative refinement'
    ]
  },
  {
    id: 'nlp-4',
    question: 'What is RAG (Retrieval-Augmented Generation)?',
    category: 'NLP & LLMs',
    difficulty: 'Medium',
    companies: ['OpenAI', 'Google', 'Microsoft', 'Anthropic'],
    answer: 'RAG combines retrieval with generation. Process: 1) User query, 2) Retrieve relevant documents from knowledge base, 3) Augment prompt with retrieved context, 4) Generate response. Benefits: 1) Reduces hallucinations, 2) Grounds responses in facts, 3) Updates knowledge without retraining, 4) Cites sources. Uses vector databases for semantic search.',
    tips: [
      'Explain vector embeddings and similarity search',
      'Discuss chunking strategies',
      'Mention evaluation challenges'
    ]
  },
  {
    id: 'nlp-5',
    question: 'Explain fine-tuning vs prompt engineering vs RAG.',
    category: 'NLP & LLMs',
    difficulty: 'Medium',
    companies: ['OpenAI', 'Google', 'Anthropic', 'Cohere'],
    answer: 'Fine-tuning - retrain model on specific data, expensive but powerful. Prompt engineering - craft inputs, cheap and fast, limited by context. RAG - retrieve relevant info, middle ground, good for knowledge-intensive tasks. Choose based on: data availability, budget, latency requirements, and task complexity. Often combine approaches.',
    tips: [
      'Discuss cost-benefit trade-offs',
      'Mention LoRA for efficient fine-tuning',
      'Give examples of when to use each'
    ]
  },

  // SYSTEM DESIGN
  {
    id: 'sys-1',
    question: 'Design a recommendation system for an e-commerce platform.',
    category: 'System Design',
    difficulty: 'Hard',
    companies: ['Amazon', 'Netflix', 'Spotify', 'Uber'],
    answer: 'Components: 1) Data collection - user behavior, item features, 2) Feature engineering - user/item embeddings, 3) Model - collaborative filtering + content-based, 4) Serving - low-latency API, 5) A/B testing, 6) Feedback loop. Architecture: offline training, online serving, caching layer. Handle cold start with content-based. Scale with distributed computing.',
    tips: [
      'Discuss collaborative vs content-based filtering',
      'Mention cold start problem solutions',
      'Talk about evaluation metrics (CTR, conversion)'
    ]
  },
  {
    id: 'sys-2',
    question: 'How would you deploy a machine learning model to production?',
    category: 'System Design',
    difficulty: 'Medium',
    companies: ['Google', 'Microsoft', 'Amazon', 'Uber'],
    answer: 'Steps: 1) Model serialization (ONNX, SavedModel), 2) Containerization (Docker), 3) API wrapper (FastAPI, Flask), 4) Orchestration (Kubernetes), 5) Monitoring (Prometheus, Grafana), 6) CI/CD pipeline, 7) A/B testing, 8) Model versioning. Consider: latency, throughput, cost, model drift detection, rollback strategy.',
    tips: [
      'Mention MLOps tools (MLflow, Kubeflow)',
      'Discuss batch vs real-time inference',
      'Talk about model monitoring and retraining'
    ]
  },
  {
    id: 'sys-3',
    question: 'Design a real-time fraud detection system.',
    category: 'System Design',
    difficulty: 'Hard',
    companies: ['PayPal', 'Stripe', 'Square', 'Visa'],
    answer: 'Architecture: 1) Streaming data ingestion (Kafka), 2) Feature extraction (real-time + historical), 3) Model serving (<100ms latency), 4) Rule engine for high-risk patterns, 5) Feedback loop for labeling, 6) Model retraining pipeline. Use ensemble of models, handle class imbalance, implement fallback rules, monitor false positives/negatives.',
    tips: [
      'Discuss latency requirements',
      'Mention handling imbalanced data',
      'Talk about cost of false positives vs negatives'
    ]
  },
  {
    id: 'sys-4',
    question: 'How would you scale a machine learning system to handle 10x traffic?',
    category: 'System Design',
    difficulty: 'Hard',
    companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
    answer: 'Strategies: 1) Horizontal scaling - add more servers, 2) Model optimization - quantization, pruning, 3) Caching - cache predictions for common inputs, 4) Load balancing, 5) Batch predictions where possible, 6) Model distillation - smaller models, 7) Edge deployment, 8) Async processing. Monitor: latency, throughput, error rates, costs.',
    tips: [
      'Discuss CAP theorem trade-offs',
      'Mention specific tools (Redis, CDN)',
      'Talk about cost optimization'
    ]
  },

  // CODING CHALLENGES
  {
    id: 'code-1',
    question: 'Implement a function to calculate cosine similarity between two vectors.',
    category: 'Coding',
    difficulty: 'Easy',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
    answer: 'def cosine_similarity(a, b):\n    dot_product = sum(x*y for x, y in zip(a, b))\n    norm_a = sum(x**2 for x in a) ** 0.5\n    norm_b = sum(x**2 for x in b) ** 0.5\n    return dot_product / (norm_a * norm_b)\n\nTime: O(n), Space: O(1). Handle edge cases: zero vectors, different lengths.',
    tips: [
      'Mention numpy implementation for efficiency',
      'Discuss numerical stability',
      'Explain use cases in ML (similarity search)'
    ]
  },
  {
    id: 'code-2',
    question: 'Write code to implement mini-batch gradient descent.',
    category: 'Coding',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'OpenAI', 'NVIDIA'],
    answer: 'def mini_batch_gd(X, y, lr=0.01, batch_size=32, epochs=100):\n    n = len(X)\n    w = np.zeros(X.shape[1])\n    for epoch in range(epochs):\n        indices = np.random.permutation(n)\n        for i in range(0, n, batch_size):\n            batch_idx = indices[i:i+batch_size]\n            X_batch, y_batch = X[batch_idx], y[batch_idx]\n            grad = compute_gradient(X_batch, y_batch, w)\n            w -= lr * grad\n    return w',
    tips: [
      'Discuss learning rate scheduling',
      'Mention momentum and Adam optimizer',
      'Talk about convergence criteria'
    ]
  },
  {
    id: 'code-3',
    question: 'Implement k-means clustering from scratch.',
    category: 'Coding',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple'],
    answer: 'def kmeans(X, k, max_iters=100):\n    centroids = X[np.random.choice(len(X), k, replace=False)]\n    for _ in range(max_iters):\n        # Assign clusters\n        distances = np.linalg.norm(X[:, None] - centroids, axis=2)\n        labels = np.argmin(distances, axis=1)\n        # Update centroids\n        new_centroids = np.array([X[labels==i].mean(axis=0) for i in range(k)])\n        if np.allclose(centroids, new_centroids):\n            break\n        centroids = new_centroids\n    return labels, centroids',
    tips: [
      'Discuss initialization methods (k-means++)',
      'Mention convergence criteria',
      'Talk about choosing k (elbow method)'
    ]
  },

  // BEHAVIORAL
  {
    id: 'beh-1',
    question: 'Tell me about a time when a machine learning model you built failed in production.',
    category: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    answer: 'Use STAR method: Situation - deployed recommendation model, Task - maintain accuracy, Action - discovered data drift, implemented monitoring, retrained model, Result - improved accuracy by 15%, learned importance of continuous monitoring. Key: show problem-solving, learning, and impact.',
    tips: [
      'Be honest about failures',
      'Focus on what you learned',
      'Quantify impact and improvements'
    ]
  },
  {
    id: 'beh-2',
    question: 'How do you stay updated with the latest AI/ML research?',
    category: 'Behavioral',
    difficulty: 'Easy',
    companies: ['Google', 'OpenAI', 'Meta', 'DeepMind'],
    answer: 'Multiple sources: 1) ArXiv papers (daily digest), 2) Conferences (NeurIPS, ICML, CVPR), 3) Twitter/X AI community, 4) Blogs (Distill, OpenAI), 5) Podcasts (Lex Fridman), 6) Implement papers, 7) Participate in Kaggle. Balance breadth and depth - skim many, deep dive few. Apply learnings to projects.',
    tips: [
      'Mention specific papers you\'ve read recently',
      'Discuss how you evaluate research quality',
      'Show you implement, not just read'
    ]
  },
  {
    id: 'beh-3',
    question: 'Describe a time you had to explain a complex ML concept to non-technical stakeholders.',
    category: 'Behavioral',
    difficulty: 'Medium',
    companies: ['Microsoft', 'Amazon', 'Google', 'Apple'],
    answer: 'STAR: Situation - needed buy-in for ML project, Task - explain ROI, Action - used analogies (ML like teaching a child), visualizations, focused on business impact not algorithms, Result - got approval and budget. Key: know your audience, use analogies, focus on outcomes.',
    tips: [
      'Prepare analogies for common ML concepts',
      'Practice explaining without jargon',
      'Focus on business value'
    ]
  },

  // COMPANY CULTURE
  {
    id: 'cult-1',
    question: 'Why do you want to work on AI/ML?',
    category: 'Company Culture',
    difficulty: 'Easy',
    companies: ['Google', 'OpenAI', 'Meta', 'Microsoft'],
    answer: 'Genuine passion: 1) Transformative impact on society, 2) Intellectually challenging, 3) Rapid innovation, 4) Solve real problems at scale. Personal story: specific project or experience that sparked interest. Company fit: align with their mission (e.g., OpenAI - AGI safety, Google - organizing world\'s information).',
    tips: [
      'Be authentic and specific',
      'Connect to company\'s mission',
      'Show long-term commitment'
    ]
  },
  {
    id: 'cult-2',
    question: 'What are the ethical considerations in AI development?',
    category: 'Company Culture',
    difficulty: 'Medium',
    companies: ['OpenAI', 'Anthropic', 'Google', 'Microsoft'],
    answer: 'Key concerns: 1) Bias and fairness, 2) Privacy, 3) Transparency and explainability, 4) Job displacement, 5) Dual use (weapons), 6) Environmental impact, 7) AGI safety. Mitigation: diverse teams, bias testing, privacy-preserving techniques, responsible disclosure, stakeholder engagement. Show awareness and proactive thinking.',
    tips: [
      'Mention specific examples (facial recognition bias)',
      'Discuss trade-offs (accuracy vs fairness)',
      'Show you think beyond technical aspects'
    ]
  },
];

export const CATEGORIES = [
  'Machine Learning',
  'Deep Learning',
  'NLP & LLMs',
  'System Design',
  'Coding',
  'Behavioral',
  'Company Culture'
];
