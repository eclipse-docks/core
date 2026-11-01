import type { EffortLevel, OptimizeFor, SpecialistRole } from '../types';

export interface StreamChunk {
  type: 'text' | 'reasoning' | 'tool_call_delta' | 'done' | 'error';
  text?: string;
  toolCall?: { id: string; name: string; arguments: string };
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

export interface ProviderChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
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
