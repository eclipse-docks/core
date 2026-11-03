import { filebrowserDialog, workspaceService } from '@eclipse-docks/core';
import { toWorkspaceToolPath } from '../attachments/attachment-paths';
import {
  decideRootQualification,
  isInMemoryToolPath,
  isWorkspaceRootPath,
  joinUnderRoot,
  pathHasKnownRoot,
} from './workspace-path-qualify';

export type QualifyPathResult =
  | { ok: true; path: string; resolvedFrom?: string }
  | { ok: false; error: string };

export {
  decideRootQualification,
  joinUnderRoot,
  pathHasKnownRoot,
} from './workspace-path-qualify';

/**
 * Ensure tool paths are under a composite workspace root.
 * - Already rooted / in-memory / empty → unchanged
 * - One durable root → auto-prefix
 * - Several durable roots (writes) → folder picker dialog
 */
export async function qualifyWorkspaceToolPath(
  rawPath: string,
  mode: 'write' | 'read' = 'write',
): Promise<QualifyPathResult> {
  const path = toWorkspaceToolPath(String(rawPath ?? ''));
  if (isInMemoryToolPath(path) || isWorkspaceRootPath(path)) {
    return { ok: true, path };
  }

  const folders = await workspaceService.getFolders();
  const allNames = folders.map((f) => f.name);
  if (pathHasKnownRoot(path, allNames)) {
    return { ok: true, path };
  }

  const durableRoots = folders.filter((f) => f.type !== 'in-memory').map((f) => f.name);
  const rootsForDecision = mode === 'write' ? durableRoots : allNames.length ? allNames : durableRoots;
  const decision = decideRootQualification(path, rootsForDecision, mode);

  if (decision.action === 'keep') return { ok: true, path };
  if (decision.action === 'prefix') {
    return { ok: true, path: joinUnderRoot(decision.root, path), resolvedFrom: path };
  }
  if (decision.action === 'error') return { ok: false, error: decision.error };

  const chosen = await filebrowserDialog('directory');
  if (!chosen) {
    return { ok: false, error: 'Write cancelled: no workspace folder selected.' };
  }
  return { ok: true, path: joinUnderRoot(chosen, path), resolvedFrom: path };
}
