import '@awesome.me/webawesome/dist/components/toast/toast.js';
import { signal } from '@lit-labs/signals';
import { createLogger } from './logger';

const logger = createLogger('Toast');

const DURATION = 4000;
const TOAST_LIMIT = 40;

export type ToastVariant = 'brand' | 'danger' | 'warning';
export type ToastState = 'pending' | 'emitted';

export interface ToastEntry {
  id: number;
  message: string;
  variant: ToastVariant;
  state: ToastState;
  at: number;
}

type WaToastElement = HTMLElement & {
  placement: string;
  create(
    message: string,
    options?: {
      variant?: ToastVariant | 'neutral' | 'success';
      duration?: number;
    },
  ): Promise<HTMLElement>;
};

let toastStack: WaToastElement | null = null;
let quietDepth = 0;
let sequence = 0;
let entries: ToastEntry[] = [];

export const toastsSignal = signal(0);

function getToastStack(): WaToastElement {
  if (!toastStack) {
    toastStack = document.createElement('wa-toast') as WaToastElement;
    toastStack.placement = 'bottom-end';
    document.body.append(toastStack);
  }
  return toastStack;
}

/** Hold popup toasts until the returned function runs. Nested calls stay quiet until the last one ends. */
export function enterToastQuiet(): () => void {
  quietDepth += 1;
  let open = true;
  return () => {
    if (!open) return;
    open = false;
    quietDepth = Math.max(0, quietDepth - 1);
  };
}

export function listToasts(): ToastEntry[] {
  return entries.map((entry) => ({ ...entry }));
}

export function toastCounts(): { pending: number; emitted: number } {
  return entries.reduce(
    (counts, entry) => {
      counts[entry.state] += 1;
      return counts;
    },
    { pending: 0, emitted: 0 },
  );
}

export function clearToasts(): void {
  if (!entries.length) return;
  entries = [];
  toastsSignal.set(++sequence);
}

function remember(message: string, variant: ToastVariant, state: ToastState): void {
  entries = [{ id: ++sequence, message, variant, state, at: Date.now() }, ...entries].slice(0, TOAST_LIMIT);
  toastsSignal.set(sequence);
}

const show = (msg: string, variant: ToastVariant) => {
  const state: ToastState = quietDepth > 0 ? 'pending' : 'emitted';
  remember(msg, variant, state);
  if (state === 'pending') return;
  if (typeof document === 'undefined' || !document.body) return;
  const stack = getToastStack();
  if (typeof stack.create !== 'function') return;
  void stack.create(msg, { variant, duration: DURATION }).catch(() => undefined);
};

export const toastInfo = (msg: string) => {
  logger.info(msg);
  show(msg, 'brand');
};

export const toastError = (msg: string) => {
  logger.error(msg);
  show(msg, 'danger');
};

export const toastWarning = (msg: string) => {
  logger.warn(msg);
  show(msg, 'warning');
};
