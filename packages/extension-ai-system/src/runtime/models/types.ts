import type { EffortLevel, OptimizeFor, SpecialistRole } from '../types';

export interface StreamTokenUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface StreamChunk {
  type: 'text' | 'reasoning' | 'tool_call_delta' | 'usage' | 'done' | 'error';
  text?: string;
  toolCall?: { id: string; name: string; arguments: string };
  usage?: StreamTokenUsage;
  error?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface ProviderToolCall {
  id: string;
  name: string;
  arguments: string;
}

/** OpenAI-style multimodal content (text + image_url). */
export type ProviderContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string; detail?: 'auto' | 'low' | 'high' } };

export type ProviderContent = string | ProviderContentPart[];

export interface ProviderChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: ProviderContent;
  toolCallId?: string;
  name?: string;
  toolCalls?: ProviderToolCall[];
}

export interface StreamParams {
  model: string;
  messages: ProviderChatMessage[];
  tools?: ToolDefinition[];
  providerOptions?: Record<string, unknown>;
  signal?: AbortSignal;
}

export interface ModelProvider {
  id: string;
  listModels(): Promise<Array<{ id: string; name: string }>> | Array<{ id: string; name: string }>;
  stream(params: StreamParams): AsyncIterable<StreamChunk>;
}

export interface ModelCatalogEntry {
  id: string;
  providerId: string;
  tier: 'economy' | 'standard' | 'frontier';
  strengths: Array<'code' | 'reason' | 'fast' | 'long-context'>;
  effort: {
    supported: boolean;
    /** False when chat/completions rejects reasoning_effort together with function tools. */
    withTools: boolean;
    levels: EffortLevel[];
    default: EffortLevel;
  };
}

export interface RouteRequest {
  role: SpecialistRole;
  complexity?: number;
  optimizeFor?: OptimizeFor;
  manualModel?: string;
  manualEffort?: EffortLevel | 'auto';
  maxEffort?: EffortLevel;
  requireTools?: boolean;
}

export interface ResolvedModel {
  model: string;
  providerId: string;
  effort: EffortLevel;
  providerOptions: Record<string, unknown>;
  reason: string;
}
