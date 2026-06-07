import type { ITheme } from '@xterm/xterm';

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function isDarkTheme(): boolean {
  const root = document.documentElement;
  if (root.classList.contains('wa-dark')) return true;
  if (root.classList.contains('wa-light')) return false;
  return true;
}

export function getTerminalTheme(): ITheme {
  const dark = isDarkTheme();
  return {
    background: cssVar('--wa-color-surface-lowered', dark ? '#1e1e1e' : '#f3f3f3'),
    foreground: cssVar('--wa-color-text-normal', dark ? '#d4d4d4' : '#1e1e1e'),
    cursor: cssVar('--wa-color-text-normal', dark ? '#d4d4d4' : '#1e1e1e'),
    cursorAccent: cssVar('--wa-color-surface-lowered', dark ? '#1e1e1e' : '#f3f3f3'),
    selectionBackground: cssVar('--wa-color-brand-fill-quiet', dark ? '#264f7840' : '#add6ff80'),
    selectionForeground: cssVar('--wa-color-text-normal', dark ? '#d4d4d4' : '#1e1e1e'),
    black: cssVar('--wa-color-neutral-10', dark ? '#000000' : '#1e1e1e'),
    red: cssVar('--wa-color-danger-fill-loud', '#cd3131'),
    green: cssVar('--wa-color-success-fill-loud', '#0dbc79'),
    yellow: cssVar('--wa-color-warning-fill-loud', '#e5e510'),
    blue: cssVar('--wa-color-brand-fill-loud', '#2472c8'),
    magenta: cssVar('--wa-color-purple-50', '#bc3fbc'),
    cyan: cssVar('--wa-color-cyan-50', '#11a8cd'),
    white: cssVar('--wa-color-neutral-90', dark ? '#e5e5e5' : '#ffffff'),
    brightBlack: cssVar('--wa-color-neutral-50', '#666666'),
    brightRed: cssVar('--wa-color-danger-50', '#f14c4c'),
    brightGreen: cssVar('--wa-color-success-50', '#23d18b'),
    brightYellow: cssVar('--wa-color-warning-50', '#f5f543'),
    brightBlue: cssVar('--wa-color-brand-50', '#3b8eea'),
    brightMagenta: cssVar('--wa-color-purple-40', '#d670d6'),
    brightCyan: cssVar('--wa-color-cyan-40', '#29b8db'),
    brightWhite: cssVar('--wa-color-neutral-95', '#ffffff'),
  };
}

/** Watches `wa-dark` / `wa-light` on `<html>`, same pattern as docks-monaco-widget. */
export function observeTerminalTheme(onChange: () => void): () => void {
  const root = document.documentElement;
  let dark = isDarkTheme();

  const observer = new MutationObserver(() => {
    const next = isDarkTheme();
    if (next === dark) return;
    dark = next;
    onChange();
  });

  observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
