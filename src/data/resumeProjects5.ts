// Resume-Ready AI/ML Projects - Part 5
// Additional advanced projects for comprehensive portfolio

import type { ResumeProject } from './resumeProjects1';

export const RESUME_PROJECTS_PART5: ResumeProject[] = [
  // NLP & TEXT PROCESSING
  {
    id: 'nlp-1',
    title: 'Production Named Entity Recognition System',
    category: 'NLP & Text Processing',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Built custom NER system for domain-specific entities (medical, legal, financial). Fine-tuned BERT, deployed with 95% F1 score, processing 1M+ documents/day.',
    techStack: ['Python', 'Transformers', 'spaCy', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    keyFeatures: [
      'Custom entity types with hierarchical taxonomy',
      'Active learning for continuous improvement',
      'Multi-language support (English, Spanish, French)',
      'Entity linking to knowledge base',
      'Confidence scoring and uncertainty estimation',
      'Batch and real-time processing modes',
    ],
    implementation: [
      {
        step: 'Data Annotation',
        details: 'Created annotation guidelines for 20 entity types. Used Prodigy for annotation. Annotated 50K examples with 3 annotators. Measured inter-annotator agreement (Cohen\'s Kappa 0.85). Resolved conflicts through discussion.',
      },
      {
        step: 'Model Training',
        details: 'Fine-tuned BERT-base on annotated data. Used BIO tagging scheme. Applied data augmentation: synonym replacement, back-translation. Trained for 10 epochs with early stopping. Achieved 95% F1 on test set.',
      },
      {
        step: 'Active Learning Loop',
        details: 'Deployed model, collected predictions with low confidence (<0.7). Sent to annotators for labeling. Retrained model monthly with new data. Improved F1 from 90% to 95% over 6 months.',
      },
      {
        step: 'Entity Linking',
        details: 'Linked extracted entities to knowledge base (Wikipedia, domain ontology). Used fuzzy matching and embedding similarity. Disambiguated entities using context. Added entity metadata (type, description, aliases).',
      },
      {
        step: 'Production Deployment',
        details: 'Deployed with FastAPI. Implemented batch processing (1K docs/min) and real-time API (<100ms). Added caching for common entities. Monitored performance and retrained on drift.',
      },
    ],
    challenges: [
      'Ambiguous entities - used context window and entity linking for disambiguation',
      'Rare entities - applied few-shot learning and data augmentation',
      'Multi-language - trained separate models per language, shared embeddings',
    ],
    results: 'Processed 1M+ documents/day. 95% F1 score on production data. Reduced manual entity extraction time by 90%. Enabled downstream analytics and search.',
    interviewTips: [
      'Explain NER - sequence labeling task, BIO tagging',
      'Discuss active learning - iterative improvement with human feedback',
      'Mention entity linking - connecting mentions to knowledge base',
      'Talk about evaluation - precision, recall, F1 for each entity type',
    ],
    githubIdeas: [
      'Include annotation guidelines',
      'Show model performance by entity type',
      'Document active learning improvements',
      'Add example extractions with confidence scores',
    ],
  },
  {
    id: 'nlp-2',
    title: 'Semantic Search Engine with Dense Retrieval',
    category: 'NLP & Text Processing',
    difficulty: 'Advanced',
    duration: '4 weeks',
    overview: 'Built semantic search engine using dense retrieval (bi-encoders). Indexed 10M documents, achieved 90% MRR, <100ms query latency.',
    techStack: ['Python', 'Sentence-Transformers', 'FAISS', 'Elasticsearch', 'FastAPI', 'Redis', 'React'],
    keyFeatures: [
      'Dense retrieval with bi-encoder architecture',
      'Hybrid search (dense + sparse)',
      'Query expansion and rewriting',
      'Personalized ranking',
      'Faceted search and filtering',
      'Search analytics and A/B testing',
    ],
    implementation: [
      {
        step: 'Embedding Generation',
        details: 'Used Sentence-BERT (all-MiniLM-L6-v2) for encoding. Generated 384-dim embeddings for 10M documents. Batch processing: 10K docs/min. Stored embeddings in FAISS index (IVF with PQ compression).',
      },
      {
        step: 'Hybrid Search',
        details: 'Combined dense (semantic) and sparse (BM25) retrieval. Dense: FAISS for top 100 candidates. Sparse: Elasticsearch for keyword matches. Fused results using reciprocal rank fusion. Improved recall by 20%.',
      },
      {
        step: 'Query Understanding',
        details: 'Implemented query expansion: added synonyms and related terms. Used GPT-3.5 for query rewriting (fix typos, expand abbreviations). Classified query intent (navigational, informational, transactional).',
      },
      {
        step: 'Ranking',
        details: 'Re-ranked top 100 results using cross-encoder (ms-marco-MiniLM). Personalized ranking: boosted documents based on user history. Applied business rules (recency, popularity). Final ranking optimized for MRR.',
      },
      {
        step: 'Search Analytics',
        details: 'Tracked: query volume, click-through rate, zero-result queries, query latency. Built dashboard for monitoring. Ran A/B tests for ranking changes. Improved CTR by 15% through optimization.',
      },
    ],
    challenges: [
      'Index size - used product quantization, reduced from 15GB to 3GB',
      'Query latency - added caching and approximate search, <100ms p99',
      'Cold start - used popularity-based ranking for new users',
    ],
    results: '90% MRR on test queries. <100ms query latency. 15% CTR improvement. Indexed 10M documents with daily updates.',
    interviewTips: [
      'Explain dense retrieval - embeddings capture semantic similarity',
      'Discuss hybrid search - combines semantic and keyword matching',
      'Mention re-ranking - two-stage retrieval for efficiency',
      'Talk about evaluation - MRR, NDCG, precision@k',
    ],
    githubIdeas: [
      'Show search quality metrics',
      'Include example queries and results',
      'Document hybrid search fusion',
      'Add A/B test results',
    ],
  },

  // COMPUTER VISION
  {
    id: 'cv-1',
    title: 'Real-Time Object Detection for Autonomous Systems',
    category: 'Computer Vision',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    overview: 'Developed real-time object detection system for autonomous vehicles. Achieved 45 FPS on edge devices with 92% mAP using YOLOv8 and TensorRT optimization.',
    techStack: ['Python', 'PyTorch', 'YOLOv8', 'TensorRT', 'OpenCV', 'CUDA', 'ROS', 'C++'],
    keyFeatures: [
      'Multi-class object detection (vehicles, pedestrians, signs)',
      'Real-time inference on edge devices (Jetson)',
      'Temporal consistency with tracking',
      'Distance estimation using camera calibration',
      'Sensor fusion (camera + LiDAR)',
      'Safety-critical validation',
    ],
    implementation: [
      {
        step: 'Dataset Preparation',
        details: 'Collected 100K images from dashcam footage. Annotated 15 object classes using CVAT. Applied augmentation: brightness, rotation, occlusion. Split: 70% train, 15% val, 15% test. Balanced classes using oversampling.',
      },
      {
        step: 'Model Training',
        details: 'Fine-tuned YOLOv8-medium on custom dataset. Used mosaic augmentation and mixup. Trained for 300 epochs with cosine annealing. Achieved 92% mAP@0.5 on test set. Optimized for recall (safety-critical).',
      },
      {
        step: 'TensorRT Optimization',
        details: 'Converted PyTorch model to ONNX, then TensorRT. Applied FP16 precision. Fused layers and optimized kernels. Achieved 3x speedup: 15 FPS → 45 FPS on Jetson Xavier. Validated accuracy (mAP drop <1%).',
      },
      {
        step: 'Tracking and Smoothing',
        details: 'Implemented DeepSORT for multi-object tracking. Maintained object IDs across frames. Applied Kalman filter for position smoothing. Reduced false positives by 40% through temporal consistency.',
      },
      {
        step: 'Sensor Fusion',
        details: 'Fused camera detections with LiDAR point clouds. Used camera for classification, LiDAR for accurate distance. Implemented early fusion (feature-level) and late fusion (decision-level). Improved detection in low-light by 30%.',
      },
    ],
    challenges: [
      'Edge device constraints - optimized model size and inference speed',
      'Occlusion handling - used temporal information and prediction',
      'Safety validation - extensive testing in simulation and real-world',
    ],
    results: '45 FPS on Jetson Xavier. 92% mAP with <1% false positive rate. Detected objects up to 100m distance. Deployed in 10 autonomous vehicles.',
    interviewTips: [
      'Explain object detection - localization + classification',
      'Discuss real-time constraints - latency vs accuracy trade-offs',
      'Mention TensorRT - NVIDIA inference optimization',
      'Talk about safety - validation, redundancy, fail-safes',
    ],
    githubIdeas: [
      'Include detection examples with bounding boxes',
      'Show FPS and mAP metrics',
      'Document TensorRT optimization steps',
      'Add sensor fusion architecture diagram',
    ],
  },
  {
    id: 'cv-2',
    title: 'Image Segmentation for Medical Imaging',
    category: 'Computer Vision',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Built medical image segmentation system for tumor detection. Achieved 95% Dice score using U-Net with attention, deployed for clinical use.',
    techStack: ['Python', 'PyTorch', 'MONAI', 'SimpleITK', 'FastAPI', 'PostgreSQL', 'DICOM'],
    keyFeatures: [
      'Multi-organ segmentation (liver, kidney, tumor)',
      'Attention U-Net architecture',
      '3D volumetric segmentation',
      'Uncertainty quantification',
      'DICOM integration',
      'Clinical validation and FDA compliance',
    ],
    implementation: [
      {
        step: 'Data Preprocessing',
        details: 'Processed 1K CT scans in DICOM format. Applied windowing (HU normalization). Resampled to isotropic spacing (1mm³). Cropped to region of interest. Augmented with elastic deformation, rotation, scaling.',
      },
      {
        step: 'Model Architecture',
        details: 'Implemented 3D U-Net with attention gates. Encoder: ResNet-50 backbone. Decoder: upsampling with skip connections. Attention: highlights relevant features. Output: multi-class segmentation mask.',
      },
      {
        step: 'Training Strategy',
        details: 'Used Dice loss + cross-entropy. Applied deep supervision (auxiliary losses). Trained with mixed precision (FP16). Used gradient accumulation for large batch size. Trained for 500 epochs with early stopping.',
      },
      {
        step: 'Uncertainty Estimation',
        details: 'Implemented Monte Carlo dropout for uncertainty. Ran 20 forward passes with dropout enabled. Computed mean and variance of predictions. High variance indicates uncertain regions. Flagged for radiologist review.',
      },
      {
        step: 'Clinical Deployment',
        details: 'Integrated with PACS (Picture Archiving System). Automated segmentation on new scans. Radiologist reviews and corrects. Feedback loop for continuous improvement. Achieved FDA 510(k) clearance.',
      },
    ],
    challenges: [
      'Class imbalance - tumor pixels <1% of image, used focal loss',
      'Annotation quality - multiple radiologists, resolved disagreements',
      'Generalization - tested on external datasets, fine-tuned for robustness',
    ],
    results: '95% Dice score on test set. Reduced radiologist annotation time by 70%. Deployed in 5 hospitals. Processed 10K+ scans.',
    interviewTips: [
      'Explain segmentation - pixel-wise classification',
      'Discuss U-Net - encoder-decoder with skip connections',
      'Mention medical imaging challenges - class imbalance, annotation',
      'Talk about clinical validation - FDA approval, radiologist feedback',
    ],
    githubIdeas: [
      'Show segmentation examples with ground truth',
      'Include Dice score by organ type',
      'Document preprocessing pipeline',
      'Add uncertainty visualization',
    ],
  },

  // RECOMMENDATION SYSTEMS
  {
    id: 'recsys-1',
    title: 'Large-Scale Recommendation System with Two-Tower Architecture',
    category: 'Recommendation Systems',
    difficulty: 'Advanced',
    duration: '6 weeks',
    overview: 'Built production recommendation system serving 1M+ users. Two-tower model for candidate generation, ranking model for final selection. Improved CTR by 25%.',
    techStack: ['Python', 'TensorFlow', 'FAISS', 'Redis', 'Kafka', 'Airflow', 'BigQuery', 'Kubernetes'],
    keyFeatures: [
      'Two-tower architecture for candidate generation',
      'Deep neural network for ranking',
      'Real-time feature computation',
      'A/B testing framework',
      'Cold start handling',
      'Diversity and exploration',
    ],
    implementation: [
      {
        step: 'Two-Tower Model',
        details: 'User tower: encodes user features (demographics, history). Item tower: encodes item features (category, popularity). Trained with contrastive loss. Generated 128-dim embeddings. Indexed items in FAISS for fast retrieval.',
      },
      {
        step: 'Candidate Generation',
        details: 'Retrieved top 500 candidates using ANN search (FAISS). Combined multiple strategies: collaborative filtering, content-based, trending. Applied business rules (diversity, freshness). Latency: <20ms.',
      },
      {
        step: 'Ranking Model',
        details: 'Deep neural network with 5 layers. Features: user-item interactions, contextual (time, device), cross features. Trained to predict CTR. Used calibration layer for probability. Re-ranked top 100 candidates.',
      },
      {
        step: 'Real-Time Features',
        details: 'Computed features in real-time: user session behavior, trending items. Used Redis for feature store. Kafka for event streaming. Updated features every 5 minutes. Improved CTR by 10%.',
      },
      {
        step: 'A/B Testing',
        details: 'Implemented multi-armed bandit for exploration. Allocated 10% traffic to new models. Tracked metrics: CTR, engagement time, conversion. Automated winner selection using Thompson sampling.',
      },
    ],
    challenges: [
      'Cold start - used content-based recommendations and popularity',
      'Scalability - sharded user embeddings, distributed serving',
      'Filter bubble - added diversity penalty and exploration',
    ],
    results: '25% CTR improvement. <50ms end-to-end latency. Serving 1M+ users. 30% increase in user engagement.',
    interviewTips: [
      'Explain two-tower - separate encoders for users and items',
      'Discuss candidate generation vs ranking - two-stage approach',
      'Mention cold start - common challenge in recsys',
      'Talk about evaluation - online metrics (CTR) vs offline (AUC)',
    ],
    githubIdeas: [
      'Show model architecture diagram',
      'Include A/B test results',
      'Document feature engineering',
      'Add latency breakdown',
    ],
  },
  {
    id: 'recsys-2',
    title: 'Session-Based Recommendation with Graph Neural Networks',
    category: 'Recommendation Systems',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Implemented session-based recommendations using GNN. Modeled user sessions as graphs, achieved 40% improvement in next-item prediction.',
    techStack: ['Python', 'PyTorch Geometric', 'DGL', 'Redis', 'FastAPI', 'PostgreSQL'],
    keyFeatures: [
      'Graph neural network for session modeling',
      'Attention mechanism for item importance',
      'Real-time session updates',
      'Multi-task learning (click, purchase)',
      'Temporal dynamics modeling',
      'Explainable recommendations',
    ],
    implementation: [
      {
        step: 'Session Graph Construction',
        details: 'Modeled each session as directed graph. Nodes: items viewed. Edges: transitions between items. Added edge weights (time spent). Constructed graphs in real-time as user browses.',
      },
      {
        step: 'GNN Architecture',
        details: 'Used Graph Attention Network (GAT). Message passing: aggregated neighbor information. Attention: learned importance of each item. Global pooling: session-level representation. Output: next-item probabilities.',
      },
      {
        step: 'Training',
        details: 'Trained on 10M sessions. Loss: cross-entropy for next-item prediction. Applied negative sampling (1 positive, 5 negatives). Used curriculum learning: easy sessions first. Trained for 50 epochs.',
      },
      {
        step: 'Multi-Task Learning',
        details: 'Jointly predicted: click, add-to-cart, purchase. Shared GNN encoder, separate prediction heads. Weighted loss based on task importance. Improved purchase prediction by 20%.',
      },
      {
        step: 'Explainability',
        details: 'Visualized attention weights to show important items. Generated explanations: "Recommended because you viewed X and Y". Increased user trust and CTR by 15%.',
      },
    ],
    challenges: [
      'Graph size - limited to last 20 items, used sliding window',
      'Cold start - used item features for new items',
      'Real-time inference - optimized graph construction and GNN forward pass',
    ],
    results: '40% improvement in next-item prediction. 15% CTR increase. <100ms inference latency. Deployed for 500K+ users.',
    interviewTips: [
      'Explain GNN - neural networks on graph-structured data',
      'Discuss session-based - no user history, only current session',
      'Mention attention - learns item importance',
      'Talk about explainability - building user trust',
    ],
    githubIdeas: [
      'Show session graph examples',
      'Include attention visualization',
      'Document GNN architecture',
      'Add prediction accuracy metrics',
    ],
  },

  // TIME SERIES & FORECASTING
  {
    id: 'ts-1',
    title: 'Multi-Horizon Time Series Forecasting with Transformers',
    category: 'Time Series & Forecasting',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Built forecasting system for demand prediction using Temporal Fusion Transformer. Achieved 15% MAPE on 7-day forecast, optimized inventory by $2M/year.',
    techStack: ['Python', 'PyTorch', 'PyTorch Forecasting', 'Pandas', 'Airflow', 'MLflow', 'Grafana'],
    keyFeatures: [
      'Multi-horizon forecasting (1-30 days)',
      'Temporal Fusion Transformer architecture',
      'Probabilistic predictions with quantiles',
      'Exogenous variables (holidays, promotions)',
      'Automated retraining pipeline',
      'Forecast explainability',
    ],
    implementation: [
      {
        step: 'Data Preparation',
        details: 'Collected 3 years of daily sales data for 10K products. Added features: day of week, month, holidays, promotions, weather. Handled missing values with forward fill. Created train/val/test splits with temporal ordering.',
      },
      {
        step: 'Model Architecture',
        details: 'Used Temporal Fusion Transformer (TFT). Components: 1) Variable selection (learns important features), 2) LSTM encoder (past context), 3) Multi-head attention (temporal relationships), 4) Quantile outputs (uncertainty).',
      },
      {
        step: 'Training',
        details: 'Trained on 2 years, validated on 6 months. Loss: quantile loss (10th, 50th, 90th percentiles). Used learning rate finder. Trained for 100 epochs with early stopping. Achieved 15% MAPE on test set.',
      },
      {
        step: 'Feature Importance',
        details: 'TFT provides variable importance scores. Identified top features: recent sales, day of week, promotions. Visualized attention weights showing which past time steps matter. Helped business understand drivers.',
      },
      {
        step: 'Production Pipeline',
        details: 'Airflow DAG: fetch data → preprocess → predict → store results. Ran daily for next 7 days. Monitored forecast accuracy. Retrained weekly with new data. Integrated with inventory management system.',
      },
    ],
    challenges: [
      'Intermittent demand - many products with zero sales, used hierarchical forecasting',
      'Concept drift - demand patterns change, implemented drift detection and retraining',
      'Computational cost - optimized batch size and used mixed precision',
    ],
    results: '15% MAPE on 7-day forecast. Reduced stockouts by 30%. Optimized inventory, saved $2M/year. Forecasting 10K products daily.',
    interviewTips: [
      'Explain TFT - transformer for time series with interpretability',
      'Discuss multi-horizon - predicting multiple future time steps',
      'Mention probabilistic forecasting - quantiles for uncertainty',
      'Talk about business impact - inventory optimization, cost savings',
    ],
    githubIdeas: [
      'Show forecast examples with confidence intervals',
      'Include feature importance analysis',
      'Document model architecture',
      'Add business impact metrics',
    ],
  },
  {
    id: 'ts-2',
    title: 'Anomaly Detection in Time Series with Deep Learning',
    category: 'Time Series & Forecasting',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    overview: 'Developed anomaly detection system for server metrics using LSTM autoencoder. Detected 95% of anomalies with <5% false positive rate.',
    techStack: ['Python', 'PyTorch', 'Prometheus', 'Grafana', 'Kafka', 'PostgreSQL', 'PagerDuty'],
    keyFeatures: [
      'LSTM autoencoder for unsupervised learning',
      'Real-time anomaly detection',
      'Adaptive thresholding',
      'Root cause analysis',
      'Automated alerting',
      'Anomaly visualization',
    ],
    implementation: [
      {
        step: 'Data Collection',
        details: 'Collected server metrics from Prometheus: CPU, memory, disk, network. 1-minute granularity. 6 months of historical data. Normalized features using z-score. Created sliding windows (60 time steps).',
      },
      {
        step: 'Autoencoder Training',
        details: 'LSTM encoder: compresses time series to latent representation. LSTM decoder: reconstructs original series. Trained on normal data only. Loss: MSE between input and reconstruction. Anomalies have high reconstruction error.',
      },
      {
        step: 'Anomaly Scoring',
        details: 'Computed reconstruction error for each window. Used 99th percentile of training errors as threshold. Anomaly score: how much error exceeds threshold. Implemented adaptive threshold that adjusts over time.',
      },
      {
        step: 'Root Cause Analysis',
        details: 'When anomaly detected, identified which metrics contributed most. Computed per-feature reconstruction errors. Ranked features by error. Helped ops team quickly identify issue (e.g., disk full).',
      },
      {
        step: 'Alerting Pipeline',
        details: 'Kafka consumer processes metrics in real-time. Runs anomaly detection. If anomaly detected, sends alert to PagerDuty. Includes: anomaly score, affected metrics, time range. Reduced MTTR by 50%.',
      },
    ],
    challenges: [
      'Seasonal patterns - model learned normal seasonality, didn\'t flag as anomalies',
      'Concept drift - retrained model monthly with recent data',
      'False positives - tuned threshold using precision-recall curve',
    ],
    results: '95% anomaly detection rate. <5% false positive rate. Detected issues 10 minutes faster than manual monitoring. Prevented 20+ outages.',
    interviewTips: [
      'Explain autoencoder - learns to compress and reconstruct',
      'Discuss unsupervised learning - no labeled anomalies needed',
      'Mention reconstruction error - basis for anomaly detection',
      'Talk about production deployment - real-time processing, alerting',
    ],
    githubIdeas: [
      'Show anomaly examples with reconstruction',
      'Include precision-recall curves',
      'Document threshold tuning',
      'Add alerting pipeline diagram',
    ],
  },

  // REINFORCEMENT LEARNING
  {
    id: 'rl-1',
    title: 'Dynamic Pricing with Multi-Armed Bandits',
    category: 'Reinforcement Learning',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    overview: 'Implemented dynamic pricing system using contextual bandits. Optimized prices in real-time, increased revenue by 18%.',
    techStack: ['Python', 'Vowpal Wabbit', 'Redis', 'FastAPI', 'PostgreSQL', 'Grafana'],
    keyFeatures: [
      'Contextual multi-armed bandits',
      'Thompson sampling for exploration',
      'Real-time price optimization',
      'Constraint handling (min/max prices)',
      'A/B testing framework',
      'Revenue and conversion tracking',
    ],
    implementation: [
      {
        step: 'Problem Formulation',
        details: 'Modeled as contextual bandit: Context = user features + product features. Actions = price points (10 discrete prices). Reward = revenue (price × conversion). Goal: maximize expected revenue.',
      },
      {
        step: 'Thompson Sampling',
        details: 'Maintained Beta distribution for each price point. Updated distributions based on conversions. Sampled from distributions to select price. Balances exploration (trying new prices) and exploitation (using best known price).',
      },
      {
        step: 'Contextual Features',
        details: 'User features: purchase history, browsing behavior, demographics. Product features: category, popularity, inventory. Time features: day of week, hour, season. Used linear model to predict conversion probability.',
      },
      {
        step: 'Constraint Handling',
        details: 'Applied business constraints: min price (cost + margin), max price (competitor price). Filtered actions before selection. Added fairness constraint: similar users get similar prices.',
      },
      {
        step: 'Evaluation',
        details: 'Ran A/B test: 50% bandit pricing, 50% fixed pricing. Tracked: revenue, conversion rate, customer satisfaction. Bandit increased revenue by 18% without hurting satisfaction.',
      },
    ],
    challenges: [
      'Cold start - used fixed pricing for new products until enough data',
      'Non-stationarity - demand changes over time, used sliding window',
      'Delayed feedback - conversions happen hours later, used importance sampling',
    ],
    results: '18% revenue increase. Optimized prices for 5K products. Processed 100K pricing decisions/day. Maintained customer satisfaction.',
    interviewTips: [
      'Explain bandits - online learning with exploration-exploitation',
      'Discuss Thompson sampling - Bayesian approach to bandits',
      'Mention contextual - using features to personalize',
      'Talk about business constraints - practical considerations',
    ],
    githubIdeas: [
      'Show revenue improvement over time',
      'Include exploration vs exploitation trade-off',
      'Document feature engineering',
      'Add A/B test results',
    ],
  },
  {
    id: 'rl-2',
    title: 'Recommendation System with Reinforcement Learning',
    category: 'Reinforcement Learning',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    overview: 'Built RL-based recommendation system optimizing long-term user engagement. Used DQN with experience replay, improved retention by 22%.',
    techStack: ['Python', 'PyTorch', 'Ray RLlib', 'Redis', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    keyFeatures: [
      'Deep Q-Network (DQN) for recommendations',
      'Experience replay for sample efficiency',
      'Reward shaping for long-term engagement',
      'Slate recommendations (multiple items)',
      'Off-policy evaluation',
      'Safe deployment with constraints',
    ],
    implementation: [
      {
        step: 'MDP Formulation',
        details: 'State: user history (last 10 items), user features, context. Action: recommend item from catalog (10K items). Reward: +1 for click, +5 for watch >50%, +10 for completion. Episode: user session.',
      },
      {
        step: 'DQN Architecture',
        details: 'Neural network: state → hidden layers → Q-values for each action. Used dueling architecture: separate value and advantage streams. Target network for stability. Trained with experience replay.',
      },
      {
        step: 'Experience Replay',
        details: 'Stored transitions (state, action, reward, next_state) in replay buffer. Sampled mini-batches for training. Broke correlation between consecutive samples. Improved sample efficiency by 10x.',
      },
      {
        step: 'Reward Shaping',
        details: 'Designed reward to optimize long-term engagement, not just clicks. Penalized repetitive recommendations. Rewarded diversity and exploration. Tuned reward weights through experimentation.',
      },
      {
        step: 'Off-Policy Evaluation',
        details: 'Evaluated RL policy using logged data from production. Used importance sampling to correct for distribution shift. Estimated policy value before deployment. Reduced risk of bad deployments.',
      },
    ],
    challenges: [
      'Large action space - used approximate Q-learning with item embeddings',
      'Delayed rewards - used n-step returns and eligibility traces',
      'Safe exploration - constrained actions to avoid bad recommendations',
    ],
    results: '22% improvement in user retention. 15% increase in watch time. Deployed for 2M+ users. Maintained recommendation quality.',
    interviewTips: [
      'Explain RL for recsys - optimizes long-term engagement',
      'Discuss DQN - deep learning for Q-learning',
      'Mention experience replay - improves sample efficiency',
      'Talk about off-policy evaluation - safe policy evaluation',
    ],
    githubIdeas: [
      'Show learning curves',
      'Include reward shaping experiments',
      'Document MDP formulation',
      'Add off-policy evaluation results',
    ],
  },
];
