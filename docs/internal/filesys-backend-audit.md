# Filesystem Backend Consistency Audit

Audit of IndexedDB, FS Access API, OPFS, and WebDAV backends for behavioral and event-publishing consistency.

## Backends

| Backend | Path | Type |
|---------|------|------|
| IndexedDB | `packages/core/src/core/filesys/indexeddb.ts` | Local storage |
| FS Access API | `packages/core/src/core/filesys/fs-access.ts` | Local filesystem |
| OPFS | `packages/core/src/core/filesys/opfs.ts` | Wraps FS Access (same root) |
| WebDAV | `packages/extension-webdav/src/webdav-filesys.ts` | Remote |

## TOPIC_WORKSPACE_CHANGED Publishing

Listeners use this event to refresh the file browser and other workspace-dependent UI.

| Operation | IDB | fs-access | WebDAV | OPFS |
|-----------|-----|-----------|--------|------|
| File.saveContents | ✓ | ✓ (fixed) | ✓ | inherits |
| File.delete | ✓ (via self) | ✓ (via parent) | ✓ | inherits |
| File.rename | ✓ | ✓ | ✓ | inherits |
| Directory.getResource (create) | ✓ | ✓ | ✓ | inherits |
| Directory.delete | ✓ | ✓ | ✓ | inherits |
| Directory.rename | ✓ | ✓ | ✓ | inherits |
| Directory.touch | ✓ | ✓ | ✓ | inherits |

**Fix applied:** `FileSysFileHandleResource.saveContents` was missing the publish; added to match IDB and WebDAV.

## Path Normalization

`getResource` path handling:

| Backend | Segment handling | Example `"a//b"` |
|---------|------------------|------------------|
| IDB | `path.split('/').filter(s => s.trim())` | `["a","b"]` |
| fs-access | previously `split("/")` + `break` on empty | `["a"]` (bug) |
| WebDAV | `path.split("/").filter(s => s.trim())` | `["a","b"]` |

**Fix applied:** fs-access now uses `path.split("/").filter(s => s.trim())` to align with IDB and WebDAV.

## File- vs Directory-Descend Logic

When resolving a path, if an intermediate segment is a file (not a directory), further descent is invalid.

| Backend | Behavior |
|---------|----------|
| IDB | `if (entry.type !== 'dir') return null` before descending |
| fs-access | Previously no check; would return the file when more segments remained |
| WebDAV | Uses `children`, only adds dirs when creating; files block descent implicitly |

**Fix applied:** fs-access now returns `null` when `currentResource` is not `FileSysDirHandleResource` and more segments remain (`} else { return null; }`).

## Publish Patterns

- **IDB:** Publishes at end of each mutating method (delete, saveContents, rename, getResource create, touch).
- **fs-access:** Uses `try/finally` in `getResource` so publish runs even on early return; other methods publish at end.
- **WebDAV:** Publishes at end of each mutating method; `getResource` publishes when `workspaceChanged`.

All backends now follow a consistent pattern.
