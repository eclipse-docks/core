import type { PersistedTerminalEntry, PersistedTerminalState, TerminalCreationOptions } from './terminal-api';

const MAX_PERSISTED_ENV_KEYS = 32;

export function serializeTerminalState(state: PersistedTerminalState): PersistedTerminalState {
  return {
    activeTerminalId: state.activeTerminalId,
    preferredProfileId: state.preferredProfileId,
    terminals: state.terminals.map(serializeTerminalEntry),
  };
}

function serializeTerminalEntry(entry: PersistedTerminalEntry): PersistedTerminalEntry {
  const opts = entry.creationOptions;
  const env = opts.env
    ? Object.fromEntries(Object.entries(opts.env).slice(0, MAX_PERSISTED_ENV_KEYS))
    : undefined;
  return {
    id: entry.id,
    name: entry.name,
    profileId: entry.profileId,
    groupId: entry.groupId,
    creationOptions: {
      name: opts.name,
      profileId: opts.profileId,
      cwd: opts.cwd,
      env,
      groupId: opts.groupId,
    },
  };
}

export function parseTerminalState(raw: unknown): PersistedTerminalState | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (!Array.isArray(obj.terminals)) return null;

  const terminals: PersistedTerminalEntry[] = [];
  for (const item of obj.terminals) {
    if (!item || typeof item !== 'object') continue;
    const t = item as Record<string, unknown>;
    if (typeof t.id !== 'string' || typeof t.name !== 'string' || typeof t.profileId !== 'string') {
      continue;
    }
    const creationOptions = (t.creationOptions ?? {}) as TerminalCreationOptions;
    terminals.push({
      id: t.id,
      name: t.name,
      profileId: t.profileId,
      groupId: typeof t.groupId === 'string' ? t.groupId : t.id,
      creationOptions,
    });
  }

  return {
    terminals,
    activeTerminalId: typeof obj.activeTerminalId === 'string' ? obj.activeTerminalId : null,
    preferredProfileId: typeof obj.preferredProfileId === 'string' ? obj.preferredProfileId : null,
  };
}

export function emptyTerminalState(): PersistedTerminalState {
  return { terminals: [], activeTerminalId: null, preferredProfileId: null };
}
