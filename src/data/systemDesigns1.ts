// Part 1: Real-world system designs from tech giants (70 designs)
export interface SystemDesign {
  id: string;
  name: string;
  company: string;
  category: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Very High';
  description: string;
  components: string[];
  scale: string;
  keyTechnologies: string[];
  challenges: string[];
  diagram: string;
  howItWorks?: string;
}

export const SYSTEM_DESIGNS_PART1: SystemDesign[] = [
  // GOOGLE SYSTEMS
  {
    id: 'google-1',
    name: 'Google Search',
    company: 'Google',
    category: 'Search & Indexing',
    complexity: 'Very High',
    description: 'Distributed web search engine processing billions of queries daily with sub-second latency.',
    components: ['Web Crawler', 'Indexer', 'Query Processor', 'Ranking Algorithm', 'Cache Layer', 'CDN'],
    scale: '8.5 billion searches/day, 100+ petabytes indexed',
    keyTechnologies: ['MapReduce', 'Bigtable', 'Colossus', 'PageRank', 'BERT'],
    challenges: ['Real-time indexing', 'Query understanding', 'Spam detection', 'Personalization'],
    diagram: `flowchart LR\n    A[User Query] --> B[Query Processor]\n    B --> C[Index Servers]\n    C --> D[Ranking]\n    D --> E[Cache]\n    E --> F[Results]`
  },
  {
    id: 'google-2',
    name: 'YouTube Video Streaming',
    company: 'Google',
    category: 'Video Streaming',
    complexity: 'Very High',
    description: 'Global video platform serving 1 billion hours of video daily with adaptive bitrate streaming.',
    components: ['Upload Service', 'Transcoding Pipeline', 'CDN', 'Recommendation Engine', 'Analytics'],
    scale: '500 hours uploaded/minute, 2 billion users',
    keyTechnologies: ['VP9/AV1 Codec', 'DASH', 'ML Recommendations', 'Bigtable', 'Spanner'],
    challenges: ['Real-time transcoding', 'Global CDN', 'Copyright detection', 'Bandwidth optimization'],
    diagram: `flowchart TD\n    A[Upload] --> B[Transcoding]\n    B --> C[Storage]\n    C --> D[CDN]\n    D --> E[Adaptive Streaming]\n    E --> F[User]`
  },
  {
    id: 'google-3',
    name: 'Gmail',
    company: 'Google',
    category: 'Email Service',
    complexity: 'Very High',
    description: 'Distributed email system with 1.8 billion users, spam filtering, and search capabilities.',
    components: ['SMTP Gateway', 'Storage Layer', 'Search Index', 'Spam Filter', 'Sync Service'],
    scale: '1.8 billion users, 300+ billion emails/day',
    keyTechnologies: ['Bigtable', 'Colossus', 'TensorFlow (spam)', 'Protocol Buffers'],
    challenges: ['Spam detection', 'Storage efficiency', 'Real-time sync', 'Search performance'],
    diagram: `flowchart LR\n    A[Email] --> B[Spam Filter]\n    B --> C[Storage]\n    C --> D[Index]\n    D --> E[Search]\n    E --> F[User]`
  },
  {
    id: 'google-4',
    name: 'Google Maps',
    company: 'Google',
    category: 'Geospatial',
    complexity: 'Very High',
    description: 'Real-time navigation and mapping service with traffic data and route optimization.',
    components: ['Map Tiles', 'Routing Engine', 'Traffic Analysis', 'Places DB', 'Street View'],
    scale: '1 billion users, 25 million miles mapped',
    keyTechnologies: ['S2 Geometry', 'Dijkstra/A*', 'ML Traffic Prediction', 'WebGL'],
    challenges: ['Real-time traffic', 'Route optimization', 'Map updates', 'Offline support'],
    diagram: `flowchart TD\n    A[User Location] --> B[Routing Engine]\n    B --> C[Traffic Data]\n    C --> D[Route Optimization]\n    D --> E[Navigation]`
  },
  {
    id: 'google-5',
    name: 'Google Drive',
    company: 'Google',
    category: 'Cloud Storage',
    complexity: 'High',
    description: 'Cloud storage and collaboration platform with real-time document editing.',
    components: ['Upload Service', 'Storage Layer', 'Sync Engine', 'Collaboration Service', 'Search'],
    scale: '1 billion users, exabytes of data',
    keyTechnologies: ['Colossus', 'Operational Transform', 'Delta Sync', 'Bigtable'],
    challenges: ['Conflict resolution', 'Real-time collaboration', 'Offline sync', 'Version control'],
    diagram: `flowchart LR\n    A[Client] --> B[Sync Engine]\n    B --> C[Storage]\n    C --> D[Collaboration]\n    D --> E[Real-time Updates]`
  },

  // MICROSOFT SYSTEMS
  {
    id: 'microsoft-1',
    name: 'Azure OpenAI Service',
    company: 'Microsoft',
    category: 'AI Platform',
    complexity: 'Very High',
    description: 'Enterprise-grade LLM API service with GPT-4, content filtering, and compliance.',
    components: ['Model Serving', 'Rate Limiter', 'Content Filter', 'Monitoring', 'Billing'],
    scale: 'Millions of requests/day, multi-region',
    keyTechnologies: ['GPT-4', 'ONNX Runtime', 'Azure ML', 'Kubernetes', 'Redis'],
    challenges: ['Model serving latency', 'Content safety', 'Cost optimization', 'Multi-tenancy'],
    diagram: `flowchart TD\n    A[API Request] --> B[Rate Limiter]\n    B --> C[Content Filter]\n    C --> D[Model Serving]\n    D --> E[Response Filter]\n    E --> F[Client]`
  },
  {
    id: 'microsoft-2',
    name: 'Microsoft Teams',
    company: 'Microsoft',
    category: 'Communication',
    complexity: 'Very High',
    description: 'Real-time collaboration platform with video, chat, and file sharing for 300M users.',
    components: ['Chat Service', 'Video Conferencing', 'File Storage', 'Presence Service', 'Notifications'],
    scale: '300 million users, billions of messages/day',
    keyTechnologies: ['WebRTC', 'SignalR', 'Azure Cosmos DB', 'Azure Storage', 'Azure CDN'],
    challenges: ['Real-time messaging', 'Video quality', 'Presence sync', 'Cross-platform'],
    diagram: `flowchart LR\n    A[User] --> B[Chat Service]\n    B --> C[Message Queue]\n    C --> D[Storage]\n    D --> E[Sync Service]\n    E --> F[Recipients]`
  },
  {
    id: 'microsoft-3',
    name: 'Xbox Live',
    company: 'Microsoft',
    category: 'Gaming',
    complexity: 'Very High',
    description: 'Global gaming network with matchmaking, achievements, and social features.',
    components: ['Matchmaking', 'Achievement Service', 'Social Graph', 'Game State Sync', 'CDN'],
    scale: '100+ million users, real-time gaming',
    keyTechnologies: ['Azure PlayFab', 'TrueSkill', 'Azure Cosmos DB', 'SignalR'],
    challenges: ['Low latency matchmaking', 'Cheat detection', 'Global sync', 'DDoS protection'],
    diagram: `flowchart TD\n    A[Player] --> B[Matchmaking]\n    B --> C[Game Server]\n    C --> D[State Sync]\n    D --> E[Achievement Service]`
  },
  {
    id: 'microsoft-4',
    name: 'Bing Search',
    company: 'Microsoft',
    category: 'Search & Indexing',
    complexity: 'Very High',
    description: 'Web search engine with AI-powered results and ChatGPT integration.',
    components: ['Web Crawler', 'Indexer', 'Query Processor', 'Ranking', 'AI Chat Integration'],
    scale: 'Billions of queries/month, petabytes indexed',
    keyTechnologies: ['Cosmos DB', 'Azure ML', 'GPT-4', 'RankNet', 'BERT'],
    challenges: ['Real-time indexing', 'AI integration', 'Query understanding', 'Spam detection'],
    diagram: `flowchart LR\n    A[Query] --> B[Query Processor]\n    B --> C[Index]\n    C --> D[Ranking]\n    D --> E[AI Enhancement]\n    E --> F[Results]`
  },
  {
    id: 'microsoft-5',
    name: 'OneDrive',
    company: 'Microsoft',
    category: 'Cloud Storage',
    complexity: 'High',
    description: 'Cloud storage with file sync, sharing, and Office integration.',
    components: ['Upload Service', 'Storage Layer', 'Sync Engine', 'Sharing Service', 'Search'],
    scale: '250+ million users, exabytes of data',
    keyTechnologies: ['Azure Storage', 'Delta Sync', 'Azure CDN', 'Cosmos DB'],
    challenges: ['Conflict resolution', 'Offline sync', 'Large file handling', 'Version control'],
    diagram: `flowchart TD\n    A[Client] --> B[Sync Engine]\n    B --> C[Storage]\n    C --> D[CDN]\n    D --> E[Sharing Service]`
  },

  // AMAZON/AWS SYSTEMS
  {
    id: 'amazon-1',
    name: 'Amazon.com E-commerce',
    company: 'Amazon',
    category: 'E-commerce',
    complexity: 'Very High',
    description: 'Global e-commerce platform with product catalog, recommendations, and checkout.',
    components: ['Product Catalog', 'Search', 'Recommendation Engine', 'Cart Service', 'Payment Gateway'],
    scale: '300+ million customers, billions of items',
    keyTechnologies: ['DynamoDB', 'ElastiCache', 'SageMaker', 'Lambda', 'CloudFront'],
    challenges: ['Inventory management', 'Personalization', 'Fraud detection', 'Peak traffic'],
    diagram: `flowchart LR\n    A[User] --> B[Search/Browse]\n    B --> C[Recommendations]\n    C --> D[Cart]\n    D --> E[Checkout]\n    E --> F[Order Processing]`
  },
  {
    id: 'amazon-2',
    name: 'AWS Lambda',
    company: 'Amazon',
    category: 'Serverless',
    complexity: 'Very High',
    description: 'Serverless compute platform executing millions of functions with auto-scaling.',
    components: ['Function Registry', 'Execution Environment', 'Event Sources', 'Scaling Manager', 'Monitoring'],
    scale: 'Trillions of invocations/month',
    keyTechnologies: ['Firecracker', 'EC2', 'S3', 'CloudWatch', 'API Gateway'],
    challenges: ['Cold start optimization', 'Resource isolation', 'Auto-scaling', 'Cost optimization'],
    diagram: `flowchart TD\n    A[Event] --> B[Trigger]\n    B --> C[Function Execution]\n    C --> D[Auto-scaling]\n    D --> E[Response]`
  },
  {
    id: 'amazon-3',
    name: 'Amazon Prime Video',
    company: 'Amazon',
    category: 'Video Streaming',
    complexity: 'Very High',
    description: 'Video streaming platform with live and on-demand content for 200M+ subscribers.',
    components: ['Content Ingestion', 'Transcoding', 'CDN', 'DRM', 'Recommendation Engine'],
    scale: '200+ million subscribers, global streaming',
    keyTechnologies: ['AWS MediaConvert', 'CloudFront', 'DynamoDB', 'SageMaker'],
    challenges: ['Live streaming', 'DRM', 'Bandwidth optimization', 'Content delivery'],
    diagram: `flowchart LR\n    A[Content] --> B[Transcoding]\n    B --> C[Storage]\n    C --> D[CDN]\n    D --> E[Adaptive Streaming]\n    E --> F[User]`
  },
  {
    id: 'amazon-4',
    name: 'Amazon Alexa',
    company: 'Amazon',
    category: 'Voice AI',
    complexity: 'Very High',
    description: 'Voice assistant with speech recognition, NLU, and smart home integration.',
    components: ['Speech Recognition', 'NLU', 'Skills Platform', 'TTS', 'Smart Home Hub'],
    scale: '100+ million devices, billions of interactions',
    keyTechnologies: ['Deep Learning ASR', 'LSTM NLU', 'Lambda', 'DynamoDB', 'IoT Core'],
    challenges: ['Wake word detection', 'Multi-language support', 'Privacy', 'Low latency'],
    diagram: `flowchart TD\n    A[Voice Input] --> B[ASR]\n    B --> C[NLU]\n    C --> D[Skills]\n    D --> E[TTS]\n    E --> F[Response]`
  },
  {
    id: 'amazon-5',
    name: 'AWS S3',
    company: 'Amazon',
    category: 'Object Storage',
    complexity: 'Very High',
    description: 'Distributed object storage with 99.999999999% durability and infinite scalability.',
    components: ['API Gateway', 'Storage Nodes', 'Metadata Service', 'Replication', 'Lifecycle Manager'],
    scale: 'Trillions of objects, exabytes of data',
    keyTechnologies: ['Distributed Hash Table', 'Erasure Coding', 'Multi-AZ Replication'],
    challenges: ['Durability', 'Consistency', 'Performance', 'Cost optimization'],
    diagram: `flowchart LR\n    A[Upload] --> B[API Gateway]\n    B --> C[Storage Nodes]\n    C --> D[Replication]\n    D --> E[Metadata Service]`
  },

  // META/FACEBOOK SYSTEMS
  {
    id: 'meta-1',
    name: 'Facebook News Feed',
    company: 'Meta',
    category: 'Social Media',
    complexity: 'Very High',
    description: 'Personalized content feed using ML ranking for 3 billion users.',
    components: ['Content Ingestion', 'Ranking Model', 'Cache Layer', 'Real-time Updates', 'Ad System'],
    scale: '3 billion users, billions of posts/day',
    keyTechnologies: ['PyTorch', 'TAO (cache)', 'MySQL', 'Memcached', 'Thrift'],
    challenges: ['Real-time ranking', 'Personalization', 'Content moderation', 'Ad integration'],
    diagram: `flowchart TD\n    A[User] --> B[Feed Request]\n    B --> C[Ranking Model]\n    C --> D[Cache]\n    D --> E[Real-time Updates]\n    E --> F[Feed]`
  },
  {
    id: 'meta-2',
    name: 'WhatsApp Messaging',
    company: 'Meta',
    category: 'Messaging',
    complexity: 'Very High',
    description: 'End-to-end encrypted messaging for 2 billion users with high reliability.',
    components: ['Message Router', 'Encryption Service', 'Storage', 'Delivery Service', 'Media Server'],
    scale: '2 billion users, 100 billion messages/day',
    keyTechnologies: ['Erlang', 'Signal Protocol', 'FreeBSD', 'MySQL', 'Cassandra'],
    challenges: ['E2E encryption', 'Message delivery', 'Offline support', 'Media handling'],
    diagram: `flowchart LR\n    A[Sender] --> B[Encryption]\n    B --> C[Message Router]\n    C --> D[Storage]\n    D --> E[Delivery]\n    E --> F[Recipient]`
  },
  {
    id: 'meta-3',
    name: 'Instagram Feed & Stories',
    company: 'Meta',
    category: 'Social Media',
    complexity: 'Very High',
    description: 'Photo/video sharing with ML-powered feed ranking and ephemeral stories.',
    components: ['Upload Service', 'Image Processing', 'Feed Ranking', 'Stories Service', 'CDN'],
    scale: '2 billion users, 95 million posts/day',
    keyTechnologies: ['Django', 'PostgreSQL', 'Cassandra', 'PyTorch', 'CDN'],
    challenges: ['Image optimization', 'Real-time stories', 'Feed ranking', 'Content moderation'],
    diagram: `flowchart TD\n    A[Upload] --> B[Processing]\n    B --> C[Storage]\n    C --> D[Feed Ranking]\n    D --> E[CDN]\n    E --> F[User]`
  },
  {
    id: 'meta-4',
    name: 'Meta AI (LLaMA)',
    company: 'Meta',
    category: 'AI Platform',
    complexity: 'Very High',
    description: 'Large language model training and inference infrastructure.',
    components: ['Training Cluster', 'Model Registry', 'Inference Service', 'Fine-tuning Pipeline', 'Evaluation'],
    scale: 'Billions of parameters, thousands of GPUs',
    keyTechnologies: ['PyTorch', 'FSDP', 'NCCL', 'RoCE', 'ZeRO'],
    challenges: ['Distributed training', 'Model serving', 'Fine-tuning', 'Cost optimization'],
    diagram: `flowchart LR\n    A[Data] --> B[Training Cluster]\n    B --> C[Model Registry]\n    C --> D[Inference Service]\n    D --> E[API]`
  },
  {
    id: 'meta-5',
    name: 'Facebook Marketplace',
    company: 'Meta',
    category: 'E-commerce',
    complexity: 'High',
    description: 'Peer-to-peer marketplace with search, recommendations, and messaging.',
    components: ['Listing Service', 'Search Engine', 'Recommendation', 'Messaging', 'Payment'],
    scale: '1 billion users, millions of listings',
    keyTechnologies: ['MySQL', 'Elasticsearch', 'PyTorch', 'GraphQL', 'React'],
    challenges: ['Search relevance', 'Fraud detection', 'Trust & safety', 'Local discovery'],
    diagram: `flowchart TD\n    A[Listing] --> B[Search Index]\n    B --> C[Recommendations]\n    C --> D[User Discovery]\n    D --> E[Messaging]`
  },

  // NETFLIX SYSTEMS
  {
    id: 'netflix-1',
    name: 'Netflix Streaming',
    company: 'Netflix',
    category: 'Video Streaming',
    complexity: 'Very High',
    description: 'Global video streaming with adaptive bitrate and personalized recommendations.',
    components: ['Content Delivery', 'Encoding Pipeline', 'Recommendation Engine', 'Playback Service', 'CDN'],
    scale: '230+ million subscribers, 1 billion hours/week',
    keyTechnologies: ['AWS', 'Open Connect CDN', 'Cassandra', 'Spark', 'TensorFlow'],
    challenges: ['Global CDN', 'Encoding optimization', 'Personalization', 'Bandwidth management'],
    diagram: `flowchart LR\n    A[Content] --> B[Encoding]\n    B --> C[CDN]\n    C --> D[Adaptive Streaming]\n    D --> E[User]\n    E --> F[Recommendations]`
  },
  {
    id: 'netflix-2',
    name: 'Netflix Recommendation System',
    company: 'Netflix',
    category: 'ML System',
    complexity: 'Very High',
    description: 'Personalized content recommendations using collaborative filtering and deep learning.',
    components: ['User Behavior Tracking', 'Feature Engineering', 'Model Training', 'Serving', 'A/B Testing'],
    scale: '230+ million users, billions of interactions',
    keyTechnologies: ['Spark', 'TensorFlow', 'Cassandra', 'EVCache', 'Zuul'],
    challenges: ['Cold start', 'Real-time updates', 'Diversity', 'Explainability'],
    diagram: `flowchart TD\n    A[User Behavior] --> B[Feature Engineering]\n    B --> C[Model Training]\n    C --> D[Model Serving]\n    D --> E[Recommendations]`
  },
  {
    id: 'netflix-3',
    name: 'Netflix Chaos Engineering',
    company: 'Netflix',
    category: 'Reliability',
    complexity: 'High',
    description: 'Chaos Monkey and Simian Army for testing system resilience.',
    components: ['Chaos Monkey', 'Latency Monkey', 'Conformity Monkey', 'Monitoring', 'Alerting'],
    scale: 'Production environment testing',
    keyTechnologies: ['Spinnaker', 'Atlas', 'AWS', 'Hystrix', 'Eureka'],
    challenges: ['Safe chaos injection', 'Blast radius control', 'Automated recovery', 'Metrics'],
    diagram: `flowchart TD\n    A[Chaos Injection] --> B[System Under Test]\n    B --> C[Monitoring]\n    C --> D[Alerting]\n    D --> E[Recovery]`
  },

  // ANTHROPIC SYSTEMS
  {
    id: 'anthropic-1',
    name: 'Claude API',
    company: 'Anthropic',
    category: 'AI Platform',
    complexity: 'Very High',
    description: 'Constitutional AI-based LLM API with safety guardrails and long context.',
    components: ['Model Serving', 'Safety Filters', 'Context Management', 'Rate Limiting', 'Monitoring'],
    scale: 'Millions of requests/day, 200K context window',
    keyTechnologies: ['Constitutional AI', 'RLHF', 'Kubernetes', 'Redis', 'Prometheus'],
    challenges: ['Safety alignment', 'Long context handling', 'Latency optimization', 'Cost management'],
    diagram: `flowchart TD\n    A[API Request] --> B[Safety Filter]\n    B --> C[Context Management]\n    C --> D[Model Serving]\n    D --> E[Response Filter]\n    E --> F[Client]`
  },
  {
    id: 'anthropic-2',
    name: 'Claude Training Pipeline',
    company: 'Anthropic',
    category: 'AI Training',
    complexity: 'Very High',
    description: 'Large-scale LLM training with Constitutional AI and RLHF.',
    components: ['Data Pipeline', 'Pre-training', 'RLHF', 'Constitutional AI', 'Evaluation'],
    scale: 'Billions of parameters, thousands of GPUs',
    keyTechnologies: ['PyTorch', 'DeepSpeed', 'Ray', 'Weights & Biases', 'Kubernetes'],
    challenges: ['Training stability', 'Alignment', 'Evaluation', 'Compute efficiency'],
    diagram: `flowchart LR\n    A[Data] --> B[Pre-training]\n    B --> C[RLHF]\n    C --> D[Constitutional AI]\n    D --> E[Evaluation]\n    E --> F[Deployment]`
  },

  // ORACLE SYSTEMS
  {
    id: 'oracle-1',
    name: 'Oracle Database',
    company: 'Oracle',
    category: 'Database',
    complexity: 'Very High',
    description: 'Enterprise RDBMS with ACID guarantees, RAC, and autonomous features.',
    components: ['Query Optimizer', 'Storage Engine', 'RAC', 'Data Guard', 'Autonomous Features'],
    scale: 'Petabytes of data, millions of transactions/sec',
    keyTechnologies: ['RAC', 'ASM', 'Data Guard', 'Exadata', 'Machine Learning'],
    challenges: ['High availability', 'Performance tuning', 'Scalability', 'Security'],
    diagram: `flowchart TD\n    A[Query] --> B[Optimizer]\n    B --> C[Execution Engine]\n    C --> D[Storage]\n    D --> E[RAC Sync]\n    E --> F[Response]`
  },
  {
    id: 'oracle-2',
    name: 'Oracle Cloud Infrastructure',
    company: 'Oracle',
    category: 'Cloud Platform',
    complexity: 'Very High',
    description: 'Enterprise cloud platform with compute, storage, networking, and AI services.',
    components: ['Compute', 'Block Storage', 'Object Storage', 'Networking', 'AI Services'],
    scale: 'Global data centers, enterprise workloads',
    keyTechnologies: ['Bare Metal', 'RDMA', 'NVMe', 'Kubernetes', 'Terraform'],
    challenges: ['Performance', 'Security', 'Compliance', 'Multi-tenancy'],
    diagram: `flowchart LR\n    A[User] --> B[IAM]\n    B --> C[Compute]\n    C --> D[Storage]\n    D --> E[Networking]\n    E --> F[Services]`
  },

  // OPENAI SYSTEMS
  {
    id: 'openai-1',
    name: 'ChatGPT',
    company: 'OpenAI',
    category: 'AI Application',
    complexity: 'Very High',
    description: 'Conversational AI with GPT-4, plugins, and multi-modal capabilities.',
    components: ['Model Serving', 'Conversation Management', 'Plugin System', 'Moderation', 'Memory'],
    scale: '100+ million users, billions of messages',
    keyTechnologies: ['GPT-4', 'Kubernetes', 'Redis', 'PostgreSQL', 'Azure'],
    challenges: ['Conversation context', 'Plugin safety', 'Moderation', 'Scaling'],
    diagram: `flowchart TD\n    A[User Message] --> B[Context Management]\n    B --> C[GPT-4]\n    C --> D[Plugin Execution]\n    D --> E[Moderation]\n    E --> F[Response]`
  },
  {
    id: 'openai-2',
    name: 'DALL-E Image Generation',
    company: 'OpenAI',
    category: 'Generative AI',
    complexity: 'Very High',
    description: 'Text-to-image generation using diffusion models.',
    components: ['Text Encoder', 'Diffusion Model', 'Image Decoder', 'Safety Filter', 'Queue System'],
    scale: 'Millions of images generated/day',
    keyTechnologies: ['Diffusion Models', 'CLIP', 'GPUs', 'Kubernetes', 'Redis Queue'],
    challenges: ['Generation quality', 'Safety filtering', 'Compute cost', 'Latency'],
    diagram: `flowchart LR\n    A[Text Prompt] --> B[Text Encoder]\n    B --> C[Diffusion Model]\n    C --> D[Image Decoder]\n    D --> E[Safety Filter]\n    E --> F[Image]`
  },
  {
    id: 'openai-3',
    name: 'OpenAI API Platform',
    company: 'OpenAI',
    category: 'AI Platform',
    complexity: 'Very High',
    description: 'API platform serving GPT models with rate limiting, billing, and monitoring.',
    components: ['API Gateway', 'Model Serving', 'Rate Limiter', 'Billing', 'Analytics'],
    scale: 'Billions of API calls/month',
    keyTechnologies: ['GPT-4', 'Kubernetes', 'Redis', 'Stripe', 'Datadog'],
    challenges: ['Rate limiting', 'Cost attribution', 'Model versioning', 'Abuse prevention'],
    diagram: `flowchart TD\n    A[API Request] --> B[Auth & Rate Limit]\n    B --> C[Model Router]\n    C --> D[Model Serving]\n    D --> E[Billing]\n    E --> F[Response]`
  },
];

export const CATEGORIES_PART1 = [
  'Search & Indexing',
  'Video Streaming',
  'Email Service',
  'Geospatial',
  'Cloud Storage',
  'AI Platform',
  'Communication',
  'Gaming',
  'E-commerce',
  'Serverless',
  'Voice AI',
  'Object Storage',
  'Social Media',
  'Messaging',
  'ML System',
  'Reliability',
  'AI Training',
  'Database',
  'Cloud Platform',
  'AI Application',
  'Generative AI'
];
