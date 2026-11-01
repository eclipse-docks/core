import type { Unsubscribe } from './types';

type Handler = (payload: unknown) => void;

/** Tiny in-process bus so runtime stays UI-agnostic. */
export class RuntimeEvents {
  private handlers = new Map<string, Set<Handler>>();

  publish(topic: string, payload?: unknown): void {
    const set = this.handlers.get(topic);
    if (!set) return;
    for (const handler of set) handler(payload);
  }

  subscribe(topic: string, handler: Handler): Unsubscribe {
    let set = this.handlers.get(topic);
    if (!set) {
      set = new Set();
      this.handlers.set(topic, set);
    }
    set.add(handler);
    return () => set!.delete(handler);
  }
}

export const TOPIC = {
  sessionChanged: 'cognitive/session/changed',
  messagePart: 'cognitive/message/part',
  messageDone: 'cognitive/message/done',
  permissionAsked: 'cognitive/permission/asked',
  modelRouted: 'cognitive/model/routed',
  coreTick: 'cognitive/core/tick',
  checkpoint: 'cognitive/checkpoint',
  providersChanged: 'cognitive/providers/changed',
  approvalModeChanged: 'cognitive/approval-mode/changed',
} as const;
