import '@awesome.me/webawesome/dist/components/toast/toast.js';
import { createLogger } from './logger';

const logger = createLogger('Toast');

const DURATION = 4000;

type ToastVariant = 'brand' | 'danger' | 'warning';

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

function getToastStack(): WaToastElement {
  if (!toastStack) {
    toastStack = document.createElement('wa-toast') as WaToastElement;
    toastStack.placement = 'bottom-end';
    document.body.append(toastStack);
  }
  return toastStack;
}

const show = (msg: string, variant: ToastVariant) => {
  if (typeof document === 'undefined' || !document.body) return;
  void getToastStack().create(msg, { variant, duration: DURATION });
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
