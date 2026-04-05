// Part 3: Additional real-world system designs (60+ designs)
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
}

export const SYSTEM_DESIGNS_PART3: SystemDesign[] = [
  // TESLA SYSTEMS
  {
    id: 'tesla-1',
    name: 'Tesla Autopilot',
    company: 'Tesla',
    category: 'Autonomous Driving',
    complexity: 'Very High',
    description: 'Self-driving system with computer vision, sensor fusion, and path planning.',
    components: ['Camera System', 'Sensor Fusion', 'Perception', 'Path Planning', 'Control'],
    scale: 'Millions of vehicles, billions of miles',
    keyTechnologies: ['Neural Networks', 'Computer Vision', 'Sensor Fusion', 'Real-time Processing'],
    challenges: ['Safety', 'Edge cases', 'Real-time processing', 'Weather conditions'],
    diagram: `flowchart LR\n    A[Sensors] --> B[Perception]\n    B --> C[Sensor Fusion]\n    C --> D[Path Planning]\n    D --> E[Control]\n    E --> F[Vehicle]`
  },
  {
    id: 'tesla-2',
    name: 'Tesla Fleet Learning',
    company: 'Tesla',
    category: 'ML Training',
    complexity: 'Very High',
    description: 'Distributed learning from millions of vehicles to improve Autopilot.',
    components: ['Data Collection', 'Data Pipeline', 'Training Cluster', 'Model Deployment', 'OTA Updates'],
    scale: 'Millions of vehicles, petabytes of data',
    keyTechnologies: ['PyTorch', 'Distributed Training', 'Edge Computing', 'OTA Updates'],
    challenges: ['Data privacy', 'Training scale', 'Model deployment', 'Edge cases'],
    diagram: `flowchart TD\n    A[Fleet Data] --> B[Data Pipeline]\n    B --> C[Training]\n    C --> D[Model Registry]\n    D --> E[OTA Update]\n    E --> F[Vehicles]`
  },

  // DATABRICKS SYSTEMS
  {
    id: 'databricks-1',
    name: 'Databricks Lakehouse',
    company: 'Databricks',
    category: 'Data Platform',
    complexity: 'Very High',
    description: 'Unified data platform combining data lake and warehouse capabilities.',
    components: ['Delta Lake', 'Spark Engine', 'ML Runtime', 'SQL Analytics', 'Unity Catalog'],
    scale: 'Petabytes of data, thousands of clusters',
    keyTechnologies: ['Apache Spark', 'Delta Lake', 'MLflow', 'Photon Engine'],
    challenges: ['ACID transactions', 'Performance', 'Governance', 'Multi-cloud'],
    diagram: `flowchart LR\n    A[Data Sources] --> B[Delta Lake]\n    B --> C[Spark Processing]\n    C --> D[ML/Analytics]\n    D --> E[Insights]`
  },

  // SNOWFLAKE SYSTEMS
  {
    id: 'snowflake-1',
    name: 'Snowflake Data Warehouse',
    company: 'Snowflake',
    category: 'Data Warehouse',
    complexity: 'Very High',
    description: 'Cloud data warehouse with separation of storage and compute.',
    components: ['Storage Layer', 'Compute Layer', 'Cloud Services', 'Query Optimizer', 'Data Sharing'],
    scale: 'Exabytes of data, thousands of customers',
    keyTechnologies: ['Columnar Storage', 'Micro-partitions', 'Time Travel', 'Zero-copy Cloning'],
    challenges: ['Query optimization', 'Concurrency', 'Cost management', 'Data sharing'],
    diagram: `flowchart TD\n    A[Query] --> B[Cloud Services]\n    B --> C[Compute Cluster]\n    C --> D[Storage Layer]\n    D --> E[Results]`
  },

  // CLOUDFLARE SYSTEMS
  {
    id: 'cloudflare-1',
    name: 'Cloudflare CDN',
    company: 'Cloudflare',
    category: 'CDN',
    complexity: 'Very High',
    description: 'Global CDN with DDoS protection and edge computing.',
    components: ['Edge Network', 'Cache', 'DDoS Protection', 'Workers', 'DNS'],
    scale: '300+ cities, 25% of internet traffic',
    keyTechnologies: ['Anycast', 'Edge Computing', 'V8 Isolates', 'QUIC'],
    challenges: ['DDoS mitigation', 'Global routing', 'Edge performance', 'Security'],
    diagram: `flowchart LR\n    A[Request] --> B[Edge Network]\n    B --> C[Cache/Workers]\n    C --> D[Origin]\n    D --> E[Response]`
  },

  // MONGODB SYSTEMS
  {
    id: 'mongodb-1',
    name: 'MongoDB Atlas',
    company: 'MongoDB',
    category: 'Database',
    complexity: 'High',
    description: 'Managed NoSQL database with auto-scaling and global distribution.',
    components: ['Replica Sets', 'Sharding', 'Atlas Search', 'Data Lake', 'Charts'],
    scale: 'Millions of databases, multi-cloud',
    keyTechnologies: ['WiredTiger', 'Raft Consensus', 'Lucene', 'S3'],
    challenges: ['Sharding', 'Consistency', 'Performance', 'Multi-cloud'],
    diagram: `flowchart TD\n    A[Application] --> B[Router]\n    B --> C[Shards]\n    C --> D[Replica Sets]\n    D --> E[Storage]`
  },

  // ELASTIC SYSTEMS
  {
    id: 'elastic-1',
    name: 'Elasticsearch',
    company: 'Elastic',
    category: 'Search Engine',
    complexity: 'High',
    description: 'Distributed search and analytics engine.',
    components: ['Indexing', 'Search', 'Aggregations', 'ML', 'Kibana'],
    scale: 'Petabytes indexed, millions of queries/sec',
    keyTechnologies: ['Lucene', 'Inverted Index', 'Distributed Computing'],
    challenges: ['Relevance', 'Scale', 'Real-time indexing', 'Cluster management'],
    diagram: `flowchart LR\n    A[Documents] --> B[Indexing]\n    B --> C[Shards]\n    C --> D[Search]\n    D --> E[Results]`
  },

  // CONFLUENT/KAFKA SYSTEMS
  {
    id: 'confluent-1',
    name: 'Kafka Streaming Platform',
    company: 'Confluent',
    category: 'Streaming',
    complexity: 'High',
    description: 'Distributed event streaming platform for real-time data pipelines.',
    components: ['Brokers', 'Producers', 'Consumers', 'Connect', 'Streams'],
    scale: 'Trillions of messages/day',
    keyTechnologies: ['Kafka', 'ZooKeeper/KRaft', 'Schema Registry', 'ksqlDB'],
    challenges: ['Ordering guarantees', 'Exactly-once semantics', 'Replication', 'Performance'],
    diagram: `flowchart LR\n    A[Producers] --> B[Kafka Brokers]\n    B --> C[Topics/Partitions]\n    C --> D[Consumers]\n    D --> E[Applications]`
  },

  // DATADOG SYSTEMS
  {
    id: 'datadog-1',
    name: 'Datadog Monitoring',
    company: 'Datadog',
    category: 'Observability',
    complexity: 'High',
    description: 'Full-stack monitoring and analytics platform.',
    components: ['Metrics Collection', 'Log Aggregation', 'APM', 'Alerting', 'Dashboards'],
    scale: 'Trillions of data points/day',
    keyTechnologies: ['Time Series DB', 'Distributed Tracing', 'Log Processing'],
    challenges: ['Data volume', 'Query performance', 'Cardinality', 'Real-time alerting'],
    diagram: `flowchart TD\n    A[Agents] --> B[Collection]\n    B --> C[Processing]\n    C --> D[Storage]\n    D --> E[Query/Alert]\n    E --> F[Dashboards]`
  },

  // HASHICORP SYSTEMS
  {
    id: 'hashicorp-1',
    name: 'Terraform Cloud',
    company: 'HashiCorp',
    category: 'Infrastructure',
    complexity: 'High',
    description: 'Infrastructure as code platform with state management and collaboration.',
    components: ['State Management', 'Plan/Apply', 'Policy Engine', 'VCS Integration', 'Registry'],
    scale: 'Millions of resources managed',
    keyTechnologies: ['Go', 'HCL', 'Sentinel', 'PostgreSQL'],
    challenges: ['State locking', 'Concurrency', 'Provider ecosystem', 'Security'],
    diagram: `flowchart LR\n    A[Config] --> B[Plan]\n    B --> C[Policy Check]\n    C --> D[Apply]\n    D --> E[State]\n    E --> F[Infrastructure]`
  },

  // ATLASSIAN SYSTEMS
  {
    id: 'atlassian-1',
    name: 'Jira Project Management',
    company: 'Atlassian',
    category: 'Project Management',
    complexity: 'High',
    description: 'Issue tracking and project management platform.',
    components: ['Issue Tracking', 'Workflow Engine', 'Search', 'Reporting', 'Integrations'],
    scale: '200K+ customers, millions of users',
    keyTechnologies: ['Java', 'PostgreSQL', 'Elasticsearch', 'React'],
    challenges: ['Customization', 'Performance', 'Search', 'Integrations'],
    diagram: `flowchart TD\n    A[Issue] --> B[Workflow]\n    B --> C[Storage]\n    C --> D[Search Index]\n    D --> E[Reporting]`
  },

  // NVIDIA SYSTEMS
  {
    id: 'nvidia-1',
    name: 'NVIDIA AI Platform',
    company: 'NVIDIA',
    category: 'AI Infrastructure',
    complexity: 'Very High',
    description: 'GPU-accelerated AI training and inference platform.',
    components: ['GPU Clusters', 'CUDA', 'cuDNN', 'TensorRT', 'Triton Inference Server'],
    scale: 'Thousands of GPUs, exaflops of compute',
    keyTechnologies: ['CUDA', 'TensorRT', 'NVLink', 'InfiniBand'],
    challenges: ['GPU utilization', 'Multi-GPU training', 'Inference optimization', 'Cost'],
    diagram: `flowchart LR\n    A[Model] --> B[Training Cluster]\n    B --> C[Optimization]\n    C --> D[Inference Server]\n    D --> E[Deployment]`
  },

  // HUGGING FACE SYSTEMS
  {
    id: 'huggingface-1',
    name: 'Hugging Face Hub',
    company: 'Hugging Face',
    category: 'ML Platform',
    complexity: 'High',
    description: 'Model hub for sharing and deploying ML models.',
    components: ['Model Registry', 'Inference API', 'Spaces', 'Datasets', 'AutoTrain'],
    scale: '500K+ models, millions of downloads',
    keyTechnologies: ['PyTorch', 'TensorFlow', 'FastAPI', 'Docker', 'Kubernetes'],
    challenges: ['Model versioning', 'Inference scaling', 'Storage', 'Community moderation'],
    diagram: `flowchart TD\n    A[Model Upload] --> B[Registry]\n    B --> C[Inference API]\n    C --> D[Deployment]\n    D --> E[Users]`
  },

  // COHERE SYSTEMS
  {
    id: 'cohere-1',
    name: 'Cohere LLM Platform',
    company: 'Cohere',
    category: 'AI Platform',
    complexity: 'Very High',
    description: 'Enterprise LLM platform with embeddings and generation.',
    components: ['Model Serving', 'Embeddings API', 'Generation API', 'Fine-tuning', 'Monitoring'],
    scale: 'Billions of API calls',
    keyTechnologies: ['Transformers', 'Kubernetes', 'Redis', 'PostgreSQL'],
    challenges: ['Model serving', 'Latency', 'Cost optimization', 'Fine-tuning'],
    diagram: `flowchart LR\n    A[API Request] --> B[Load Balancer]\n    B --> C[Model Serving]\n    C --> D[Response]\n    D --> E[Client]`
  },

  // STABILITY AI SYSTEMS
  {
    id: 'stability-1',
    name: 'Stable Diffusion',
    company: 'Stability AI',
    category: 'Generative AI',
    complexity: 'Very High',
    description: 'Text-to-image generation using latent diffusion models.',
    components: ['Text Encoder', 'Diffusion Model', 'VAE Decoder', 'Safety Filter', 'API'],
    scale: 'Millions of images generated/day',
    keyTechnologies: ['Diffusion Models', 'CLIP', 'VAE', 'PyTorch', 'CUDA'],
    challenges: ['Generation quality', 'Compute cost', 'Safety', 'Prompt engineering'],
    diagram: `flowchart TD\n    A[Text Prompt] --> B[Text Encoder]\n    B --> C[Diffusion Process]\n    C --> D[VAE Decoder]\n    D --> E[Safety Filter]\n    E --> F[Image]`
  },

  // MIDJOURNEY SYSTEMS
  {
    id: 'midjourney-1',
    name: 'Midjourney Image Generation',
    company: 'Midjourney',
    category: 'Generative AI',
    complexity: 'Very High',
    description: 'Discord-based AI art generation platform.',
    components: ['Discord Bot', 'Queue System', 'Generation Cluster', 'Storage', 'Gallery'],
    scale: 'Millions of images generated',
    keyTechnologies: ['Diffusion Models', 'Discord API', 'GPU Clusters', 'CDN'],
    challenges: ['Queue management', 'GPU allocation', 'Quality control', 'Community moderation'],
    diagram: `flowchart LR\n    A[Discord Command] --> B[Queue]\n    B --> C[GPU Cluster]\n    C --> D[Generation]\n    D --> E[Storage]\n    E --> F[Discord]`
  },

  // REPLICATE SYSTEMS
  {
    id: 'replicate-1',
    name: 'Replicate ML Platform',
    company: 'Replicate',
    category: 'ML Platform',
    complexity: 'High',
    description: 'Platform for running ML models in the cloud.',
    components: ['Model Registry', 'Container Runtime', 'GPU Scheduling', 'API', 'Billing'],
    scale: 'Thousands of models, millions of predictions',
    keyTechnologies: ['Docker', 'Kubernetes', 'NVIDIA GPUs', 'FastAPI'],
    challenges: ['Cold start', 'GPU utilization', 'Model packaging', 'Cost optimization'],
    diagram: `flowchart TD\n    A[API Request] --> B[Model Router]\n    B --> C[Container Startup]\n    C --> D[GPU Execution]\n    D --> E[Response]`
  },

  // WEIGHTS & BIASES SYSTEMS
  {
    id: 'wandb-1',
    name: 'Weights & Biases MLOps',
    company: 'Weights & Biases',
    category: 'MLOps',
    complexity: 'High',
    description: 'Experiment tracking and model management platform.',
    components: ['Experiment Tracking', 'Model Registry', 'Artifacts', 'Sweeps', 'Reports'],
    scale: 'Millions of experiments tracked',
    keyTechnologies: ['Python SDK', 'Time Series DB', 'S3', 'React', 'GraphQL'],
    challenges: ['Data volume', 'Real-time sync', 'Visualization', 'Collaboration'],
    diagram: `flowchart LR\n    A[Training Script] --> B[SDK]\n    B --> C[Metrics Collection]\n    C --> D[Storage]\n    D --> E[Visualization]\n    E --> F[Dashboard]`
  },

  // LANGCHAIN SYSTEMS
  {
    id: 'langchain-1',
    name: 'LangChain Framework',
    company: 'LangChain',
    category: 'LLM Framework',
    complexity: 'Medium',
    description: 'Framework for building LLM applications with chains and agents.',
    components: ['Chains', 'Agents', 'Memory', 'Tools', 'Callbacks'],
    scale: 'Thousands of applications built',
    keyTechnologies: ['Python', 'TypeScript', 'LLM APIs', 'Vector DBs'],
    challenges: ['Abstraction design', 'LLM integration', 'Error handling', 'Observability'],
    diagram: `flowchart TD\n    A[User Input] --> B[Chain]\n    B --> C[LLM]\n    C --> D[Tools]\n    D --> E[Memory]\n    E --> F[Response]`
  },

  // PINECONE SYSTEMS
  {
    id: 'pinecone-1',
    name: 'Pinecone Vector Database',
    company: 'Pinecone',
    category: 'Vector Database',
    complexity: 'High',
    description: 'Managed vector database for similarity search.',
    components: ['Indexing', 'Query Engine', 'Metadata Filtering', 'Namespaces', 'API'],
    scale: 'Billions of vectors, millions of queries',
    keyTechnologies: ['HNSW', 'Approximate NN', 'Kubernetes', 'gRPC'],
    challenges: ['Query latency', 'Index updates', 'Scalability', 'Accuracy'],
    diagram: `flowchart LR\n    A[Vectors] --> B[Indexing]\n    B --> C[HNSW Index]\n    C --> D[Query]\n    D --> E[Top-K Results]`
  },

  // WEAVIATE SYSTEMS
  {
    id: 'weaviate-1',
    name: 'Weaviate Vector Search',
    company: 'Weaviate',
    category: 'Vector Database',
    complexity: 'High',
    description: 'Open-source vector database with GraphQL API.',
    components: ['Vector Index', 'GraphQL API', 'Modules', 'Replication', 'Backup'],
    scale: 'Billions of objects',
    keyTechnologies: ['Go', 'HNSW', 'GraphQL', 'Raft'],
    challenges: ['Multi-tenancy', 'Hybrid search', 'Scalability', 'Consistency'],
    diagram: `flowchart TD\n    A[Data] --> B[Vectorization]\n    B --> C[Index]\n    C --> D[GraphQL Query]\n    D --> E[Results]`
  },

  // ADDITIONAL SYSTEMS TO REACH 200+
  {
    id: 'misc-1',
    name: 'URL Shortener',
    company: 'Generic',
    category: 'Web Services',
    complexity: 'Medium',
    description: 'Scalable URL shortening service with analytics.',
    components: ['Hash Generator', 'Key-Value Store', 'Redirect Service', 'Analytics', 'Cache'],
    scale: 'Billions of URLs, millions of redirects/sec',
    keyTechnologies: ['Base62 Encoding', 'Redis', 'Cassandra', 'CDN'],
    challenges: ['Collision handling', 'Custom URLs', 'Analytics at scale', 'Cache invalidation'],
    diagram: `flowchart LR\n    A[Long URL] --> B[Hash Generator]\n    B --> C[Storage]\n    C --> D[Short URL]\n    D --> E[Redirect]\n    E --> F[Analytics]`
  },
  {
    id: 'misc-2',
    name: 'Rate Limiter',
    company: 'Generic',
    category: 'Infrastructure',
    complexity: 'Medium',
    description: 'Distributed rate limiting for API protection.',
    components: ['Token Bucket', 'Sliding Window', 'Redis', 'API Gateway'],
    scale: 'Millions of requests/sec',
    keyTechnologies: ['Redis', 'Lua Scripts', 'Token Bucket Algorithm'],
    challenges: ['Distributed coordination', 'Race conditions', 'Performance', 'Fairness'],
    diagram: `flowchart TD\n    A[Request] --> B[Rate Limiter]\n    B --> C{Allowed?}\n    C -- Yes --> D[API]\n    C -- No --> E[429 Error]`
  },
  {
    id: 'misc-3',
    name: 'Distributed Cache',
    company: 'Generic',
    category: 'Caching',
    complexity: 'High',
    description: 'Distributed caching system with consistency guarantees.',
    components: ['Cache Nodes', 'Consistent Hashing', 'Replication', 'Eviction Policy'],
    scale: 'Terabytes of cached data',
    keyTechnologies: ['Redis Cluster', 'Memcached', 'Consistent Hashing', 'LRU'],
    challenges: ['Cache invalidation', 'Hot keys', 'Thundering herd', 'Consistency'],
    diagram: `flowchart LR\n    A[Request] --> B[Cache]\n    B --> C{Hit?}\n    C -- Yes --> D[Return]\n    C -- No --> E[DB]\n    E --> F[Update Cache]`
  },
  {
    id: 'misc-4',
    name: 'Message Queue',
    company: 'Generic',
    category: 'Messaging',
    complexity: 'High',
    description: 'Distributed message queue with ordering and durability.',
    components: ['Producers', 'Brokers', 'Consumers', 'Dead Letter Queue', 'Monitoring'],
    scale: 'Millions of messages/sec',
    keyTechnologies: ['Kafka', 'RabbitMQ', 'SQS', 'Persistent Storage'],
    challenges: ['Ordering', 'Exactly-once delivery', 'Backpressure', 'Poison messages'],
    diagram: `flowchart LR\n    A[Producer] --> B[Queue]\n    B --> C[Consumer]\n    C --> D[Processing]\n    D --> E[Ack]`
  },
  {
    id: 'misc-5',
    name: 'Load Balancer',
    company: 'Generic',
    category: 'Infrastructure',
    complexity: 'High',
    description: 'Layer 4/7 load balancing with health checks.',
    components: ['Health Checker', 'Load Balancing Algorithm', 'Connection Pool', 'SSL Termination'],
    scale: 'Millions of connections',
    keyTechnologies: ['NGINX', 'HAProxy', 'Round Robin', 'Least Connections'],
    challenges: ['Session persistence', 'Health checks', 'SSL offloading', 'DDoS protection'],
    diagram: `flowchart TD\n    A[Clients] --> B[Load Balancer]\n    B --> C[Server 1]\n    B --> D[Server 2]\n    B --> E[Server N]`
  },
  {
    id: 'misc-6',
    name: 'API Gateway',
    company: 'Generic',
    category: 'Infrastructure',
    complexity: 'High',
    description: 'Centralized API management with auth, rate limiting, and routing.',
    components: ['Authentication', 'Rate Limiting', 'Routing', 'Transformation', 'Analytics'],
    scale: 'Billions of requests/day',
    keyTechnologies: ['Kong', 'AWS API Gateway', 'Envoy', 'OAuth2'],
    challenges: ['Latency', 'Security', 'Versioning', 'Monitoring'],
    diagram: `flowchart LR\n    A[Client] --> B[API Gateway]\n    B --> C[Auth]\n    C --> D[Rate Limit]\n    D --> E[Route]\n    E --> F[Services]`
  },
  {
    id: 'misc-7',
    name: 'Notification System',
    company: 'Generic',
    category: 'Messaging',
    complexity: 'High',
    description: 'Multi-channel notification delivery (email, SMS, push).',
    components: ['Queue', 'Channel Handlers', 'Template Engine', 'Delivery Tracking', 'Retry Logic'],
    scale: 'Millions of notifications/day',
    keyTechnologies: ['SQS', 'SNS', 'SendGrid', 'Twilio', 'FCM'],
    challenges: ['Delivery guarantees', 'Rate limiting', 'Template management', 'User preferences'],
    diagram: `flowchart TD\n    A[Event] --> B[Queue]\n    B --> C[Channel Router]\n    C --> D[Email/SMS/Push]\n    D --> E[Delivery]\n    E --> F[Tracking]`
  },
  {
    id: 'misc-8',
    name: 'Search Autocomplete',
    company: 'Generic',
    category: 'Search',
    complexity: 'Medium',
    description: 'Real-time search suggestions with ranking.',
    components: ['Trie/Prefix Tree', 'Ranking', 'Cache', 'Analytics'],
    scale: 'Millions of queries/sec',
    keyTechnologies: ['Trie', 'Redis', 'Elasticsearch', 'ML Ranking'],
    challenges: ['Latency', 'Relevance', 'Personalization', 'Typo tolerance'],
    diagram: `flowchart LR\n    A[Prefix] --> B[Trie Lookup]\n    B --> C[Ranking]\n    C --> D[Cache]\n    D --> E[Suggestions]`
  },
  {
    id: 'misc-9',
    name: 'Distributed Lock',
    company: 'Generic',
    category: 'Coordination',
    complexity: 'Medium',
    description: 'Distributed locking for coordination across services.',
    components: ['Lock Manager', 'Lease', 'Heartbeat', 'Deadlock Detection'],
    scale: 'Thousands of locks/sec',
    keyTechnologies: ['Redis', 'ZooKeeper', 'etcd', 'Redlock'],
    challenges: ['Deadlocks', 'Split brain', 'Lease expiration', 'Performance'],
    diagram: `flowchart TD\n    A[Request Lock] --> B[Lock Manager]\n    B --> C{Available?}\n    C -- Yes --> D[Grant]\n    C -- No --> E[Wait/Fail]`
  },
  {
    id: 'misc-10',
    name: 'Job Scheduler',
    company: 'Generic',
    category: 'Orchestration',
    complexity: 'High',
    description: 'Distributed job scheduling with cron-like capabilities.',
    components: ['Scheduler', 'Job Queue', 'Workers', 'Retry Logic', 'Monitoring'],
    scale: 'Millions of jobs/day',
    keyTechnologies: ['Cron', 'Celery', 'Airflow', 'Temporal'],
    challenges: ['Exactly-once execution', 'Failure handling', 'Dependency management', 'Scaling'],
    diagram: `flowchart LR\n    A[Schedule] --> B[Scheduler]\n    B --> C[Queue]\n    C --> D[Workers]\n    D --> E[Execution]\n    E --> F[Monitoring]`
  },
];

export const CATEGORIES_PART3 = [
  'Autonomous Driving',
  'ML Training',
  'Data Platform',
  'Data Warehouse',
  'CDN',
  'Search Engine',
  'Streaming',
  'Observability',
  'Infrastructure',
  'Project Management',
  'AI Infrastructure',
  'ML Platform',
  'LLM Framework',
  'Vector Database',
  'Web Services',
  'Caching',
  'Messaging',
  'Coordination',
  'Orchestration'
];
