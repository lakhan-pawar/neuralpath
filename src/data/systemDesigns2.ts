// Part 2: More real-world system designs (70 designs)
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

export const SYSTEM_DESIGNS_PART2: SystemDesign[] = [
  // UBER SYSTEMS
  {
    id: 'uber-1',
    name: 'Uber Ride Matching',
    company: 'Uber',
    category: 'Ride Sharing',
    complexity: 'Very High',
    description: 'Real-time ride matching with dynamic pricing and route optimization.',
    components: ['Location Service', 'Matching Engine', 'Pricing Service', 'Routing', 'Payment'],
    scale: '100+ million users, millions of rides/day',
    keyTechnologies: ['Go', 'Node.js', 'Cassandra', 'Redis', 'Kafka', 'H3 Geospatial'],
    challenges: ['Real-time matching', 'Surge pricing', 'ETA prediction', 'Driver allocation'],
    diagram: `flowchart TD\n    A[Rider Request] --> B[Location Service]\n    B --> C[Matching Engine]\n    C --> D[Driver Assignment]\n    D --> E[Route Optimization]\n    E --> F[Ride Start]`
  },
  {
    id: 'uber-2',
    name: 'Uber Eats Delivery',
    company: 'Uber',
    category: 'Food Delivery',
    complexity: 'Very High',
    description: 'Three-way marketplace matching customers, restaurants, and delivery partners.',
    components: ['Order Service', 'Restaurant System', 'Dispatch', 'Routing', 'Tracking'],
    scale: 'Millions of orders/day, global coverage',
    keyTechnologies: ['Microservices', 'Kafka', 'PostgreSQL', 'Redis', 'ML Routing'],
    challenges: ['Multi-stop routing', 'Food freshness', 'Batching orders', 'ETA accuracy'],
    diagram: `flowchart LR\n    A[Order] --> B[Restaurant]\n    B --> C[Dispatch]\n    C --> D[Driver Routing]\n    D --> E[Delivery]\n    E --> F[Customer]`
  },

  // AIRBNB SYSTEMS
  {
    id: 'airbnb-1',
    name: 'Airbnb Search & Ranking',
    company: 'Airbnb',
    category: 'Search',
    complexity: 'Very High',
    description: 'Personalized search with ML ranking, pricing, and availability.',
    components: ['Search Service', 'Ranking Model', 'Pricing Engine', 'Availability', 'Filters'],
    scale: '7+ million listings, billions of searches',
    keyTechnologies: ['Elasticsearch', 'TensorFlow', 'Spark', 'Presto', 'Airflow'],
    challenges: ['Personalization', 'Dynamic pricing', 'Real-time availability', 'Quality scoring'],
    diagram: `flowchart TD\n    A[Search Query] --> B[Elasticsearch]\n    B --> C[ML Ranking]\n    C --> D[Pricing]\n    D --> E[Availability Check]\n    E --> F[Results]`
  },
  {
    id: 'airbnb-2',
    name: 'Airbnb Payments',
    company: 'Airbnb',
    category: 'Payments',
    complexity: 'High',
    description: 'Global payment processing with multi-currency, payouts, and fraud detection.',
    components: ['Payment Gateway', 'Currency Conversion', 'Payout Service', 'Fraud Detection', 'Reconciliation'],
    scale: 'Billions in transactions, 190+ countries',
    keyTechnologies: ['Stripe', 'Adyen', 'ML Fraud Detection', 'PostgreSQL', 'Kafka'],
    challenges: ['Multi-currency', 'Fraud prevention', 'Regulatory compliance', 'Chargebacks'],
    diagram: `flowchart LR\n    A[Payment] --> B[Fraud Check]\n    B --> C[Gateway]\n    C --> D[Currency Conversion]\n    D --> E[Payout]\n    E --> F[Host]`
  },

  // SPOTIFY SYSTEMS
  {
    id: 'spotify-1',
    name: 'Spotify Music Streaming',
    company: 'Spotify',
    category: 'Audio Streaming',
    complexity: 'Very High',
    description: 'Music streaming with offline playback, personalized playlists, and social features.',
    components: ['Audio Streaming', 'CDN', 'Recommendation Engine', 'Playlist Service', 'Social Graph'],
    scale: '500+ million users, 100+ million tracks',
    keyTechnologies: ['GCP', 'Cassandra', 'Kafka', 'TensorFlow', 'Bigtable'],
    challenges: ['Audio quality', 'Offline sync', 'Personalization', 'Licensing'],
    diagram: `flowchart TD\n    A[User] --> B[Streaming Service]\n    B --> C[CDN]\n    C --> D[Audio Delivery]\n    D --> E[Recommendations]\n    E --> F[Playlist]`
  },
  {
    id: 'spotify-2',
    name: 'Spotify Discover Weekly',
    company: 'Spotify',
    category: 'ML System',
    complexity: 'High',
    description: 'Personalized playlist generation using collaborative filtering and NLP.',
    components: ['User Behavior', 'Collaborative Filtering', 'NLP Analysis', 'Playlist Generator', 'A/B Testing'],
    scale: '500+ million personalized playlists/week',
    keyTechnologies: ['Spark', 'TensorFlow', 'Word2Vec', 'Cassandra', 'Luigi'],
    challenges: ['Cold start', 'Diversity', 'Freshness', 'Scalability'],
    diagram: `flowchart LR\n    A[User History] --> B[Collaborative Filtering]\n    B --> C[Track Embeddings]\n    C --> D[Playlist Generation]\n    D --> E[Discover Weekly]`
  },

  // TWITTER/X SYSTEMS
  {
    id: 'twitter-1',
    name: 'Twitter Timeline',
    company: 'Twitter/X',
    category: 'Social Media',
    complexity: 'Very High',
    description: 'Real-time tweet delivery with ML ranking and trending topics.',
    components: ['Tweet Ingestion', 'Fanout Service', 'Ranking Model', 'Cache', 'Real-time Updates'],
    scale: '500+ million tweets/day, 400+ million users',
    keyTechnologies: ['Scala', 'Manhattan (KV store)', 'GraphJet', 'TensorFlow', 'Kafka'],
    challenges: ['Real-time delivery', 'Fanout at scale', 'Ranking', 'Spam detection'],
    diagram: `flowchart TD\n    A[Tweet] --> B[Ingestion]\n    B --> C[Fanout Service]\n    C --> D[Ranking]\n    D --> E[Cache]\n    E --> F[Timeline]`
  },
  {
    id: 'twitter-2',
    name: 'Twitter Trends',
    company: 'Twitter/X',
    category: 'Analytics',
    complexity: 'High',
    description: 'Real-time trending topic detection and ranking.',
    components: ['Stream Processing', 'Trend Detection', 'Ranking', 'Geo-localization', 'Cache'],
    scale: 'Billions of tweets analyzed/day',
    keyTechnologies: ['Storm', 'Heron', 'Redis', 'Manhattan', 'Kafka'],
    challenges: ['Real-time processing', 'Spam filtering', 'Geo-relevance', 'Velocity spikes'],
    diagram: `flowchart LR\n    A[Tweet Stream] --> B[Processing]\n    B --> C[Trend Detection]\n    C --> D[Ranking]\n    D --> E[Geo-filter]\n    E --> F[Trends]`
  },

  // LINKEDIN SYSTEMS
  {
    id: 'linkedin-1',
    name: 'LinkedIn Feed',
    company: 'LinkedIn',
    category: 'Social Media',
    complexity: 'Very High',
    description: 'Professional network feed with ML ranking and job recommendations.',
    components: ['Content Ingestion', 'Ranking Model', 'Job Matching', 'Ads', 'Notifications'],
    scale: '900+ million users, billions of updates',
    keyTechnologies: ['Kafka', 'Espresso', 'Venice', 'TensorFlow', 'Samza'],
    challenges: ['Professional relevance', 'Job matching', 'Spam prevention', 'Engagement'],
    diagram: `flowchart TD\n    A[Content] --> B[Ingestion]\n    B --> C[ML Ranking]\n    C --> D[Job Matching]\n    D --> E[Feed]\n    E --> F[User]`
  },
  {
    id: 'linkedin-2',
    name: 'LinkedIn Recruiter',
    company: 'LinkedIn',
    category: 'Recruiting',
    complexity: 'High',
    description: 'Candidate search and matching system for recruiters.',
    components: ['Profile Search', 'Matching Algorithm', 'InMail Service', 'Analytics', 'CRM'],
    scale: '900+ million profiles, millions of searches',
    keyTechnologies: ['Elasticsearch', 'Galene', 'Kafka', 'ML Ranking', 'Venice'],
    challenges: ['Search relevance', 'Candidate matching', 'Privacy', 'Response rates'],
    diagram: `flowchart LR\n    A[Search Query] --> B[Profile Index]\n    B --> C[ML Matching]\n    C --> D[Ranking]\n    D --> E[InMail]\n    E --> F[Candidate]`
  },

  // PINTEREST SYSTEMS
  {
    id: 'pinterest-1',
    name: 'Pinterest Visual Search',
    company: 'Pinterest',
    category: 'Visual Search',
    complexity: 'Very High',
    description: 'Image-based search using computer vision and embeddings.',
    components: ['Image Ingestion', 'Feature Extraction', 'Vector Search', 'Ranking', 'Recommendations'],
    scale: '400+ million users, billions of pins',
    keyTechnologies: ['TensorFlow', 'ResNet', 'Faiss', 'HBase', 'Spark'],
    challenges: ['Visual similarity', 'Scale', 'Latency', 'Quality'],
    diagram: `flowchart TD\n    A[Image Query] --> B[Feature Extraction]\n    B --> C[Vector Search]\n    C --> D[Ranking]\n    D --> E[Results]`
  },
  {
    id: 'pinterest-2',
    name: 'Pinterest Home Feed',
    company: 'Pinterest',
    category: 'Recommendations',
    complexity: 'High',
    description: 'Personalized pin recommendations using collaborative filtering.',
    components: ['User Behavior', 'Pin Embeddings', 'Ranking Model', 'Diversity', 'Real-time Updates'],
    scale: '400+ million users, billions of pins',
    keyTechnologies: ['PinSage (GNN)', 'TensorFlow', 'Spark', 'HBase', 'Kafka'],
    challenges: ['Personalization', 'Diversity', 'Freshness', 'Cold start'],
    diagram: `flowchart LR\n    A[User] --> B[Behavior Analysis]\n    B --> C[Pin Embeddings]\n    C --> D[Ranking]\n    D --> E[Feed]`
  },

  // STRIPE SYSTEMS
  {
    id: 'stripe-1',
    name: 'Stripe Payment Processing',
    company: 'Stripe',
    category: 'Payments',
    complexity: 'Very High',
    description: 'Global payment infrastructure with fraud detection and compliance.',
    components: ['Payment Gateway', 'Fraud Detection', 'Compliance Engine', 'Reconciliation', 'Webhooks'],
    scale: 'Billions in transactions, 135+ currencies',
    keyTechnologies: ['Ruby', 'Scala', 'MongoDB', 'Kafka', 'ML Fraud Detection'],
    challenges: ['PCI compliance', 'Fraud prevention', 'Global regulations', 'Reliability'],
    diagram: `flowchart TD\n    A[Payment] --> B[Fraud Check]\n    B --> C[Gateway]\n    C --> D[Bank Processing]\n    D --> E[Reconciliation]\n    E --> F[Webhook]`
  },
  {
    id: 'stripe-2',
    name: 'Stripe Radar (Fraud Detection)',
    company: 'Stripe',
    category: 'Fraud Detection',
    complexity: 'High',
    description: 'ML-powered fraud detection analyzing billions of transactions.',
    components: ['Feature Engineering', 'ML Models', 'Rule Engine', 'Real-time Scoring', 'Feedback Loop'],
    scale: 'Billions of transactions analyzed',
    keyTechnologies: ['Scikit-learn', 'XGBoost', 'Kafka', 'Spark', 'Redis'],
    challenges: ['False positives', 'Real-time scoring', 'Adaptive fraud', 'Explainability'],
    diagram: `flowchart LR\n    A[Transaction] --> B[Feature Extraction]\n    B --> C[ML Scoring]\n    C --> D[Rule Engine]\n    D --> E[Decision]\n    E --> F[Feedback]`
  },

  // SLACK SYSTEMS
  {
    id: 'slack-1',
    name: 'Slack Messaging',
    company: 'Slack',
    category: 'Communication',
    complexity: 'High',
    description: 'Real-time team messaging with channels, threads, and search.',
    components: ['Message Router', 'Channel Service', 'Search Index', 'Presence', 'Notifications'],
    scale: '10+ million daily active users',
    keyTechnologies: ['PHP', 'MySQL', 'Vitess', 'Elasticsearch', 'Redis'],
    challenges: ['Message ordering', 'Search performance', 'Presence sync', 'File sharing'],
    diagram: `flowchart TD\n    A[Message] --> B[Router]\n    B --> C[Channel Service]\n    C --> D[Storage]\n    D --> E[Search Index]\n    E --> F[Delivery]`
  },

  // ZOOM SYSTEMS
  {
    id: 'zoom-1',
    name: 'Zoom Video Conferencing',
    company: 'Zoom',
    category: 'Video Conferencing',
    complexity: 'Very High',
    description: 'Real-time video conferencing with screen sharing and recording.',
    components: ['Media Server', 'Signaling', 'Recording Service', 'Screen Share', 'Chat'],
    scale: '300+ million daily meeting participants',
    keyTechnologies: ['WebRTC', 'SFU', 'VP9', 'H.264', 'UDP'],
    challenges: ['Low latency', 'Bandwidth optimization', 'Quality adaptation', 'Scale'],
    diagram: `flowchart LR\n    A[Participant] --> B[Signaling]\n    B --> C[Media Server]\n    C --> D[Video Routing]\n    D --> E[Participants]\n    E --> F[Recording]`
  },

  // DROPBOX SYSTEMS
  {
    id: 'dropbox-1',
    name: 'Dropbox File Sync',
    company: 'Dropbox',
    category: 'Cloud Storage',
    complexity: 'High',
    description: 'File synchronization with conflict resolution and version control.',
    components: ['Sync Engine', 'Block Storage', 'Metadata Service', 'Conflict Resolution', 'Sharing'],
    scale: '700+ million users, exabytes of data',
    keyTechnologies: ['Python', 'Go', 'MySQL', 'S3', 'Block-level Sync'],
    challenges: ['Conflict resolution', 'Bandwidth optimization', 'Offline support', 'Large files'],
    diagram: `flowchart TD\n    A[File Change] --> B[Sync Engine]\n    B --> C[Block Diff]\n    C --> D[Upload]\n    D --> E[Metadata Update]\n    E --> F[Sync to Devices]`
  },

  // GITHUB SYSTEMS
  {
    id: 'github-1',
    name: 'GitHub Code Hosting',
    company: 'GitHub',
    category: 'Version Control',
    complexity: 'High',
    description: 'Git repository hosting with collaboration features.',
    components: ['Git Storage', 'Web Interface', 'API', 'Actions CI/CD', 'Search'],
    scale: '100+ million developers, 300+ million repos',
    keyTechnologies: ['Ruby on Rails', 'MySQL', 'Git', 'Elasticsearch', 'Kafka'],
    challenges: ['Git performance', 'Large repos', 'Search', 'Availability'],
    diagram: `flowchart LR\n    A[Git Push] --> B[Git Server]\n    B --> C[Storage]\n    C --> D[Indexing]\n    D --> E[Web/API]\n    E --> F[Users]`
  },

  // SHOPIFY SYSTEMS
  {
    id: 'shopify-1',
    name: 'Shopify E-commerce Platform',
    company: 'Shopify',
    category: 'E-commerce',
    complexity: 'Very High',
    description: 'Multi-tenant e-commerce platform with payments and fulfillment.',
    components: ['Store Management', 'Product Catalog', 'Checkout', 'Payment Processing', 'Fulfillment'],
    scale: '2+ million merchants, billions in GMV',
    keyTechnologies: ['Ruby on Rails', 'MySQL', 'Redis', 'Kafka', 'React'],
    challenges: ['Multi-tenancy', 'Flash sales', 'Payment security', 'Global scale'],
    diagram: `flowchart TD\n    A[Customer] --> B[Storefront]\n    B --> C[Product Catalog]\n    C --> D[Checkout]\n    D --> E[Payment]\n    E --> F[Fulfillment]`
  },

  // TWITCH SYSTEMS
  {
    id: 'twitch-1',
    name: 'Twitch Live Streaming',
    company: 'Twitch',
    category: 'Live Streaming',
    complexity: 'Very High',
    description: 'Live video streaming platform with chat and interactive features.',
    components: ['Ingest', 'Transcoding', 'CDN', 'Chat Service', 'Recommendations'],
    scale: '140+ million monthly users, millions of streams',
    keyTechnologies: ['Go', 'AWS', 'HLS', 'WebRTC', 'Redis', 'Kafka'],
    challenges: ['Low latency', 'Chat at scale', 'Transcoding', 'Content moderation'],
    diagram: `flowchart LR\n    A[Streamer] --> B[Ingest]\n    B --> C[Transcoding]\n    C --> D[CDN]\n    D --> E[Viewers]\n    E --> F[Chat]`
  },

  // REDDIT SYSTEMS
  {
    id: 'reddit-1',
    name: 'Reddit Community Platform',
    company: 'Reddit',
    category: 'Social Media',
    complexity: 'High',
    description: 'Community-driven content platform with voting and moderation.',
    components: ['Post Service', 'Voting System', 'Comment Tree', 'Moderation', 'Search'],
    scale: '50+ million daily users, 100K+ communities',
    keyTechnologies: ['Python', 'PostgreSQL', 'Cassandra', 'Redis', 'RabbitMQ'],
    challenges: ['Vote manipulation', 'Comment threading', 'Moderation tools', 'Search'],
    diagram: `flowchart TD\n    A[Post] --> B[Voting]\n    B --> C[Ranking]\n    C --> D[Feed]\n    D --> E[Comments]\n    E --> F[Moderation]`
  },

  // DISCORD SYSTEMS
  {
    id: 'discord-1',
    name: 'Discord Real-time Chat',
    company: 'Discord',
    category: 'Communication',
    complexity: 'High',
    description: 'Real-time voice, video, and text chat for communities.',
    components: ['Gateway', 'Voice Servers', 'Text Chat', 'Presence', 'Media Proxy'],
    scale: '150+ million monthly users',
    keyTechnologies: ['Elixir', 'Rust', 'Cassandra', 'Redis', 'WebRTC'],
    challenges: ['Voice quality', 'Message ordering', 'Presence sync', 'DDoS protection'],
    diagram: `flowchart LR\n    A[Client] --> B[Gateway]\n    B --> C[Voice Server]\n    C --> D[Media Routing]\n    D --> E[Participants]\n    E --> F[Text Chat]`
  },

  // TIKTOK SYSTEMS
  {
    id: 'tiktok-1',
    name: 'TikTok For You Feed',
    company: 'TikTok',
    category: 'Social Media',
    complexity: 'Very High',
    description: 'Personalized short video feed using ML recommendations.',
    components: ['Video Processing', 'Recommendation Engine', 'CDN', 'Engagement Tracking', 'Moderation'],
    scale: '1+ billion users, billions of videos',
    keyTechnologies: ['ByteDance ML', 'CDN', 'Redis', 'Kafka', 'TensorFlow'],
    challenges: ['Video recommendations', 'Content moderation', 'Viral detection', 'Global CDN'],
    diagram: `flowchart TD\n    A[User] --> B[Behavior Tracking]\n    B --> C[ML Recommendations]\n    C --> D[Video Ranking]\n    D --> E[CDN Delivery]\n    E --> F[For You Feed]`
  },

  // SALESFORCE SYSTEMS
  {
    id: 'salesforce-1',
    name: 'Salesforce CRM',
    company: 'Salesforce',
    category: 'CRM',
    complexity: 'Very High',
    description: 'Multi-tenant CRM platform with customization and automation.',
    components: ['Data Model', 'Workflow Engine', 'API', 'Analytics', 'AppExchange'],
    scale: '150K+ customers, millions of users',
    keyTechnologies: ['Java', 'Oracle DB', 'Heroku', 'Einstein AI', 'Lightning'],
    challenges: ['Multi-tenancy', 'Customization', 'Performance', 'Data isolation'],
    diagram: `flowchart LR\n    A[User] --> B[UI/API]\n    B --> C[Business Logic]\n    C --> D[Data Layer]\n    D --> E[Analytics]\n    E --> F[Insights]`
  },

  // ADOBE SYSTEMS
  {
    id: 'adobe-1',
    name: 'Adobe Creative Cloud',
    company: 'Adobe',
    category: 'Creative Tools',
    complexity: 'High',
    description: 'Cloud-based creative suite with file sync and collaboration.',
    components: ['Asset Management', 'Sync Service', 'Collaboration', 'Rendering', 'Libraries'],
    scale: '30+ million subscribers',
    keyTechnologies: ['AWS', 'Azure', 'Node.js', 'React', 'WebAssembly'],
    challenges: ['Large file handling', 'Real-time collaboration', 'Rendering', 'Licensing'],
    diagram: `flowchart TD\n    A[Creative App] --> B[Asset Management]\n    B --> C[Cloud Storage]\n    C --> D[Sync Service]\n    D --> E[Collaboration]\n    E --> F[Team]`
  },

  // PAYPAL SYSTEMS
  {
    id: 'paypal-1',
    name: 'PayPal Payment Platform',
    company: 'PayPal',
    category: 'Payments',
    complexity: 'Very High',
    description: 'Global payment platform with fraud detection and dispute resolution.',
    components: ['Payment Gateway', 'Fraud Detection', 'Dispute Resolution', 'Currency Conversion', 'Wallet'],
    scale: '400+ million accounts, billions in transactions',
    keyTechnologies: ['Java', 'Node.js', 'Oracle', 'Kafka', 'ML Fraud Detection'],
    challenges: ['Fraud prevention', 'Compliance', 'Chargebacks', 'Multi-currency'],
    diagram: `flowchart LR\n    A[Payment] --> B[Fraud Check]\n    B --> C[Gateway]\n    C --> D[Processing]\n    D --> E[Settlement]\n    E --> F[Wallet]`
  },
];

export const CATEGORIES_PART2 = [
  'Ride Sharing',
  'Food Delivery',
  'Audio Streaming',
  'Analytics',
  'Recruiting',
  'Visual Search',
  'Fraud Detection',
  'Video Conferencing',
  'Version Control',
  'Live Streaming',
  'CRM',
  'Creative Tools'
];
