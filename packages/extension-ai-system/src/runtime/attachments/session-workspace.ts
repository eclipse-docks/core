import {
  Directory,
  getInMemoryRoot,
  IN_MEMORY_ROOT_NAME,
  setInMemoryMountProjection,
  type GetResourceOptions,
  type MemoryLiveContents,
  type MemoryRootDirectory,
} from '@eclipse-docks/core';
import type { SessionAttachment } from '../types';
import { attachmentWorkspacePath } from './attachment-paths';

export {
  IN_MEMORY_ROOT_NAME,
  IN_MEMORY_URI_SCHEME,
  attachmentUri,
  attachmentWorkspacePath,
  safeAttachmentFileName,
  toWorkspaceToolPath,
} from './attachment-paths';

/** Resolve the current attachment payload (session store remains source of truth). */
export type AttachmentPayloadResolver = () => SessionAttachment | undefined;

function attachmentContents(stored: SessionAttachment): string {
  if (stored.kind === 'image') {
    if (stored.dataUrl) return stored.dataUrl;
    if (stored.text) return stored.text;
  }
  return stored.text ?? '';
}

/** Build live-file callbacks that always re-read via the caller-provided resolver. */
export function attachmentLiveContents(resolve: AttachmentPayloadResolver): MemoryLiveContents {
  return {
    get mimeType() {
      return resolve()?.mime;
    },
    getContents() {
      const stored = resolve();
      if (!stored) throw new Error('Attachment payload is no longer available');
      return attachmentContents(stored);
    },
    size() {
      const stored = resolve();
      if (!stored) return null;
      if (stored.byteLength != null) return stored.byteLength;
      return attachmentContents(stored).length;
    },
  };
}

/** Relative path under the shared in-memory root (`<sessionId>/<file>`). */
function relativeAttachmentPath(
  sessionId: string,
  stored: Pick<SessionAttachment, 'id' | 'name'>,
): string {
  return attachmentWorkspacePath(sessionId, stored).slice(`${IN_MEMORY_ROOT_NAME}/`.length);
}

/**
 * Publish a live file node. Payload is resolved only through `resolve` — nothing is copied.
 */
export async function syncAttachmentToWorkspace(
  sessionId: string,
  stored: SessionAttachment,
  resolve: AttachmentPayloadResolver,
): Promise<string> {
  const root = getInMemoryRoot();
  const relative = relativeAttachmentPath(sessionId, stored);
  root.writeLiveFile(relative, attachmentLiveContents(resolve));
  return attachmentWorkspacePath(sessionId, stored);
}

export async function syncAttachmentsToWorkspace(
  sessionId: string,
  attachments: SessionAttachment[],
  resolveById: (attachmentId: string) => SessionAttachment | undefined,
): Promise<void> {
  for (const attachment of attachments) {
    await syncAttachmentToWorkspace(sessionId, attachment, () => resolveById(attachment.id));
  }
}

export async function removeAttachmentFromWorkspace(
  sessionId: string,
  stored: Pick<SessionAttachment, 'id' | 'name'>,
): Promise<void> {
  const root = getInMemoryRoot();
  const relative = relativeAttachmentPath(sessionId, stored);
  const resource = await root.getResource(relative);
  if (resource) {
    await resource.delete();
  }
}

export async function removeSessionWorkspaceFolder(sessionId: string): Promise<void> {
  const root = getInMemoryRoot();
  const dir = await root.getResource(sessionId);
  if (dir instanceof Directory) {
    await dir.delete();
  }
}

/**
 * Restrict the workspace-mounted in-memory view to a single folder name (active session).
 * Pass `null` to show the full tree again.
 */
export function projectInMemoryMountToFolder(folderName: string | null): void {
  if (!folderName) {
    setInMemoryMountProjection(null);
    return;
  }
  const name = folderName;
  setInMemoryMountProjection({
    async listChildren(root: MemoryRootDirectory) {
      return [root.ensureDirectoryEntry(name)];
    },
    async getResource(root: MemoryRootDirectory, path: string, options?: GetResourceOptions) {
      const segments = path.split('/').filter((s) => s.trim());
      if (segments[0] !== name) return null;
      if (segments.length === 1 && (path.endsWith('/') || path === name)) {
        return root.ensureDirectoryEntry(name);
      }
      return root.getResource(path, options);
    },
  });
}
