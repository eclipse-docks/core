import type { SessionAttachment } from './types';

/** Mirrors core `IN_MEMORY_ROOT_NAME` without importing the filesys graph. */
export const IN_MEMORY_ROOT_NAME = 'in-memory';

/** URI scheme for UI references (`in-memory://<sessionId>/<file>`). */
export const IN_MEMORY_URI_SCHEME = 'in-memory://';

/** Sanitize a single path segment (no slashes). Prefer id-prefixed names for uniqueness. */
export function safeAttachmentFileName(name: string, id: string): string {
  const base = (name || 'attachment').replace(/[/\\]/g, '_').trim() || 'attachment';
  return `${id}-${base}`;
}

/** Workspace path used by workspace_* tools (no protocol). */
export function attachmentWorkspacePath(
  sessionId: string,
  stored: Pick<SessionAttachment, 'id' | 'name'>,
): string {
  return `${IN_MEMORY_ROOT_NAME}/${sessionId}/${safeAttachmentFileName(stored.name, stored.id)}`;
}

/** UI / catalog URI form (`in-memory://<sessionId>/<file>`). */
export function attachmentUri(
  sessionId: string,
  stored: Pick<SessionAttachment, 'id' | 'name'>,
): string {
  return `${IN_MEMORY_URI_SCHEME}${sessionId}/${safeAttachmentFileName(stored.name, stored.id)}`;
}

/**
 * Map `in-memory://…` references to composite workspace paths.
 * Real workspace paths are returned unchanged.
 */
export function toWorkspaceToolPath(path: string): string {
  const trimmed = path.trim();
  const lower = trimmed.toLowerCase();
  if (lower === 'in-memory:' || lower === 'in-memory://' || lower === IN_MEMORY_ROOT_NAME) {
    return IN_MEMORY_ROOT_NAME;
  }
  if (lower.startsWith(IN_MEMORY_URI_SCHEME)) {
    const rest = trimmed.slice(IN_MEMORY_URI_SCHEME.length).replace(/^\/+/, '');
    return rest ? `${IN_MEMORY_ROOT_NAME}/${rest}` : IN_MEMORY_ROOT_NAME;
  }
  return trimmed;
}
