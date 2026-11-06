import { CREATE_PLAN_TOOL } from '../constants';
import type { PermissionAction, SpecialistRole, ToolApprovalMode } from '../types';
import type { ToolDefinition } from '../models/types';

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  id: string;
  name: string;
  ok: boolean;
  output: unknown;
  error?: string;
  mutating?: boolean;
}

export interface PermissionHandler {
  (request: { toolName: string; args: Record<string, unknown>; sessionId: string }): Promise<PermissionAction>;
}

export type ToolExecutor = (call: ToolCall, sessionId: string) => Promise<ToolResult>;

export interface PermissionRule {
  pattern: string;
  action: PermissionAction;
}

function matchPattern(pattern: string, name: string): boolean {
  if (pattern === '*' || pattern === name) return true;
  if (pattern.endsWith('*')) return name.startsWith(pattern.slice(0, -1));
  return false;
}

export interface ExecuteOptions {
  /** Agent-classified risk for auto_safe mode. Missing → treat as critical. */
  risk?: 'safe' | 'critical';
}

/** Evaluates allow/ask/deny and dispatches tool executors. */
export class ToolBroker {
  private approvalMode: ToolApprovalMode = 'auto_safe';
  private rules: PermissionRule[] = [];
  private executors = new Map<string, ToolExecutor>();
  private definitions: ToolDefinition[] = [];
  private permissionHandler: PermissionHandler | null = null;
  private effectLog: Array<{ sessionId: string; tool: string; at: number }> = [];

  setApprovalMode(mode: ToolApprovalMode): void {
    this.approvalMode = mode;
  }

  getApprovalMode(): ToolApprovalMode {
    return this.approvalMode;
  }

  setRules(rules: PermissionRule[]): void {
    this.rules = rules;
  }

  setPermissionHandler(handler: PermissionHandler | null): void {
    this.permissionHandler = handler;
  }

  register(definition: ToolDefinition, executor: ToolExecutor): void {
    this.definitions = this.definitions.filter((d) => d.name !== definition.name).concat(definition);
    this.executors.set(definition.name, executor);
  }

  unregister(name: string): void {
    this.definitions = this.definitions.filter((d) => d.name !== name);
    this.executors.delete(name);
  }

  clearDefinitions(): void {
    this.definitions = [];
    this.executors.clear();
  }

  listDefinitions(role: SpecialistRole): ToolDefinition[] {
    const readOnly = role === 'plan' || role === 'explore';
    return this.definitions.filter((definition) => {
      if (definition.name === CREATE_PLAN_TOOL) return role === 'plan';
      if (readOnly && isMutatingName(definition.name)) return false;
      return true;
    });
  }

  resolveAction(toolName: string, risk?: 'safe' | 'critical'): PermissionAction {
    for (const rule of this.rules) {
      if (matchPattern(rule.pattern, toolName) && rule.action === 'deny') return 'deny';
    }

    let action: PermissionAction;
    switch (this.approvalMode) {
      case 'auto_all':
        action = 'allow';
        break;
      case 'manual':
        action = 'ask';
        break;
      default:
        // auto_safe: trust agent classification; unknown/critical → ask
        action = risk === 'safe' ? 'allow' : 'ask';
        break;
    }

    for (const rule of this.rules) {
      if (matchPattern(rule.pattern, toolName) && rule.action === 'allow' && action === 'ask') {
        action = 'allow';
      }
    }
    return action;
  }

  async execute(
    call: ToolCall,
    sessionId: string,
    role: SpecialistRole,
    opts: ExecuteOptions = {},
  ): Promise<ToolResult> {
    const planWrite = call.name === CREATE_PLAN_TOOL;
    if (planWrite && role !== 'plan') {
      return {
        id: call.id,
        name: call.name,
        ok: false,
        output: null,
        error: 'create_plan is only available in plan mode',
      };
    }
    if (!planWrite && (role === 'plan' || role === 'explore') && isMutatingName(call.name)) {
      return { id: call.id, name: call.name, ok: false, output: null, error: 'Tool denied in plan/explore mode' };
    }

    let action = planWrite ? 'allow' : this.resolveAction(call.name, opts.risk);
    if (action === 'ask' && this.permissionHandler) {
      action = await this.permissionHandler({ toolName: call.name, args: call.arguments, sessionId });
    }
    if (action === 'deny') {
      return { id: call.id, name: call.name, ok: false, output: null, error: 'Permission denied' };
    }
    if (action === 'ask') {
      return { id: call.id, name: call.name, ok: false, output: null, error: 'Permission ask unresolved' };
    }

    const executor = this.executors.get(call.name);
    if (!executor) {
      return { id: call.id, name: call.name, ok: false, output: null, error: `Unknown tool: ${call.name}` };
    }

    const result = await executor(call, sessionId);
    if (result.mutating || isMutatingName(call.name)) {
      this.effectLog.push({ sessionId, tool: call.name, at: Date.now() });
    }
    return result;
  }

  effectCount(sessionId: string, since?: number): number {
    return this.effectLog.filter((e) => e.sessionId === sessionId && (!since || e.at >= since)).length;
  }
}

function isMutatingName(name: string): boolean {
  return /^(write|edit|delete|mkdir|rm|mv|save|apply)/i.test(name) || name.includes('write') || name.includes('delete');
}
