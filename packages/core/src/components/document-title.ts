import { appLoaderService } from '../core/apploader';
import { activePartSignal } from '../core/appstate';
import { i18n } from '../core/i18n';
import { watchSignal } from '../core/signals';

const t = await i18n(import.meta.glob('./partname*.json'));

/**
 * Human-readable label for the focused part (same logic as docks-part-name).
 */
export function getActivePartDisplayName(): string {
  const activePart = activePartSignal.get();
  if (!activePart) {
    return t.NO_PART;
  }
  return activePart.tabContribution?.label || activePart.getAttribute('id') || t.NO_PART;
}

/** Wait after the last active-part change before updating `document.title` (rapid tab switches). */
const TITLE_DEBOUNCE_MS = 250;

let titleDebounceTimer: ReturnType<typeof setTimeout> | null = null;

function applyDocumentTitle(): void {
  const appName = appLoaderService.getCurrentApp()?.name ?? '';
  const activePart = activePartSignal.get();
  if (!activePart) {
    document.title = appName;
    return;
  }
  const part =
    activePart.tabContribution?.label || activePart.getAttribute('id') || t.NO_PART;

  if (appName) {
    document.title = `${appName} | ${part}`;
  } else {
    document.title = part;
  }
}

function scheduleApplyDocumentTitle(): void {
  if (titleDebounceTimer !== null) {
    clearTimeout(titleDebounceTimer);
  }
  titleDebounceTimer = setTimeout(() => {
    titleDebounceTimer = null;
    applyDocumentTitle();
  }, TITLE_DEBOUNCE_MS);
}

watchSignal(activePartSignal, () => scheduleApplyDocumentTitle());

window.addEventListener('app-loaded', () => {
  if (titleDebounceTimer !== null) {
    clearTimeout(titleDebounceTimer);
    titleDebounceTimer = null;
  }
  applyDocumentTitle();
});
