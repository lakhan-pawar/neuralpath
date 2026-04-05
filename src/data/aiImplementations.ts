import type { AIImplementation } from '@/types/implementation';
import { RAG_APPLICATIONS } from './implementations/ragApplications';
import { AI_AGENTS } from './implementations/aiAgents';
import { MULTI_AGENT_SYSTEMS } from './implementations/multiAgentSystems';
import { AGENTIC_WORKFLOWS } from './implementations/agenticWorkflows';
import { LLM_APPLICATIONS } from './implementations/llmApplications';
import { TOOL_USING_AGENTS } from './implementations/toolUsingAgents';
import { MULTIMODAL_AGENTS } from './implementations/multimodalAgents';
import { VOICE_AGENTS } from './implementations/voiceAgents';
import { COMPUTER_VISION } from './implementations/computerVision';

export const AI_IMPLEMENTATIONS: AIImplementation[] = [
  ...RAG_APPLICATIONS,
  ...AI_AGENTS,
  ...MULTI_AGENT_SYSTEMS,
  ...AGENTIC_WORKFLOWS,
  ...LLM_APPLICATIONS,
  ...TOOL_USING_AGENTS,
  ...MULTIMODAL_AGENTS,
  ...VOICE_AGENTS,
  ...COMPUTER_VISION
];

// Export by category for easier access
export {
  RAG_APPLICATIONS,
  AI_AGENTS,
  MULTI_AGENT_SYSTEMS,
  AGENTIC_WORKFLOWS,
  LLM_APPLICATIONS,
  TOOL_USING_AGENTS,
  MULTIMODAL_AGENTS,
  VOICE_AGENTS,
  COMPUTER_VISION
};

// Summary statistics
export const IMPLEMENTATION_STATS = {
  total: AI_IMPLEMENTATIONS.length,
  byType: {
    'RAG Application': RAG_APPLICATIONS.length,
    'AI Agent': AI_AGENTS.length,
    'Multi-Agent System': MULTI_AGENT_SYSTEMS.length,
    'Agentic Workflow': AGENTIC_WORKFLOWS.length,
    'LLM Application': LLM_APPLICATIONS.length,
    'Tool-Using Agent': TOOL_USING_AGENTS.length,
    'Multimodal Agent': MULTIMODAL_AGENTS.length,
    'Voice Agent': VOICE_AGENTS.length,
    'Computer Vision': COMPUTER_VISION.length
  }
};
