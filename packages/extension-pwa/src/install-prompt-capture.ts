/**
 * Chromium fires `beforeinstallprompt` at most once; listeners must be registered early.
 * This module runs from `index.ts` when the package is first imported—before the lazy
 * extension loader and before `extensionRegistry.registerExtension` order matters.
 * App authors should static-import `@eclipse-docks/extension-pwa` ahead of heavy
 * extension entries (or in `main.ts` first) so this runs before top-level `await`
 * chains in other extensions delay evaluation.
 */
export interface PwaInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWA_INSTALL_PROMPT_AVAILABLE = 'docks-pwa-install-prompt-available';

let captured: PwaInstallPromptEvent | null = null;

export function peekInstallPrompt(): PwaInstallPromptEvent | null {
  return captured;
}

export function clearInstallPromptCapture(): void {
  captured = null;
}

function isStandaloneShell(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function init(): void {
  if (typeof window === 'undefined' || isStandaloneShell()) {
    return;
  }
  window.addEventListener(
    'beforeinstallprompt',
    (e) => {
      e.preventDefault();
      captured = e as PwaInstallPromptEvent;
      window.dispatchEvent(new CustomEvent(PWA_INSTALL_PROMPT_AVAILABLE));
    },
    { passive: false },
  );
}

init();
