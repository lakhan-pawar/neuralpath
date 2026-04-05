// Resume-Ready AI/ML Projects - Part 2

import type { ResumeProject } from './resumeProjects1';

export const RESUME_PROJECTS_PART2: ResumeProject[] = [
  // More AGENT PROJECTS
  {
    id: 'agent-3',
    title: 'Task Planning Agent with Human-in-the-Loop',
    category: 'AI Agents',
    difficulty: 'Intermediate',
    duration: '3 weeks',
    overview: 'Created an agent that breaks down complex tasks into actionable steps, executes them with human approval, and adapts based on feedback. Useful for automating workflows while maintaining control.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'Celery', 'Redis', 'React', 'WebSockets'],
    keyFeatures: [
      'Hierarchical task decomposition',
      'Human approval checkpoints',
      'Dynamic replanning when tasks fail',
      'Progress tracking and visualization',
      'Rollback capability for failed steps',
      'Learning from human corrections',
    ],
    implementation: [
      {
        step: 'Task Decomposition',
        details: 'Agent receives high-level goal, breaks into subtasks using Chain-of-Thought. Example: "Organize team meeting" → ["Find available times", "Send invites", "Book room", "Prepare agenda"]. Creates dependency graph.',
      },
      {
        step: 'Approval Workflow',
        details: 'Before executing each subtask, sends approval request to user via WebSocket. User can approve, reject, or modify. Implemented timeout (5min) with default action.',
      },
      {
        step: 'Execution with Celery',
        details: 'Each subtask runs as Celery task for async execution. Agent monitors task status. If task fails, triggers replanning. Stores execution state in Redis for resumption.',
      },
      {
        step: 'Adaptive Replanning',
        details: 'When subtask fails or user rejects, agent generates alternative approaches. Uses past failures to avoid repeating mistakes. Maintains plan history for learning.',
      },
      {
        step: 'Feedback Loop',
        details: 'Stored human corrections (approved/rejected plans) in database. Fine-tuned agent prompts based on feedback patterns. Improved approval rate from 60% to 85%.',
      },
    ],
    challenges: [
      'Handling user unavailability - implemented smart defaults and confidence-based auto-approval',
      'Task dependencies - used topological sort to ensure correct execution order',
      'State management - complex state machine with 15+ states, used state diagram for debugging',
    ],
    results: 'Automated 40+ workflows with 85% success rate. Reduced manual task time by 60%. Users appreciated control over agent actions.',
    interviewTips: [
      'Explain human-in-the-loop - balances automation with human judgment',
      'Discuss task decomposition - similar to project management (WBS)',
      'Mention failure handling - agents must gracefully handle errors',
      'Talk about trust - users need visibility and control over agent actions',
    ],
    githubIdeas: [
      'Show task decomposition examples with dependency graphs',
      'Include approval UI screenshots',
      'Document replanning strategies',
      'Add metrics: approval rate, success rate, time saved',
    ],
  },
  {
    id: 'agent-4',
    title: 'Memory-Augmented Conversational Agent',
    category: 'AI Agents',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    overview: 'Built a conversational agent with long-term memory that remembers user preferences, past conversations, and learned facts. Uses vector database for semantic memory retrieval.',
    techStack: ['Python', 'LangChain', 'GPT-4', 'Pinecone', 'PostgreSQL', 'FastAPI', 'Redis'],
    keyFeatures: [
      'Episodic memory (past conversations)',
      'Semantic memory (learned facts)',
      'User preference tracking',
      'Memory consolidation (summarization)',
      'Selective memory retrieval',
      'Memory importance scoring',
    ],
    implementation: [
      {
        step: 'Memory Architecture',
        details: 'Three memory types: Short-term (Redis, last 10 messages), Long-term (PostgreSQL, all conversations), Semantic (Pinecone, facts and preferences). Each serves different purpose.',
      },
      {
        step: 'Memory Storage',
        details: 'After each conversation turn, extracted key facts using LLM. Example: "I prefer Python over Java" → stored as preference. Generated embeddings and stored in Pinecone with metadata (timestamp, importance).',
      },
      {
        step: 'Memory Retrieval',
        details: 'For each user query, retrieved relevant memories using semantic search. Combined with short-term memory. Passed to LLM as context. This allows agent to reference past conversations naturally.',
      },
      {
        step: 'Memory Consolidation',
        details: 'Every 50 messages, summarized conversation history to reduce storage. Kept important memories (high importance score), discarded trivial ones. Similar to human memory consolidation during sleep.',
      },
      {
        step: 'Importance Scoring',
        details: 'Used LLM to score memory importance (0-10). Factors: user emotion, topic relevance, uniqueness. High-importance memories never deleted. Low-importance memories expire after 30 days.',
      },
    ],
    challenges: [
      'Memory retrieval latency - added caching and pre-fetched common memories',
      'Irrelevant memory retrieval - tuned similarity threshold and added recency bias',
      'Storage costs - implemented memory pruning and compression',
    ],
    results: 'Agent remembered 95% of user preferences. Users felt conversations were more personalized. Engagement increased by 40%.',
    interviewTips: [
      'Explain memory types - episodic (events), semantic (facts), procedural (skills)',
      'Discuss memory retrieval - balance between recency and relevance',
      'Mention privacy concerns - users should control their memory data',
      'Talk about memory consolidation - inspired by neuroscience',
    ],
    githubIdeas: [
      'Show memory retrieval examples',
      'Visualize memory importance distribution',
      'Document memory consolidation algorithm',
      'Add privacy controls (delete memory, export data)',
    ],
  },
  {
    id: 'agent-5',
    title: 'Goal-Oriented Agent with Reinforcement Learning',
    category: 'AI Agents',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    overview: 'Developed an agent that learns optimal strategies through trial and error using reinforcement learning. Agent plays a text-based game and learns to maximize rewards.',
    techStack: ['Python', 'OpenAI Gym', 'Stable-Baselines3', 'PyTorch', 'TensorBoard', 'MLflow'],
    keyFeatures: [
      'Custom environment with text observations',
      'PPO (Proximal Policy Optimization) training',
      'Reward shaping for faster learning',
      'Curriculum learning (easy → hard tasks)',
      'Policy visualization and interpretation',
      'Transfer learning to new environments',
    ],
    implementation: [
      {
        step: 'Environment Design',
        details: 'Created custom Gym environment for text adventure game. State: text description. Actions: move, take, use, talk. Rewards: +10 for goal, -1 per step, -5 for invalid action. Episode ends after 100 steps or goal reached.',
      },
      {
        step: 'State Representation',
        details: 'Converted text to embeddings using Sentence-BERT. Used last 5 observations as state (temporal context). Dimensionality: 5 × 768 = 3840. Added action history as additional features.',
      },
      {
        step: 'PPO Training',
        details: 'Used Stable-Baselines3 PPO with custom policy network. Architecture: embedding → LSTM (256 units) → FC (128) → action logits. Trained for 1M steps with 8 parallel environments.',
      },
      {
        step: 'Reward Shaping',
        details: 'Added intermediate rewards: +1 for discovering new room, +2 for picking up key item, +5 for solving puzzle. This speeds up learning vs sparse rewards. Tuned reward weights through experimentation.',
      },
      {
        step: 'Curriculum Learning',
        details: 'Started with simple 3-room game, gradually increased to 10-room game. Agent learns basic navigation first, then complex strategies. Success rate improved from 20% to 75%.',
      },
    ],
    challenges: [
      'Sparse rewards - agent struggled to learn initially, solved with reward shaping',
      'Large action space - 50+ possible actions, used action masking to filter invalid actions',
      'Sample efficiency - required 1M steps to converge, used experience replay and parallel envs',
    ],
    results: '75% success rate on test environments. Agent learned emergent strategies (e.g., exploring systematically). Training time: 12 hours on single GPU.',
    interviewTips: [
      'Explain RL basics - agent learns from rewards, not labeled data',
      'Discuss PPO - on-policy algorithm that\'s stable and sample-efficient',
      'Mention reward shaping - careful design needed to avoid reward hacking',
      'Talk about exploration vs exploitation - agent must balance trying new actions vs using known good actions',
    ],
    githubIdeas: [
      'Show training curves (reward over time)',
      'Include gameplay videos of trained agent',
      'Document reward shaping experiments',
      'Add policy visualization (attention maps)',
    ],
  },

  // MULTI-MODAL AGENT PROJECTS
  {
    id: 'multimodal-1',
    title: 'Vision-Language Agent for UI Automation',
    category: 'Multi-Modal Agents',
    difficulty: 'Advanced',
    duration: '4 weeks',
    overview: 'Built an agent that controls computer interfaces using vision and language. Takes screenshots, understands UI elements, and performs actions like clicking, typing, and scrolling.',
    techStack: ['Python', 'GPT-4V', 'Playwright', 'PyAutoGUI', 'OpenCV', 'Tesseract OCR'],
    keyFeatures: [
      'Screenshot analysis with GPT-4 Vision',
      'UI element detection and localization',
      'Action planning from natural language goals',
      'Error recovery and retry logic',
      'Multi-step task execution',
      'Screen recording for debugging',
    ],
    implementation: [
      {
        step: 'Vision Pipeline',
        details: 'Captured screenshots using Playwright. Passed to GPT-4V with prompt: "Identify all clickable elements and their locations." Model returns bounding boxes and labels. Used OCR for text extraction.',
      },
      {
        step: 'Action Primitives',
        details: 'Implemented 8 actions: click(x,y), type(text), scroll(direction), wait(seconds), press_key(key), drag(x1,y1,x2,y2), hover(x,y), screenshot(). Each action has pre/post conditions.',
      },
      {
        step: 'Task Planning',
        details: 'Agent receives goal: "Book a flight to NYC". Breaks into steps: 1) Find search box, 2) Type "NYC", 3) Click search, 4) Select date, 5) Click book. Uses GPT-4 for planning.',
      },
      {
        step: 'Execution Loop',
        details: 'Execute action → Take screenshot → Verify success → Next action. If verification fails, retry with different approach. Max 3 retries per action. Logs all actions for debugging.',
      },
      {
        step: 'Error Handling',
        details: 'Common errors: element not found, wrong element clicked, timeout. Agent uses vision to detect error messages, adapts plan. Example: if "Page not found", go back and try different link.',
      },
    ],
    challenges: [
      'Element localization accuracy - GPT-4V sometimes gives approximate coordinates, added tolerance and visual confirmation',
      'Dynamic UIs - elements move/change, implemented wait-and-retry with exponential backoff',
      'Cost - GPT-4V is expensive, cached screenshots and used vision only when needed',
    ],
    results: 'Successfully automated 20+ web tasks with 70% success rate. Reduced manual testing time by 50%. Discovered 5 UI bugs through automated exploration.',
    interviewTips: [
      'Explain vision-language models - understand both images and text',
      'Discuss UI automation challenges - brittle selectors, dynamic content',
      'Mention GPT-4V capabilities - can identify UI elements without training',
      'Talk about reliability - agents need robust error handling for production',
    ],
    githubIdeas: [
      'Include demo videos of agent performing tasks',
      'Show GPT-4V responses with bounding boxes',
      'Document common failure modes and solutions',
      'Add success rate by task complexity',
    ],
  },
  {
    id: 'multimodal-2',
    title: 'Audio-Visual Meeting Assistant Agent',
    category: 'Multi-Modal Agents',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    overview: 'Created an agent that joins video meetings, transcribes speech, analyzes visual content (slides, screen shares), and generates meeting summaries with action items.',
    techStack: ['Python', 'Whisper', 'GPT-4V', 'OpenCV', 'FFmpeg', 'Diarization', 'FastAPI'],
    keyFeatures: [
      'Real-time speech transcription with speaker diarization',
      'Slide content extraction and OCR',
      'Visual attention tracking (what\'s on screen)',
      'Action item extraction',
      'Meeting summary generation',
      'Searchable meeting archive',
    ],
    implementation: [
      {
        step: 'Audio Processing',
        details: 'Captured meeting audio using virtual audio device. Transcribed with Whisper (large-v3 model). Applied speaker diarization using pyannote.audio to identify who said what. Achieved 95% transcription accuracy.',
      },
      {
        step: 'Video Analysis',
        details: 'Extracted frames every 5 seconds. Detected scene changes (slide transitions) using frame differencing. Passed slides to GPT-4V for content extraction. Stored slide text and images.',
      },
      {
        step: 'Multi-Modal Fusion',
        details: 'Aligned transcription timestamps with video frames. When speaker mentions "this chart", retrieved corresponding slide. Created timeline: [timestamp, speaker, text, visual_context].',
      },
      {
        step: 'Action Item Extraction',
        details: 'Used GPT-4 to identify action items from transcript. Patterns: "TODO", "will do", "by Friday", "assigned to". Extracted: task, assignee, deadline. Sent notifications via email.',
      },
      {
        step: 'Summary Generation',
        details: 'Generated three-level summary: 1) One-sentence overview, 2) Key points (bullet list), 3) Detailed summary with timestamps. Included slide screenshots for visual reference.',
      },
    ],
    challenges: [
      'Real-time processing - optimized pipeline to process within 2x meeting duration',
      'Speaker diarization accuracy - struggled with overlapping speech, used beam search',
      'Slide quality - low-res screen shares, applied super-resolution before OCR',
    ],
    results: 'Processed 100+ meetings with 90% action item recall. Users saved 30min per meeting on note-taking. Meeting archive enabled easy search of past discussions.',
    interviewTips: [
      'Explain multi-modal fusion - combining audio and visual information',
      'Discuss speaker diarization - clustering audio segments by speaker',
      'Mention real-time constraints - processing must keep up with meeting',
      'Talk about privacy - sensitive meeting data requires encryption and access control',
    ],
    githubIdeas: [
      'Show sample meeting summary with slides',
      'Include transcription accuracy metrics',
      'Document audio-visual alignment algorithm',
      'Add demo video of agent in action',
    ],
  },
  {
    id: 'multimodal-3',
    title: 'Image-to-Code Agent for UI Generation',
    category: 'Multi-Modal Agents',
    difficulty: 'Advanced',
    duration: '3-4 weeks',
    overview: 'Developed an agent that converts UI mockups (images) into working HTML/CSS/React code. Uses vision models to understand layout and generates production-ready code.',
    techStack: ['Python', 'GPT-4V', 'Claude', 'React', 'Tailwind CSS', 'Playwright', 'Node.js'],
    keyFeatures: [
      'Layout detection and component identification',
      'Style extraction (colors, fonts, spacing)',
      'Responsive design generation',
      'Component hierarchy inference',
      'Code validation and testing',
      'Iterative refinement based on visual diff',
    ],
    implementation: [
      {
        step: 'Image Analysis',
        details: 'Passed UI mockup to GPT-4V with prompt: "Identify all UI components, their positions, and styling." Model returns structured JSON: [{type: "button", text: "Submit", color: "#007bff", position: {x, y}}].',
      },
      {
        step: 'Component Mapping',
        details: 'Mapped detected components to React components. Button → <Button>, Input → <Input>, Card → <Card>. Used Tailwind CSS for styling. Generated component tree with proper nesting.',
      },
      {
        step: 'Code Generation',
        details: 'Used Claude to generate React code from component tree. Prompt included: component structure, styling requirements, accessibility guidelines. Generated clean, idiomatic code.',
      },
      {
        step: 'Visual Validation',
        details: 'Rendered generated code with Playwright. Took screenshot. Compared with original mockup using SSIM (Structural Similarity Index). If similarity <0.8, triggered refinement.',
      },
      {
        step: 'Iterative Refinement',
        details: 'Showed both images to GPT-4V: "What\'s different?" Model identifies discrepancies (e.g., "Button is too small"). Agent adjusts code and re-renders. Repeated until similarity >0.9.',
      },
    ],
    challenges: [
      'Complex layouts - nested grids and flexbox, used hierarchical decomposition',
      'Color extraction - slight variations in mockup, used color clustering',
      'Responsive design - mockup is single size, generated breakpoints based on component density',
    ],
    results: 'Generated pixel-perfect UIs for 50+ mockups with 85% accuracy. Reduced UI development time from 2 hours to 10 minutes. Code passed accessibility audits.',
    interviewTips: [
      'Explain vision-to-code - similar to sketch-to-code but more robust',
      'Discuss component detection - object detection + classification',
      'Mention visual validation - ensures generated code matches design',
      'Talk about code quality - generated code should be maintainable, not just functional',
    ],
    githubIdeas: [
      'Show before/after: mockup → generated UI',
      'Include visual similarity scores',
      'Document component mapping rules',
      'Add generated code examples',
    ],
  },
];
