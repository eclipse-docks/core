export type PlutchikEmotion =
  | 'joy'
  | 'trust'
  | 'fear'
  | 'surprise'
  | 'sadness'
  | 'disgust'
  | 'anger'
  | 'anticipation';

export type EmotionalState = Record<PlutchikEmotion, number>;

export type BufferName = 'goal' | 'retrieval' | 'imaginal' | 'emotion' | 'motor';

export interface BufferMap {
  goal: Chunk | null;
  retrieval: Chunk | null;
  imaginal: Chunk | null;
  emotion: Chunk | null;
  motor: Chunk | null;
}

export type MemoryScope = 'run' | 'workspace' | 'session';

export interface Chunk {
  id: string;
  type: string;
  slots: Record<string, unknown>;
  activation: number;
  createdAt: number;
  updatedAt: number;
  scope: MemoryScope;
  sessionId?: string;
  pinned?: boolean;
}

export interface Need {
  id: string;
  label: string;
  weight: number;
  urgency: number;
}

export interface Intent {
  id: string;
  summary: string;
  motivation: string;
  valenceDelta: number;
  createdAt: number;
}

export type SpecialistRole = 'plan' | 'build' | 'explore' | 'general' | 'compact' | 'title' | 'summary';

export type EffortLevel = 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';

export type OptimizeFor = 'cost' | 'balance' | 'intelligence';

export type PermissionAction = 'allow' | 'ask' | 'deny';

/** Copilot-style tool approval convenience modes. */
export type ToolApprovalMode = 'manual' | 'auto_safe' | 'auto_all';

export type SessionStatus = 'idle' | 'running' | 'waiting_approval' | 'compact';

export type MessagePart =
  | { type: 'text'; text: string }
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

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: MessagePart[];
  createdAt: number;
  routedModel?: string;
  effort?: EffortLevel;
}

export interface Checkpoint {
  id: string;
  sessionId: string;
  label: string;
  createdAt: number;
  messageSeq: number;
  buffers: BufferMap;
  compactionSummary?: string;
  specialistMode: SpecialistRole;
  toolEffectCount: number;
}

export interface CognitiveSession {
  id: string;
  title: string;
  status: SessionStatus;
  history: ChatMessage[];
  buffers: BufferMap;
  specialistMode: SpecialistRole;
  parentSessionId?: string;
  createdAt: number;
  updatedAt: number;
  compactionSummary?: string;
}

export type ModelPolicy =
  | { mode: 'manual'; model: string; effort?: EffortLevel | 'auto'; maxEffort?: EffortLevel }
  | { mode: 'auto'; optimizeFor: OptimizeFor; maxEffort?: EffortLevel };

export type Unsubscribe = () => void;
