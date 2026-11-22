export type SpecialistRole = 'plan' | 'build' | 'explore' | 'general' | 'compact' | 'title' | 'summary';

export type EffortLevel = 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';

export type OptimizeFor = 'cost' | 'balance' | 'intelligence';

export type PermissionAction = 'allow' | 'ask' | 'deny';

/** Copilot-style tool approval convenience modes. */
export type ToolApprovalMode = 'manual' | 'auto_safe' | 'auto_all';

export type SessionStatus = 'idle' | 'running' | 'waiting_approval' | 'compact';

export type MessagePart =
  | { type: 'text'; text: string }
  | {
      type: 'file';
      /** Session attachment id (payload lives on `AiSession.attachments`). */
      id: string;
      /** Display name (usually the basename). */
      name: string;
      /** Workspace- or filesystem-relative path when known. */
      path?: string;
      mime?: string;
      kind?: 'text' | 'image';
      byteLength?: number;
    }
  | { type: 'reasoning'; text: string; status: 'streaming' | 'done' }
  | {
      type: 'tool';
      id: string;
      name: string;
      args?: unknown;
      result?: unknown;
      status: 'preparing' | 'running' | 'done' | 'error';
      durationMs?: number;
    }
  | {
      type: 'step';
      id: string;
      title: string;
      status: 'pending' | 'running' | 'done' | 'error';
      children?: MessagePart[];
    };

/** Attachment supplied with a user prompt before it is published into the session store. */
export interface PromptAttachment {
  name: string;
  path?: string;
  mime?: string;
  kind?: 'text' | 'image';
  text?: string;
  dataUrl?: string;
  byteLength?: number;
  truncated?: boolean;
}

/** Full attachment payload stored on the session (not inlined into model history). */
export interface SessionAttachment {
  id: string;
  name: string;
  path?: string;
  mime?: string;
  kind: 'text' | 'image';
  text?: string;
  dataUrl?: string;
  byteLength?: number;
  truncated?: boolean;
  createdAt: number;
  messageId?: string;
}

/** Provider-reported token counts for a model turn (may span multiple tool-loop calls). */
export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: MessagePart[];
  createdAt: number;
  routedModel?: string;
  effort?: EffortLevel;
  /** Cumulative provider usage for this assistant turn, when reported. */
  usage?: TokenUsage;
}

export interface Checkpoint {
  id: string;
  sessionId: string;
  label: string;
  createdAt: number;
  messageSeq: number;
  compactionSummary?: string;
  specialistMode: SpecialistRole;
  toolEffectCount: number;
}

export interface AiSession {
  id: string;
  title: string;
  status: SessionStatus;
  history: ChatMessage[];
  /** Attachment payloads referenced by `file` message parts. */
  attachments: SessionAttachment[];
  specialistMode: SpecialistRole;
  parentSessionId?: string;
  createdAt: number;
  updatedAt: number;
  compactionSummary?: string;
}

export type ModelPolicy =
  | { mode: 'manual'; model: string; effort?: EffortLevel | 'auto'; maxEffort?: EffortLevel }
  | { mode: 'auto'; optimizeFor: OptimizeFor; maxEffort?: EffortLevel };
