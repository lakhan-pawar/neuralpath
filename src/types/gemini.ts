export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GeminiRequest {
  prompt: string;
  history?: GeminiMessage[];
  systemPrompt?: string;
  temperature?: number;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface GeminiResponse {
  text: string;
  model: string;
  finishReason: string;
}
