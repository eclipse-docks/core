import type { ExecutionContext } from '@eclipse-docks/core';

const MAX_PROMPT_CHARS = 6_000;

function pruneEmpty(value: unknown): unknown {
  if (value == null) return undefined;
  if (typeof value === 'string') return value.trim() ? value : undefined;
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    const next = value.map(pruneEmpty).filter((item) => item !== undefined);
    return next.length ? next : undefined;
  }
  if (typeof value !== 'object') return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    const kept = pruneEmpty(entry);
    if (kept !== undefined) out[key] = kept;
  }
  return Object.keys(out).length ? out : undefined;
}

function callString(target: unknown, method: string): string | undefined {
  const fn = (target as Record<string, unknown> | null)?.[method];
  if (typeof fn !== 'function') return undefined;
  try {
    const result = (fn as () => unknown).call(target);
    return typeof result === 'string' && result.trim() ? result : undefined;
  } catch {
    return undefined;
  }
}

/** Serializable view of {@link ExecutionContext} (DOM hosts are not dumped). */
export function summarizeExecutionContext(context: ExecutionContext): Record<string, unknown> {
  const part = context.activePart as {
    id?: string;
    localName?: string;
    tabContribution?: { name?: string; label?: string };
    getAttribute?: (name: string) => string | null;
  } | null;

  const editor = context.activeEditor as {
    localName?: string;
    kind?: string;
    input?: { title?: string; key?: string; icon?: string };
  } | null;

  return (
    (pruneEmpty({
      activePart: part
        ? {
            id: part.id ?? part.getAttribute?.('id') ?? undefined,
            label: part.tabContribution?.label,
            name: part.tabContribution?.name,
            element: part.localName,
          }
        : undefined,
      activeEditor: editor
        ? {
            element: editor.localName,
            kind: editor.kind,
            title: editor.input?.title,
            key: editor.input?.key,
            filePath: callString(editor, 'getFilePath'),
            language: callString(editor, 'getLanguage'),
            selection: callString(editor, 'getSelection'),
          }
        : undefined,
    }) as Record<string, unknown>) ?? {}
  );
}

export function formatExecutionContextForPrompt(context: ExecutionContext): string {
  const summary = summarizeExecutionContext(context);
  if (!Object.keys(summary).length) return '';
  let body: string;
  try {
    body = JSON.stringify(summary, null, 2);
  } catch {
    return '';
  }
  if (body.length > MAX_PROMPT_CHARS) body = `${body.slice(0, MAX_PROMPT_CHARS)}…`;
  return [
    'Current app context (from commandRegistry.createExecutionContext — prefer this over guessing):',
    '```json',
    body,
    '```',
  ].join('\n');
}
