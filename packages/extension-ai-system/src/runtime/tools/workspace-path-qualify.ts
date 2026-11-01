import { IN_MEMORY_ROOT_NAME } from '../attachment-paths';

export type RootQualificationDecision =
  | { action: 'keep' }
  | { action: 'prefix'; root: string }
  | { action: 'pick' }
  | { action: 'error'; error: string };

export function isInMemoryToolPath(path: string): boolean {
  return path === IN_MEMORY_ROOT_NAME || path.startsWith(`${IN_MEMORY_ROOT_NAME}/`);
}

export function isWorkspaceRootPath(path: string): boolean {
  const trimmed = path.trim();
  return !trimmed || trimmed === '.' || trimmed === '/';
}

/** First path segment — composite roots are keyed by this name. */
export function firstPathSegment(path: string): string {
  return path.split('/').filter(Boolean)[0] ?? '';
}

export function pathHasKnownRoot(path: string, rootNames: Iterable<string>): boolean {
  const first = firstPathSegment(path);
  if (!first) return false;
  const roots = rootNames instanceof Set ? rootNames : new Set(rootNames);
  return roots.has(first);
}

export function joinUnderRoot(rootPath: string, relativePath: string): string {
  const root = rootPath.replace(/\/+$/, '');
  const relative = relativePath.replace(/^\/+/, '');
  if (!root) return relative;
  if (!relative) return root;
  return `${root}/${relative}`;
}

/**
 * Decide how to qualify a workspace tool path that is missing a connected-root prefix.
 */
export function decideRootQualification(
  path: string,
  durableRoots: string[],
  mode: 'write' | 'read',
): RootQualificationDecision {
  if (isInMemoryToolPath(path) || isWorkspaceRootPath(path)) {
    return { action: 'keep' };
  }
  if (pathHasKnownRoot(path, durableRoots)) {
    return { action: 'keep' };
  }
  if (durableRoots.length === 1) {
    return { action: 'prefix', root: durableRoots[0]! };
  }
  if (durableRoots.length === 0) {
    return {
      action: 'error',
      error:
        mode === 'write'
          ? 'No durable workspace folder connected. Connect a folder before writing, or use an in-memory/… path.'
          : 'No workspace folder connected.',
    };
  }
  if (mode === 'write') {
    return { action: 'pick' };
  }
  return {
    action: 'error',
    error: `Path must start with a workspace root (${durableRoots.join(', ')}). Example: ${durableRoots[0]}/${path}`,
  };
}
