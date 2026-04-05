// Resume-Ready AI/ML Projects - Part 3

import type { ResumeProject } from './resumeProjects1';

export const RESUME_PROJECTS_PART3: ResumeProject[] = [
  // AGENTIC AI PROJECTS
  {
    id: 'agentic-1',
    title: 'Agentic Workflow for Data Analysis',
    category: 'Agentic AI',
    difficulty: 'Advanced',
    duration: '3-4 weeks',
    overview: 'Built an agentic system that autonomously analyzes datasets, generates insights, creates visualizations, and writes analysis reports. Uses multiple specialized agents working together.',
    techStack: ['Python', 'LangGraph', 'GPT-4', 'Pandas', 'Plotly', 'Jupyter', 'DuckDB'],
    keyFeatures: [
      'Automatic data profiling and quality checks',
      'Statistical analysis with hypothesis testing',
      'Automated visualization generation',
      'Natural language insight generation',
      'Report writing with executive summary',
      'Anomaly detection and alerting',
    ],
    implementation: [
      {
        step: 'Data Profiling Agent',
        details: 'Analyzed dataset schema, data types, missing values, distributions. Generated summary statistics. Identified potential issues (duplicates, outliers, inconsistencies). Used pandas-profiling for initial analysis.',
      },
      {
        step: 'Analysis Planning Agent',
        details: 'Based on data profile, planned analysis strategy. Example: time-series data → trend analysis, categorical data → distribution analysis. Generated analysis DAG (directed acyclic graph).',
      },
      {
        step: 'Statistical Agent',
        details: 'Performed statistical tests: t-tests, ANOVA, correlation analysis, regression. Interpreted p-values and effect sizes. Generated natural language explanations of findings.',
      },
      {
        step: 'Visualization Agent',
        details: 'Created appropriate charts: line plots for trends, bar charts for categories, scatter plots for correlations. Used Plotly for interactive visualizations. Applied best practices (clear labels, color schemes).',
      },
      {
        step: 'Report Generation Agent',
        details: 'Synthesized all findings into structured report. Sections: Executive Summary, Data Overview, Key Findings, Visualizations, Recommendations. Generated as Jupyter notebook and PDF.',
      },
    ],
    challenges: [
      'Handling diverse data types - created type-specific analysis strategies',
      'Choosing appropriate tests - used decision tree based on data characteristics',
      'Report coherence - ensured agents\' outputs flow logically, added narrative generation',
    ],
    results: 'Analyzed 30+ datasets with 90% insight accuracy. Reduced analysis time from 4 hours to 15 minutes. Discovered 5 previously unknown patterns.',
    interviewTips: [
      'Explain agentic workflow - autonomous agents collaborating on complex task',
      'Discuss agent specialization - each agent has specific expertise',
      'Mention orchestration - LangGraph manages agent coordination',
      'Talk about evaluation - compared agent insights with human analyst findings',
    ],
    githubIdeas: [
      'Include sample analysis reports',
      'Show agent workflow diagram',
      'Document analysis decision tree',
      'Add before/after: manual vs agentic analysis time',
    ],
  },
  {
    id: 'agentic-2',
    title: 'Self-Improving Agentic System with Feedback Loop',
    category: 'Agentic AI',
    difficulty: 'Advanced',
    duration: '5 weeks',
    overview: 'Created an agentic system that learns from its mistakes and improves over time. Collects feedback, analyzes failures, updates prompts and strategies automatically.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'PostgreSQL', 'MLflow', 'Prometheus', 'Grafana'],
    keyFeatures: [
      'Automatic failure detection and logging',
      'Root cause analysis of failures',
      'Prompt optimization through experimentation',
      'Strategy evolution (A/B testing)',
      'Performance monitoring dashboard',
      'Rollback capability for bad updates',
    ],
    implementation: [
      {
        step: 'Feedback Collection',
        details: 'Collected explicit feedback (user ratings) and implicit feedback (task success/failure, execution time). Stored in PostgreSQL with task context. Tagged failures with error types.',
      },
      {
        step: 'Failure Analysis',
        details: 'Used GPT-4 to analyze failed tasks. Prompt: "Why did this task fail? What could be improved?" Model identified patterns: prompt ambiguity, missing tools, incorrect reasoning.',
      },
      {
        step: 'Prompt Evolution',
        details: 'Generated prompt variations using LLM. Tested each variation on historical failures. Measured success rate improvement. Kept best-performing prompts. Used genetic algorithm for prompt optimization.',
      },
      {
        step: 'Strategy A/B Testing',
        details: 'Ran multiple strategies in parallel (e.g., ReAct vs Plan-and-Execute). Routed 10% of traffic to new strategies. Measured success rate, latency, cost. Gradually shifted traffic to winner.',
      },
      {
        step: 'Monitoring and Rollback',
        details: 'Tracked metrics: success rate, latency, cost per task. Set alerts for degradation. If new strategy performs worse, automatic rollback to previous version. Stored all versions in MLflow.',
      },
    ],
    challenges: [
      'Evaluation metrics - hard to measure "quality" automatically, used combination of success rate and human feedback',
      'Overfitting to feedback - agent optimized for specific cases, added diversity penalty',
      'Stability - frequent updates caused instability, implemented staged rollout',
    ],
    results: 'Improved success rate from 70% to 88% over 4 weeks. Reduced average task time by 25%. System adapted to new task types without manual intervention.',
    interviewTips: [
      'Explain self-improvement - agent learns from experience like humans',
      'Discuss prompt optimization - systematic search for better prompts',
      'Mention A/B testing - rigorous evaluation of changes',
      'Talk about production ML - monitoring, rollback, versioning',
    ],
    githubIdeas: [
      'Show success rate improvement over time',
      'Include prompt evolution examples',
      'Document A/B test results',
      'Add monitoring dashboard screenshots',
    ],
  },
  {
    id: 'agentic-3',
    title: 'Agentic Customer Support System',
    category: 'Agentic AI',
    difficulty: 'Intermediate',
    duration: '3 weeks',
    overview: 'Developed an agentic customer support system that handles tickets autonomously: understands issues, searches knowledge base, generates solutions, and escalates when needed.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'Pinecone', 'Zendesk API', 'Slack API', 'Redis'],
    keyFeatures: [
      'Automatic ticket classification and prioritization',
      'Knowledge base search with RAG',
      'Solution generation with step-by-step instructions',
      'Escalation to human agents when uncertain',
      'Follow-up question handling',
      'Customer satisfaction tracking',
    ],
    implementation: [
      {
        step: 'Ticket Classification',
        details: 'Used GPT-4 to classify tickets: technical issue, billing question, feature request, bug report. Assigned priority (low/medium/high/urgent) based on keywords and sentiment. Routed to appropriate queue.',
      },
      {
        step: 'Knowledge Base RAG',
        details: 'Indexed support docs, FAQs, past tickets in Pinecone. Retrieved relevant articles for each ticket. Used hybrid search (semantic + keyword) for better recall. Re-ranked results by recency and helpfulness.',
      },
      {
        step: 'Solution Generation',
        details: 'Generated solutions using retrieved knowledge. Format: 1) Problem summary, 2) Step-by-step solution, 3) Additional resources. Added troubleshooting tips for common issues.',
      },
      {
        step: 'Confidence-Based Escalation',
        details: 'Agent estimated confidence (0-100) for each solution. If <70, escalated to human. Included agent\'s analysis and attempted solutions. This helped humans resolve faster.',
      },
      {
        step: 'Feedback Loop',
        details: 'Asked customers: "Did this solve your issue?" Stored feedback with ticket. Used to improve retrieval and generation. High-rated solutions added to knowledge base.',
      },
    ],
    challenges: [
      'Handling edge cases - unusual issues not in knowledge base, improved escalation logic',
      'Maintaining consistency - agent gave different answers to similar questions, added answer caching',
      'Customer trust - some customers skeptical of AI, added transparency ("AI-assisted response")',
    ],
    results: 'Resolved 60% of tickets autonomously. Reduced average resolution time from 4 hours to 30 minutes. Customer satisfaction: 4.1/5 for AI responses.',
    interviewTips: [
      'Explain agentic support - agent acts autonomously but knows its limits',
      'Discuss confidence estimation - critical for knowing when to escalate',
      'Mention customer experience - AI should enhance, not replace human support',
      'Talk about metrics - resolution rate, time, satisfaction',
    ],
    githubIdeas: [
      'Show sample ticket resolutions',
      'Include confidence distribution chart',
      'Document escalation criteria',
      'Add customer satisfaction trends',
    ],
  },

  // LOGGING & OBSERVABILITY PROJECTS
  {
    id: 'logging-1',
    title: 'LLM Observability Platform with Tracing',
    category: 'AI Logging & Observability',
    difficulty: 'Advanced',
    duration: '4 weeks',
    overview: 'Built a comprehensive observability platform for LLM applications. Tracks prompts, completions, latency, costs, and errors. Provides debugging tools and analytics dashboard.',
    techStack: ['Python', 'LangSmith', 'OpenTelemetry', 'PostgreSQL', 'ClickHouse', 'Grafana', 'FastAPI'],
    keyFeatures: [
      'Distributed tracing for multi-step LLM chains',
      'Prompt versioning and comparison',
      'Token usage and cost tracking',
      'Error monitoring and alerting',
      'Performance analytics dashboard',
      'Replay and debugging tools',
    ],
    implementation: [
      {
        step: 'Instrumentation',
        details: 'Wrapped LangChain components with OpenTelemetry spans. Captured: prompt, completion, model, tokens, latency, cost. Added custom attributes: user_id, session_id, chain_type. Minimal performance overhead (<5ms).',
      },
      {
        step: 'Trace Collection',
        details: 'Sent traces to collector service. Stored in ClickHouse for fast analytics. Indexed by timestamp, user, model. Retained traces for 90 days. Implemented sampling (10%) for high-volume apps.',
      },
      {
        step: 'Prompt Versioning',
        details: 'Stored prompt templates with version numbers. Tracked which version used for each request. Enabled A/B testing: compare metrics across prompt versions. Identified best-performing prompts.',
      },
      {
        step: 'Cost Tracking',
        details: 'Calculated cost per request using model pricing. Aggregated by user, endpoint, time period. Set budget alerts. Identified expensive queries for optimization. Saved 30% on API costs.',
      },
      {
        step: 'Debugging Tools',
        details: 'Built trace viewer: visualize chain execution as tree. Added replay: re-run failed requests with same inputs. Implemented diff tool: compare successful vs failed traces.',
      },
    ],
    challenges: [
      'High cardinality data - millions of unique prompts, used sampling and aggregation',
      'Storage costs - ClickHouse compressed data 10x, used tiered storage',
      'Real-time analytics - pre-aggregated common queries, used materialized views',
    ],
    results: 'Monitored 1M+ LLM requests/day. Reduced debugging time from hours to minutes. Identified and fixed 15 performance bottlenecks. Saved $5k/month on API costs.',
    interviewTips: [
      'Explain observability - monitoring, logging, tracing combined',
      'Discuss distributed tracing - tracks requests across multiple services',
      'Mention cardinality challenges - unique prompts create high cardinality',
      'Talk about cost optimization - observability helps identify waste',
    ],
    githubIdeas: [
      'Include dashboard screenshots',
      'Show trace visualization examples',
      'Document instrumentation code',
      'Add cost savings analysis',
    ],
  },
  {
    id: 'logging-2',
    title: 'LLM Evaluation and Testing Framework',
    category: 'AI Logging & Observability',
    difficulty: 'Intermediate',
    duration: '3 weeks',
    overview: 'Created a framework for systematically evaluating LLM outputs. Includes test suites, automated grading, regression detection, and continuous evaluation in production.',
    techStack: ['Python', 'Pytest', 'LangChain', 'GPT-4', 'Weights & Biases', 'GitHub Actions'],
    keyFeatures: [
      'Test case management with golden datasets',
      'Automated evaluation with LLM-as-judge',
      'Regression detection across prompt changes',
      'Continuous evaluation in production',
      'Performance benchmarking',
      'Evaluation report generation',
    ],
    implementation: [
      {
        step: 'Test Suite Design',
        details: 'Created golden dataset: 100 input-output pairs covering edge cases. Organized by category: factual, reasoning, creative, safety. Stored in YAML for version control. Added difficulty labels.',
      },
      {
        step: 'Automated Grading',
        details: 'Used GPT-4 as judge to grade outputs (0-10). Criteria: accuracy, relevance, coherence, safety. Compared against golden outputs. Calculated aggregate scores. Validated judge with human agreement (85%).',
      },
      {
        step: 'Regression Testing',
        details: 'Ran test suite on every prompt change. Compared scores with baseline. Flagged regressions (>5% score drop). Blocked deployment if critical tests failed. Integrated with CI/CD.',
      },
      {
        step: 'Production Evaluation',
        details: 'Sampled 1% of production requests. Evaluated with same criteria. Tracked metrics over time. Detected quality degradation early. Set up alerts for score drops.',
      },
      {
        step: 'Benchmarking',
        details: 'Compared multiple models (GPT-4, Claude, Llama) on same test suite. Measured: accuracy, latency, cost. Generated comparison report. Helped choose optimal model for each use case.',
      },
    ],
    challenges: [
      'Judge consistency - GPT-4 gave different scores for same output, used temperature=0 and multiple runs',
      'Test coverage - hard to cover all edge cases, continuously added failing production cases',
      'Evaluation cost - grading is expensive, used cheaper model (GPT-3.5) for simple cases',
    ],
    results: 'Prevented 10+ regressions from reaching production. Improved average quality score from 7.2 to 8.5. Reduced evaluation time from manual (2 hours) to automated (5 minutes).',
    interviewTips: [
      'Explain LLM-as-judge - using LLM to evaluate LLM outputs',
      'Discuss golden datasets - curated test cases with expected outputs',
      'Mention regression testing - ensures changes don\'t break existing functionality',
      'Talk about evaluation challenges - subjective quality, expensive grading',
    ],
    githubIdeas: [
      'Include sample test cases',
      'Show evaluation report examples',
      'Document grading criteria and prompts',
      'Add benchmark comparison tables',
    ],
  },
  {
    id: 'logging-3',
    title: 'Prompt Injection Detection and Monitoring',
    category: 'AI Logging & Observability',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    overview: 'Built a security monitoring system that detects and blocks prompt injection attacks. Uses pattern matching, ML classification, and LLM-based detection.',
    techStack: ['Python', 'FastAPI', 'Scikit-learn', 'GPT-4', 'Redis', 'Prometheus', 'Grafana'],
    keyFeatures: [
      'Real-time prompt injection detection',
      'Multi-layer defense (rules + ML + LLM)',
      'Attack pattern database',
      'Automatic blocking and alerting',
      'Attack analytics dashboard',
      'False positive feedback loop',
    ],
    implementation: [
      {
        step: 'Rule-Based Detection',
        details: 'Created regex patterns for common attacks: "ignore previous instructions", "system:", "jailbreak". Checked prompts against patterns. Fast (<1ms) but limited coverage. Caught 40% of attacks.',
      },
      {
        step: 'ML Classification',
        details: 'Trained binary classifier (Random Forest) on labeled dataset of 10k prompts (benign vs malicious). Features: prompt length, special char ratio, keyword presence. Achieved 92% accuracy. Inference: 5ms.',
      },
      {
        step: 'LLM-Based Detection',
        details: 'Used GPT-4 to detect sophisticated attacks. Prompt: "Is this a prompt injection attempt?" Model explains reasoning. Slower (500ms) but catches novel attacks. Used as final layer.',
      },
      {
        step: 'Defense Strategy',
        details: 'Layer 1 (rules): Block obvious attacks. Layer 2 (ML): Flag suspicious prompts. Layer 3 (LLM): Analyze flagged prompts. If confirmed attack, block and alert. Logged all attempts.',
      },
      {
        step: 'Monitoring Dashboard',
        details: 'Tracked: attack attempts/day, attack types, blocked vs allowed, false positives. Visualized attack patterns. Set up alerts for attack spikes. Reviewed false positives weekly.',
      },
    ],
    challenges: [
      'False positives - legitimate prompts flagged as attacks, tuned thresholds and added whitelist',
      'Novel attacks - attackers adapt, used LLM layer to catch new patterns',
      'Latency - security checks added 50ms, optimized with caching and parallel execution',
    ],
    results: 'Blocked 500+ attack attempts with 95% accuracy. False positive rate: 2%. Zero successful attacks in production. Response time impact: <50ms.',
    interviewTips: [
      'Explain prompt injection - manipulating LLM behavior through crafted inputs',
      'Discuss defense-in-depth - multiple layers of security',
      'Mention trade-offs - security vs latency vs false positives',
      'Talk about adversarial ML - attackers constantly evolve techniques',
    ],
    githubIdeas: [
      'Include attack examples (sanitized)',
      'Show detection accuracy by attack type',
      'Document defense layers and decision logic',
      'Add dashboard screenshots',
    ],
  },

  // ADVANCED RAG TYPES
  {
    id: 'rag-advanced-1',
    title: 'Graph RAG for Knowledge-Intensive QA',
    category: 'Advanced RAG Types',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Implemented Graph RAG that extracts entities and relationships from documents, stores in knowledge graph, and uses graph traversal for multi-hop reasoning.',
    techStack: ['Python', 'Neo4j', 'LangChain', 'GPT-4', 'spaCy', 'NetworkX', 'FastAPI'],
    keyFeatures: [
      'Automatic entity and relationship extraction',
      'Knowledge graph construction',
      'Multi-hop reasoning with graph traversal',
      'Subgraph retrieval for context',
      'Graph visualization for explainability',
      'Temporal reasoning with time-aware graphs',
    ],
    implementation: [
      {
        step: 'Entity Extraction',
        details: 'Used spaCy NER + GPT-4 for entity extraction. Extracted: people, organizations, locations, concepts. Resolved entity mentions (co-reference resolution). Linked entities across documents.',
      },
      {
        step: 'Relationship Extraction',
        details: 'Used GPT-4 to extract relationships: "works_at", "located_in", "founded_by". Prompt: "Extract relationships between entities." Validated relationships with confidence scores.',
      },
      {
        step: 'Graph Construction',
        details: 'Stored entities as nodes, relationships as edges in Neo4j. Added properties: entity type, source document, timestamp. Created indexes for fast lookup. Graph had 50k nodes, 200k edges.',
      },
      {
        step: 'Graph Retrieval',
        details: 'For query, extracted entities. Found relevant subgraph using Cypher queries. Traversed graph up to 3 hops. Retrieved connected entities and relationships. Converted subgraph to text for LLM.',
      },
      {
        step: 'Multi-Hop Reasoning',
        details: 'Example query: "Where does the CEO of OpenAI live?" Graph traversal: OpenAI → CEO → Sam Altman → lives_in → San Francisco. LLM generates answer from subgraph.',
      },
    ],
    challenges: [
      'Entity disambiguation - "Apple" (company vs fruit), used context and entity linking',
      'Relationship quality - noisy extractions, added validation and confidence thresholds',
      'Graph size - large graphs slow, used graph sampling and caching',
    ],
    results: 'Achieved 85% accuracy on multi-hop questions (vs 60% with standard RAG). Answered questions requiring 2-3 reasoning steps. Graph enabled explainable answers.',
    interviewTips: [
      'Explain Graph RAG - uses knowledge graph instead of vector database',
      'Discuss multi-hop reasoning - answering questions requiring multiple steps',
      'Mention graph databases - Neo4j optimized for relationship queries',
      'Talk about when to use Graph RAG - knowledge-intensive domains with complex relationships',
    ],
    githubIdeas: [
      'Visualize knowledge graph',
      'Show multi-hop reasoning examples',
      'Document entity and relationship extraction',
      'Compare Graph RAG vs standard RAG',
    ],
  },
  {
    id: 'rag-advanced-2',
    title: 'Fusion RAG with Multiple Retrieval Strategies',
    category: 'Advanced RAG Types',
    difficulty: 'Advanced',
    duration: '3 weeks',
    overview: 'Built Fusion RAG that combines multiple retrieval methods (semantic, keyword, graph, SQL) and fuses results for better coverage and accuracy.',
    techStack: ['Python', 'LangChain', 'Pinecone', 'Elasticsearch', 'PostgreSQL', 'GPT-4'],
    keyFeatures: [
      'Parallel retrieval from multiple sources',
      'Reciprocal Rank Fusion for result merging',
      'Query routing based on query type',
      'Adaptive retrieval strategy selection',
      'Result deduplication and re-ranking',
      'Explainable fusion scores',
    ],
    implementation: [
      {
        step: 'Multi-Source Retrieval',
        details: 'Implemented 4 retrievers: 1) Semantic (Pinecone), 2) Keyword (Elasticsearch), 3) SQL (PostgreSQL for structured data), 4) Graph (Neo4j for relationships). Ran in parallel for speed.',
      },
      {
        step: 'Query Classification',
        details: 'Classified queries into types: factual, analytical, relational, temporal. Routed to appropriate retrievers. Example: "How many users?" → SQL retriever. "Explain concept" → semantic retriever.',
      },
      {
        step: 'Reciprocal Rank Fusion',
        details: 'Merged results from multiple retrievers using RRF. Formula: score = Σ(1/(k + rank_i)) where k=60. This combines rankings without needing normalized scores. Handles different result sizes.',
      },
      {
        step: 'Deduplication',
        details: 'Detected duplicate results across retrievers using fuzzy matching. Kept highest-scored version. Merged metadata from duplicates. Reduced result set by 30%.',
      },
      {
        step: 'Adaptive Strategy',
        details: 'Tracked which retriever performed best for each query type. Adjusted retriever weights dynamically. Example: semantic retriever weight increased for conceptual queries.',
      },
    ],
    challenges: [
      'Latency - parallel retrieval still took 800ms, added caching and reduced retrievers for simple queries',
      'Result quality - some retrievers returned noise, added quality filters',
      'Fusion tuning - RRF parameter k required experimentation, used grid search',
    ],
    results: 'Improved retrieval recall by 40% vs single retriever. Precision increased by 25%. Handled diverse query types effectively.',
    interviewTips: [
      'Explain Fusion RAG - combines multiple retrieval methods',
      'Discuss RRF - elegant way to merge rankings',
      'Mention query routing - different queries need different strategies',
      'Talk about trade-offs - fusion improves quality but increases latency and cost',
    ],
    githubIdeas: [
      'Show retrieval comparison by query type',
      'Document RRF algorithm and tuning',
      'Include fusion score explanations',
      'Add latency breakdown by retriever',
    ],
  },
];
