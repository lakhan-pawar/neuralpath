// Resume-Ready AI/ML Projects - Part 6
// Final set to reach 50 comprehensive projects

import type { ResumeProject } from './resumeProjects1';

export const RESUME_PROJECTS_PART6: ResumeProject[] = [
  // DATA ENGINEERING FOR ML
  {
    id: 'data-eng-1',
    title: 'Real-Time ML Data Pipeline with Stream Processing',
    category: 'Data Engineering for ML',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    overview: 'Built real-time data pipeline processing 1M events/second. Kafka + Flink for stream processing, feature computation, and model serving.',
    techStack: ['Python', 'Apache Kafka', 'Apache Flink', 'PostgreSQL', 'Redis', 'Airflow', 'Kubernetes'],
    keyFeatures: [
      'Real-time event ingestion with Kafka',
      'Stream processing with Flink',
      'Windowed aggregations for features',
      'Exactly-once semantics',
      'Late data handling',
      'Monitoring and alerting',
    ],
    implementation: [
      {
        step: 'Event Ingestion',
        details: 'Kafka cluster with 10 brokers, 50 partitions per topic. Producers: web servers, mobile apps, IoT devices. Throughput: 1M events/second. Retention: 7 days. Compression: Snappy for 3x reduction.',
      },
      {
        step: 'Stream Processing',
        details: 'Flink jobs for feature computation. Windowed aggregations: count, sum, avg over 1min, 5min, 1hour windows. Stateful processing with RocksDB backend. Checkpointing every 1 minute for fault tolerance.',
      },
      {
        step: 'Feature Store Integration',
        details: 'Computed features written to Redis (online) and PostgreSQL (offline). Dual-write pattern for consistency. Features available <100ms after event. Used for real-time ML predictions.',
      },
      {
        step: 'Exactly-Once Semantics',
        details: 'Enabled Flink checkpointing and Kafka transactions. Idempotent writes to downstream systems. Handled failures gracefully: restart from last checkpoint. Zero data loss or duplication.',
      },
      {
        step: 'Monitoring',
        details: 'Tracked: event lag, processing latency, throughput, error rate. Grafana dashboards for visualization. Alerts for lag >1 minute or errors >1%. On-call rotation for incidents.',
      },
    ],
    challenges: [
      'Backpressure - tuned Kafka and Flink configs, added auto-scaling',
      'Late data - implemented watermarks and allowed lateness',
      'State size - optimized state backend, used incremental checkpoints',
    ],
    results: 'Processing 1M events/second with <1s latency. 99.99% uptime. Zero data loss. Enabled 20+ real-time ML models.',
    interviewTips: [
      'Explain stream processing - continuous data processing',
      'Discuss windowing - tumbling, sliding, session windows',
      'Mention exactly-once - critical for correctness',
      'Talk about backpressure - handling load spikes',
    ],
    githubIdeas: [
      'Show pipeline architecture diagram',
      'Include throughput and latency metrics',
      'Document Flink job configuration',
      'Add monitoring dashboard screenshots',
    ],
  },
  {
    id: 'data-eng-2',
    title: 'Data Quality Framework for ML Pipelines',
    category: 'Data Engineering for ML',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    overview: 'Implemented comprehensive data quality framework. Automated validation, profiling, and monitoring. Prevented 50+ data quality issues from reaching production.',
    techStack: ['Python', 'Great Expectations', 'dbt', 'Airflow', 'PostgreSQL', 'Slack'],
    keyFeatures: [
      'Automated data validation',
      'Data profiling and statistics',
      'Schema evolution detection',
      'Anomaly detection in data',
      'Data lineage tracking',
      'Automated alerting and reporting',
    ],
    implementation: [
      {
        step: 'Validation Framework',
        details: 'Used Great Expectations for validation. Defined expectations: schema, null rates, value ranges, distributions. Ran validations in Airflow DAGs. Failed validations block downstream tasks.',
      },
      {
        step: 'Data Profiling',
        details: 'Generated data profiles: column types, missing values, unique values, distributions. Tracked profiles over time. Detected drift: distribution shifts, new values, schema changes. Alerted on significant changes.',
      },
      {
        step: 'Schema Evolution',
        details: 'Monitored schema changes: new columns, type changes, column removals. Validated backward compatibility. Automated migration scripts for breaking changes. Maintained schema registry.',
      },
      {
        step: 'Anomaly Detection',
        details: 'Detected anomalies in data: sudden spikes, missing data, outliers. Used statistical methods (z-score, IQR) and ML (isolation forest). Flagged anomalies for investigation.',
      },
      {
        step: 'Reporting',
        details: 'Generated daily data quality reports. Metrics: validation pass rate, anomaly count, schema changes. Sent to Slack and email. Created dashboard for historical trends.',
      },
    ],
    challenges: [
      'False positives - tuned thresholds using historical data',
      'Performance - optimized validation queries, used sampling',
      'Alert fatigue - prioritized critical issues, batched notifications',
    ],
    results: 'Prevented 50+ data quality issues. Reduced data incidents by 80%. Improved data trust across teams. Saved 100+ hours of debugging.',
    interviewTips: [
      'Explain data quality - accuracy, completeness, consistency',
      'Discuss validation - proactive vs reactive',
      'Mention schema evolution - handling changes safely',
      'Talk about impact - preventing bad data from affecting models',
    ],
    githubIdeas: [
      'Show validation examples',
      'Include data quality metrics over time',
      'Document expectation definitions',
      'Add anomaly detection examples',
    ],
  },

  // MLOPS & INFRASTRUCTURE
  {
    id: 'mlops-1',
    title: 'End-to-End MLOps Platform with CI/CD',
    category: 'MLOps & Infrastructure',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    overview: 'Built complete MLOps platform for model lifecycle management. Automated training, testing, deployment, and monitoring. Reduced deployment time from weeks to hours.',
    techStack: ['Python', 'MLflow', 'Kubeflow', 'GitHub Actions', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
    keyFeatures: [
      'Automated model training pipeline',
      'Model versioning and registry',
      'Automated testing and validation',
      'Blue-green deployments',
      'Canary releases with traffic splitting',
      'Model monitoring and alerting',
    ],
    implementation: [
      {
        step: 'Training Pipeline',
        details: 'Kubeflow pipelines for training. Steps: data validation → preprocessing → training → evaluation → registration. Parameterized for experimentation. Tracked with MLflow. Ran on Kubernetes for scalability.',
      },
      {
        step: 'Model Registry',
        details: 'MLflow model registry for versioning. Stages: staging, production, archived. Metadata: metrics, parameters, artifacts. Approval workflow for production promotion. API for programmatic access.',
      },
      {
        step: 'CI/CD Pipeline',
        details: 'GitHub Actions for automation. On PR: run tests, validate model. On merge: build Docker image, push to registry. On tag: deploy to staging, run integration tests, deploy to production.',
      },
      {
        step: 'Deployment Strategy',
        details: 'Blue-green deployment: maintain two environments. Deploy to green, test, switch traffic. Instant rollback if issues. Canary releases: gradually shift traffic (10% → 50% → 100%). Monitor metrics at each stage.',
      },
      {
        step: 'Monitoring',
        details: 'Prometheus for metrics: latency, throughput, error rate, model accuracy. Grafana dashboards for visualization. Alerts for SLA violations. Automated rollback on critical issues.',
      },
    ],
    challenges: [
      'Environment consistency - used Docker and infrastructure as code',
      'Testing ML models - implemented data validation, model validation, integration tests',
      'Rollback complexity - automated rollback with health checks',
    ],
    results: 'Reduced deployment time from 2 weeks to 2 hours. Deployed 100+ models. Zero-downtime deployments. 99.9% uptime.',
    interviewTips: [
      'Explain MLOps - DevOps for ML systems',
      'Discuss CI/CD - automated testing and deployment',
      'Mention deployment strategies - blue-green, canary',
      'Talk about monitoring - critical for ML in production',
    ],
    githubIdeas: [
      'Show pipeline architecture',
      'Include deployment workflow diagram',
      'Document CI/CD configuration',
      'Add monitoring dashboard screenshots',
    ],
  },
  {
    id: 'mlops-2',
    title: 'Model Explainability and Interpretability Platform',
    category: 'MLOps & Infrastructure',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    overview: 'Built platform for model explainability. SHAP, LIME, counterfactuals for global and local explanations. Improved model trust and debugging.',
    techStack: ['Python', 'SHAP', 'LIME', 'Streamlit', 'FastAPI', 'PostgreSQL', 'Plotly'],
    keyFeatures: [
      'Global feature importance with SHAP',
      'Local explanations with LIME',
      'Counterfactual explanations',
      'Partial dependence plots',
      'Interactive visualization dashboard',
      'Explanation caching for performance',
    ],
    implementation: [
      {
        step: 'SHAP Integration',
        details: 'Computed SHAP values for model predictions. TreeExplainer for tree models, KernelExplainer for black-box models. Generated summary plots, dependence plots, force plots. Identified most important features globally.',
      },
      {
        step: 'LIME Explanations',
        details: 'Generated local explanations for individual predictions. Perturbed input, trained local linear model. Showed which features contributed to prediction. Useful for debugging specific cases.',
      },
      {
        step: 'Counterfactuals',
        details: 'Generated counterfactual examples: minimal changes to flip prediction. Used DiCE library. Example: "If income increased by $5K, loan would be approved." Helped users understand decision boundaries.',
      },
      {
        step: 'Visualization Dashboard',
        details: 'Built Streamlit dashboard for exploration. Features: upload data, select model, view explanations. Interactive plots with Plotly. Export explanations as PDF reports.',
      },
      {
        step: 'Performance Optimization',
        details: 'SHAP computation is expensive. Cached explanations in PostgreSQL. Computed on sample for large datasets. Used approximate SHAP for speed. Reduced explanation time from minutes to seconds.',
      },
    ],
    challenges: [
      'Computational cost - used sampling and approximation',
      'Explanation quality - validated with domain experts',
      'User understanding - simplified visualizations and added tooltips',
    ],
    results: 'Generated explanations for 50+ models. Improved model debugging efficiency by 60%. Increased stakeholder trust in ML. Used in 20+ business decisions.',
    interviewTips: [
      'Explain SHAP - game theory-based feature attribution',
      'Discuss LIME - local linear approximation',
      'Mention counterfactuals - actionable explanations',
      'Talk about trade-offs - accuracy vs interpretability',
    ],
    githubIdeas: [
      'Show explanation examples',
      'Include SHAP summary plots',
      'Document explanation methods',
      'Add dashboard screenshots',
    ],
  },

  // EDGE AI & MOBILE ML
  {
    id: 'edge-1',
    title: 'On-Device ML for Mobile Applications',
    category: 'Edge AI & Mobile ML',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Deployed ML models on mobile devices using TensorFlow Lite. Achieved <50ms inference on smartphones with 95% accuracy.',
    techStack: ['Python', 'TensorFlow', 'TensorFlow Lite', 'CoreML', 'Android', 'iOS', 'Kotlin', 'Swift'],
    keyFeatures: [
      'Model quantization for mobile',
      'On-device inference with TFLite',
      'Federated learning for privacy',
      'Model updates over-the-air',
      'Battery and memory optimization',
      'Cross-platform deployment',
    ],
    implementation: [
      {
        step: 'Model Optimization',
        details: 'Trained MobileNetV3 for image classification. Applied post-training quantization: INT8 weights and activations. Reduced model size from 15MB to 4MB. Accuracy drop <2%. Optimized for mobile CPUs.',
      },
      {
        step: 'TensorFlow Lite Conversion',
        details: 'Converted TensorFlow model to TFLite format. Optimized for mobile: fused operations, removed unused ops. Validated accuracy on test set. Generated metadata for easy integration.',
      },
      {
        step: 'Mobile Integration',
        details: 'Android: used TFLite Java API. iOS: converted to CoreML for better performance. Implemented preprocessing in native code. Added GPU acceleration using GPU delegate. Achieved <50ms inference.',
      },
      {
        step: 'Federated Learning',
        details: 'Implemented federated learning for privacy. Models trained on-device, only updates sent to server. Aggregated updates using FedAvg. Improved model without accessing user data.',
      },
      {
        step: 'OTA Updates',
        details: 'Implemented model versioning and updates. Downloaded new models in background. A/B tested models on device. Rolled back if performance degraded. Reduced app update frequency.',
      },
    ],
    challenges: [
      'Model size - used quantization and pruning',
      'Inference speed - optimized with GPU and NNAPI',
      'Battery consumption - batched inferences and used efficient models',
    ],
    results: '<50ms inference on mid-range phones. 4MB model size. 95% accuracy. Deployed to 1M+ devices. Privacy-preserving with federated learning.',
    interviewTips: [
      'Explain mobile ML challenges - size, speed, battery',
      'Discuss quantization - reducing precision for efficiency',
      'Mention federated learning - privacy-preserving training',
      'Talk about deployment - OTA updates, versioning',
    ],
    githubIdeas: [
      'Show model size and accuracy trade-offs',
      'Include inference benchmarks by device',
      'Document optimization techniques',
      'Add federated learning architecture',
    ],
  },
  {
    id: 'edge-2',
    title: 'IoT Anomaly Detection on Edge Devices',
    category: 'Edge AI & Mobile ML',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    overview: 'Deployed anomaly detection on IoT devices (Raspberry Pi). Detected equipment failures in real-time, reduced downtime by 40%.',
    techStack: ['Python', 'TensorFlow Lite', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi'],
    keyFeatures: [
      'Lightweight autoencoder for anomaly detection',
      'Real-time inference on Raspberry Pi',
      'MQTT for device communication',
      'Local alerting and cloud sync',
      'Battery-powered operation',
      'OTA model updates',
    ],
    implementation: [
      {
        step: 'Model Development',
        details: 'Trained LSTM autoencoder on sensor data (temperature, vibration, pressure). Compressed to 1MB using quantization. Converted to TFLite. Validated on Raspberry Pi: 10ms inference.',
      },
      {
        step: 'Edge Deployment',
        details: 'Deployed on Raspberry Pi 4. Read sensor data every second. Ran inference locally. Detected anomalies using reconstruction error threshold. Stored results in local SQLite.',
      },
      {
        step: 'Communication',
        details: 'Used MQTT for device-to-cloud communication. Published anomalies to cloud. Subscribed to model updates. Implemented offline mode: queue messages, sync when online.',
      },
      {
        step: 'Alerting',
        details: 'Local alerting: LED indicator, buzzer for critical anomalies. Cloud alerting: email, SMS, PagerDuty. Configurable thresholds per device. Reduced false positives with hysteresis.',
      },
      {
        step: 'Power Optimization',
        details: 'Implemented sleep mode between readings. Used efficient inference (TFLite). Reduced CPU frequency when idle. Achieved 7-day battery life on portable devices.',
      },
    ],
    challenges: [
      'Limited compute - optimized model and used efficient inference',
      'Connectivity - implemented offline mode and message queuing',
      'Power constraints - optimized for battery life',
    ],
    results: 'Detected 95% of equipment failures. <1% false positive rate. Reduced downtime by 40%. Deployed on 500+ devices.',
    interviewTips: [
      'Explain edge AI - inference on device, not cloud',
      'Discuss constraints - compute, memory, power',
      'Mention MQTT - lightweight messaging for IoT',
      'Talk about offline operation - critical for edge devices',
    ],
    githubIdeas: [
      'Show deployment architecture',
      'Include inference benchmarks',
      'Document power optimization',
      'Add anomaly detection examples',
    ],
  },

  // AUDIO & SPEECH
  {
    id: 'audio-1',
    title: 'Real-Time Speech Recognition System',
    category: 'Audio & Speech Processing',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Built real-time speech recognition using Whisper and streaming inference. Achieved 5% WER with <500ms latency.',
    techStack: ['Python', 'Whisper', 'PyTorch', 'WebRTC', 'FastAPI', 'Redis', 'WebSockets'],
    keyFeatures: [
      'Streaming speech recognition',
      'Speaker diarization',
      'Punctuation and capitalization',
      'Multi-language support',
      'Real-time transcription',
      'Noise robustness',
    ],
    implementation: [
      {
        step: 'Model Selection',
        details: 'Used Whisper medium model (769M params). Balanced accuracy and speed. Fine-tuned on domain-specific data. Achieved 5% WER on test set. Optimized with TensorRT for 2x speedup.',
      },
      {
        step: 'Streaming Implementation',
        details: 'Implemented sliding window approach. Processed 30-second chunks with 5-second overlap. Used VAD (Voice Activity Detection) to segment speech. Merged overlapping transcriptions.',
      },
      {
        step: 'Speaker Diarization',
        details: 'Used pyannote.audio for speaker identification. Clustered speaker embeddings. Assigned speaker labels to transcription segments. Formatted output: "[Speaker 1]: Hello [Speaker 2]: Hi".',
      },
      {
        step: 'Real-Time Pipeline',
        details: 'WebRTC for audio capture. WebSocket for streaming to server. Server: buffered audio, ran inference, sent transcription. Client: displayed transcription in real-time. Latency: <500ms.',
      },
      {
        step: 'Post-Processing',
        details: 'Added punctuation using BERT-based model. Capitalized proper nouns. Corrected common errors using language model. Improved readability significantly.',
      },
    ],
    challenges: [
      'Latency - optimized model and used streaming',
      'Accuracy in noise - fine-tuned on noisy data',
      'Speaker overlap - used source separation',
    ],
    results: '5% WER on clean speech. <500ms latency. Supported 10 languages. Processed 10K+ hours of audio.',
    interviewTips: [
      'Explain Whisper - OpenAI speech recognition model',
      'Discuss streaming - processing audio in real-time',
      'Mention diarization - identifying speakers',
      'Talk about latency - critical for real-time applications',
    ],
    githubIdeas: [
      'Show WER by language and noise level',
      'Include latency breakdown',
      'Document streaming architecture',
      'Add transcription examples',
    ],
  },
  {
    id: 'audio-2',
    title: 'Text-to-Speech System with Voice Cloning',
    category: 'Audio & Speech Processing',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    overview: 'Built TTS system with voice cloning. Generated natural speech from text, cloned voices from 10-second samples.',
    techStack: ['Python', 'Coqui TTS', 'PyTorch', 'FastAPI', 'Redis', 'S3'],
    keyFeatures: [
      'Neural TTS with Tacotron 2',
      'Voice cloning from short samples',
      'Multi-speaker support',
      'Emotion and prosody control',
      'Real-time synthesis',
      'Audio quality enhancement',
    ],
    implementation: [
      {
        step: 'TTS Model',
        details: 'Used Tacotron 2 for mel-spectrogram generation. WaveGlow vocoder for audio synthesis. Trained on 20 hours of speech data. Achieved MOS (Mean Opinion Score) 4.2/5.',
      },
      {
        step: 'Voice Cloning',
        details: 'Implemented speaker encoder: extracts voice embedding from 10-second sample. Conditioned TTS model on embedding. Generated speech in target voice. Supported 100+ voices.',
      },
      {
        step: 'Prosody Control',
        details: 'Added prosody controls: pitch, speed, energy. Used SSML (Speech Synthesis Markup Language) for fine-grained control. Enabled emotional speech: happy, sad, angry.',
      },
      {
        step: 'Real-Time Synthesis',
        details: 'Optimized inference with TensorRT. Achieved 0.5x real-time (generate 1s audio in 0.5s). Implemented streaming synthesis for long texts. Cached common phrases.',
      },
      {
        step: 'Audio Enhancement',
        details: 'Applied noise reduction and normalization. Used audio codec (Opus) for compression. Implemented audio quality metrics (PESQ, STOI). Ensured high-quality output.',
      },
    ],
    challenges: [
      'Voice quality - fine-tuned on high-quality data',
      'Cloning accuracy - used larger speaker encoder',
      'Synthesis speed - optimized with TensorRT',
    ],
    results: 'MOS 4.2/5 for naturalness. Cloned 100+ voices. 0.5x real-time synthesis. Deployed for 50K+ users.',
    interviewTips: [
      'Explain TTS - text to mel-spectrogram to audio',
      'Discuss voice cloning - speaker embeddings',
      'Mention prosody - rhythm and intonation',
      'Talk about evaluation - MOS, PESQ, STOI',
    ],
    githubIdeas: [
      'Include audio samples',
      'Show MOS scores',
      'Document voice cloning process',
      'Add prosody control examples',
    ],
  },

  // GENERATIVE AI
  {
    id: 'genai-1',
    title: 'Stable Diffusion Fine-Tuning for Custom Image Generation',
    category: 'Generative AI',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Fine-tuned Stable Diffusion for brand-specific image generation. Used DreamBooth and LoRA, generated 10K+ images for marketing.',
    techStack: ['Python', 'Diffusers', 'PyTorch', 'Accelerate', 'Weights & Biases', 'S3', 'Gradio'],
    keyFeatures: [
      'DreamBooth for subject-driven generation',
      'LoRA for efficient fine-tuning',
      'Prompt engineering and optimization',
      'Negative prompts for quality',
      'Image-to-image generation',
      'Batch generation pipeline',
    ],
    implementation: [
      {
        step: 'Data Preparation',
        details: 'Collected 20 images of target subject (product, person, style). Captioned images with detailed descriptions. Applied augmentation: cropping, flipping. Created regularization images to prevent overfitting.',
      },
      {
        step: 'DreamBooth Training',
        details: 'Fine-tuned Stable Diffusion v1.5 with DreamBooth. Used unique identifier: "sks [subject]". Trained for 800 steps with prior preservation. Learning rate 5e-6. Achieved high subject fidelity.',
      },
      {
        step: 'LoRA Fine-Tuning',
        details: 'Applied LoRA to reduce trainable parameters. Rank 4, alpha 32. Trained only 0.5% of parameters. Faster training, smaller model size. Merged LoRA weights for inference.',
      },
      {
        step: 'Prompt Engineering',
        details: 'Developed prompt templates for consistency. Used negative prompts to avoid artifacts. Experimented with guidance scale (7-15). Created prompt library for common use cases.',
      },
      {
        step: 'Production Pipeline',
        details: 'Built Gradio interface for generation. Batch generation: 100 images/hour. Stored in S3 with metadata. Implemented content filtering for safety. Tracked generation costs.',
      },
    ],
    challenges: [
      'Overfitting - used regularization images and early stopping',
      'Prompt sensitivity - extensive prompt engineering',
      'Generation quality - tuned hyperparameters and used negative prompts',
    ],
    results: 'Generated 10K+ high-quality images. Reduced design time by 80%. Saved $50K in stock photo costs. 95% user satisfaction.',
    interviewTips: [
      'Explain DreamBooth - personalizing diffusion models',
      'Discuss LoRA - efficient fine-tuning',
      'Mention prompt engineering - critical for quality',
      'Talk about safety - content filtering, bias mitigation',
    ],
    githubIdeas: [
      'Show generated image examples',
      'Include training curves',
      'Document prompt templates',
      'Add comparison: base vs fine-tuned',
    ],
  },
  {
    id: 'genai-2',
    title: 'AI Code Generation Assistant with Fine-Tuned CodeLlama',
    category: 'Generative AI',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Built code generation assistant by fine-tuning CodeLlama. Achieved 75% pass@1 on internal benchmarks, improved developer productivity by 30%.',
    techStack: ['Python', 'Transformers', 'PEFT', 'vLLM', 'FastAPI', 'PostgreSQL', 'VS Code Extension'],
    keyFeatures: [
      'Code completion and generation',
      'Multi-language support (Python, JavaScript, Java)',
      'Context-aware suggestions',
      'Code explanation and documentation',
      'Bug detection and fixing',
      'Unit test generation',
    ],
    implementation: [
      {
        step: 'Dataset Creation',
        details: 'Collected 100K code snippets from internal repos. Filtered for quality: working code, good practices. Created instruction-response pairs. Format: "Write a function to..." → code. Split by language.',
      },
      {
        step: 'Fine-Tuning',
        details: 'Fine-tuned CodeLlama 13B using LoRA. Rank 16, alpha 32. Trained for 3 epochs. Used instruction tuning format. Achieved 75% pass@1 on HumanEval-style benchmark.',
      },
      {
        step: 'Inference Optimization',
        details: 'Deployed with vLLM for efficient serving. Implemented continuous batching. Used KV cache for faster generation. Achieved <2s generation time for 100 tokens.',
      },
      {
        step: 'VS Code Extension',
        details: 'Built extension for inline suggestions. Triggered on keystroke or command. Sent context (current file, imports) to API. Displayed suggestions with syntax highlighting. Added accept/reject tracking.',
      },
      {
        step: 'Evaluation',
        details: 'Measured: pass@1 (code correctness), acceptance rate, time saved. Ran A/B test with developers. Collected feedback for improvement. Iterated on prompts and model.',
      },
    ],
    challenges: [
      'Code quality - filtered training data and added validation',
      'Context length - used sliding window and summarization',
      'Latency - optimized inference and used caching',
    ],
    results: '75% pass@1 on benchmarks. 60% suggestion acceptance rate. 30% productivity improvement. Used by 200+ developers.',
    interviewTips: [
      'Explain CodeLlama - LLM specialized for code',
      'Discuss instruction tuning - teaching model to follow instructions',
      'Mention evaluation - pass@k, acceptance rate',
      'Talk about developer experience - latency, accuracy, trust',
    ],
    githubIdeas: [
      'Show code generation examples',
      'Include pass@k metrics',
      'Document fine-tuning process',
      'Add developer feedback and metrics',
    ],
  },
];
