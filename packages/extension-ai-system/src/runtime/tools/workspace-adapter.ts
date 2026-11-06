import {
  workspaceService,
  File,
  Directory,
  getInMemoryRoot,
  IN_MEMORY_ROOT_NAME,
} from '@eclipse-docks/core';
import {
  IMAGE_PRESENT_KEY,
  isSvgAttachment,
  resolveMediaType,
} from '../attachments/attachments';
import { toWorkspaceToolPath } from '../attachments/attachment-paths';
import { CREATE_PLAN_TOOL } from '../constants';
import { qualifyWorkspaceToolPath } from './workspace-path';
import { isInMemoryToolPath, isWorkspaceRootPath } from './workspace-path-qualify';
import { isPlanFilePath, planWriteTarget } from './plan-file';
import type { ToolBroker } from './broker';

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

/** Some File backends (e.g. in-memory) expose mime; the abstract File does not. */
function optionalMimeType(resource: File): string | undefined {
  const getMimeType = (resource as unknown as { getMimeType?: () => string | undefined }).getMimeType;
  return typeof getMimeType === 'function' ? getMimeType.call(resource) : undefined;
}

function fileNameFromPath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  return parts[parts.length - 1] || path;
}

/** Resolve a tool path against the shared in-memory root or the mounted workspace. */
async function resolveResource(
  path: string,
  options?: { create?: boolean; directory?: boolean },
): Promise<{ resource: File | Directory | null; path: string }> {
  if (isInMemoryToolPath(path)) {
    const root = getInMemoryRoot();
    const relative =
      path === IN_MEMORY_ROOT_NAME ? '' : path.slice(`${IN_MEMORY_ROOT_NAME}/`.length);
    if (!relative) {
      return { resource: root, path: IN_MEMORY_ROOT_NAME };
    }
    const lookup = options?.directory && !relative.endsWith('/') ? `${relative}/` : relative;
    const resource = await root.getResource(lookup, options?.create ? { create: true } : undefined);
    return { resource: resource as File | Directory | null, path };
  }

  const workspace = await workspaceService.getWorkspace();
  if (!workspace) return { resource: null, path };

  if (isWorkspaceRootPath(path)) {
    return { resource: workspace, path: '' };
  }

  const lookup =
    options?.directory && !path.endsWith('/') ? `${path}/` : path;
  const resource = await workspace.getResource(
    lookup,
    options?.create ? { create: true } : undefined,
  );
  return { resource: resource as File | Directory | null, path };
}

/**
 * Present image-like workspace files for vision (data URLs or known image extensions).
 * Returns null when the file should be treated as ordinary text.
 */
function visionToolOutput(
  path: string,
  contents: string,
  mimeHint?: string,
): Record<string, unknown> | null {
  const name = fileNameFromPath(path);
  const dataUrl =
    typeof contents === 'string' && contents.startsWith('data:image/') ? contents : undefined;
  const mime =
    mimeHint ||
    (dataUrl ? dataUrl.slice(5, dataUrl.indexOf(';')) : undefined) ||
    resolveMediaType({ name, mime: mimeHint })?.mime;

  if (isSvgAttachment({ name, mime, text: dataUrl ? undefined : contents })) {
    return null;
  }

  const media = resolveMediaType({ name, mime });
  if (!dataUrl && media?.mode !== 'raster') return null;
  if (!dataUrl) return null;

  const present = media?.vision !== false;
  return {
    path,
    name,
    mime,
    kind: 'image',
    ...(present
      ? {
          [IMAGE_PRESENT_KEY]: true,
          dataUrl,
          note: 'Image bytes will be provided to the model in the next message for vision inspection.',
        }
      : {
          dataUrlOmitted: true,
          note: 'This media type is stored for preview; vision presentation is skipped.',
        }),
  };
}

/** Registers built-in workspace file tools (paths may use in-memory:// URI form). */
export function registerWorkspaceTools(broker: ToolBroker): void {
  broker.register(
    {
      name: 'workspace_list',
      description:
        'List children of a workspace directory. Omit path (or use "" / "/") for connected roots (use those path prefixes for writes). in-memory/… works without mounting.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description:
              'Directory path under a connected root (empty = list roots). in-memory://… URIs are accepted.',
          },
        },
        required: [],
      },
    },
    async (call) => {
      try {
        const path = toWorkspaceToolPath(String(call.arguments.path ?? ''));
        const { resource } = await resolveResource(path, { directory: true });
        if (!(resource instanceof Directory)) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: isInMemoryToolPath(path) ? 'Not a directory' : 'No workspace / not a directory',
          };
        }
        const children = await resource.listChildren(true);
        return {
          id: call.id,
          name: call.name,
          ok: true,
          output: children.map((c) => ({
            name: c.getName(),
            path: c.getWorkspacePath(),
            kind: c instanceof Directory ? 'directory' : 'file',
          })),
        };
      } catch (err) {
        return {
          id: call.id,
          name: call.name,
          ok: false,
          output: null,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    },
  );

  broker.register(
    {
      name: 'workspace_read',
      description:
        'Read a workspace file as text. Paths should be root/… from workspace_list; a bare name is auto-rooted when only one folder is connected. Image data-URL files are presented for vision.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'File path under a connected root (e.g. tests/readme.md).',
          },
          offset: { type: 'number', description: 'Text start offset' },
          limit: { type: 'number', description: 'Max text characters to return' },
        },
        required: ['path'],
      },
    },
    async (call) => {
      try {
        const qualified = await qualifyWorkspaceToolPath(String(call.arguments.path ?? ''), 'read');
        if (!qualified.ok) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: qualified.error,
          };
        }
        const path = qualified.path;
        const { resource } = await resolveResource(path);
        if (!(resource instanceof File)) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: isInMemoryToolPath(path) ? 'Not a file' : 'No workspace / not a file',
          };
        }
        const contents = await resource.getContents();
        const text = typeof contents === 'string' ? contents : String(contents ?? '');
        const vision = visionToolOutput(path, text, optionalMimeType(resource));
        if (vision) {
          return { id: call.id, name: call.name, ok: true, output: vision };
        }

        const offset =
          typeof call.arguments.offset === 'number' ? Math.max(0, call.arguments.offset) : 0;
        const limit =
          typeof call.arguments.limit === 'number' ? Math.max(1, call.arguments.limit) : undefined;
        if (offset || limit != null) {
          const slice = text.slice(offset, limit != null ? offset + limit : undefined);
          return {
            id: call.id,
            name: call.name,
            ok: true,
            output: {
              path,
              offset,
              length: slice.length,
              totalLength: text.length,
              truncated: offset + slice.length < text.length,
              content: slice,
            },
          };
        }
        return { id: call.id, name: call.name, ok: true, output: text };
      } catch (err) {
        return {
          id: call.id,
          name: call.name,
          ok: false,
          output: null,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    },
  );

  broker.register(
    {
      name: 'workspace_write',
      description:
        'Write text to a workspace file (creates parents as needed). Prefer root/… paths from workspace_list. A bare filename uses the only durable root, or opens a folder picker when several roots are connected.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'File path under a connected root (e.g. docs/notes.md).',
          },
          contents: { type: 'string' },
        },
        required: ['path', 'contents'],
      },
    },
    async (call) => {
      try {
        const args = asRecord(call.arguments);
        const qualified = await qualifyWorkspaceToolPath(String(args.path ?? ''), 'write');
        if (!qualified.ok) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: qualified.error,
            mutating: true,
          };
        }
        const path = qualified.path;
        const contents = String(args.contents ?? '');
        const { resource } = await resolveResource(path, { create: true });
        if (!(resource instanceof File)) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: isInMemoryToolPath(path) ? 'Not a file' : 'No workspace / not a file',
            mutating: true,
          };
        }
        await resource.saveContents(contents);
        return {
          id: call.id,
          name: call.name,
          ok: true,
          output: {
            path,
            ...(qualified.resolvedFrom ? { resolvedFrom: qualified.resolvedFrom } : {}),
          },
          mutating: true,
        };
      } catch (err) {
        return {
          id: call.id,
          name: call.name,
          ok: false,
          output: null,
          error: err instanceof Error ? err.message : String(err),
          mutating: true,
        };
      }
    },
  );

  broker.register(
    {
      name: CREATE_PLAN_TOOL,
      description:
        'Write the plan document in plan mode. Pass path to rewrite an existing plan. Omit path only to start a new plan-<short-description>.plan.md; an existing file with that name is replaced, not copied. Contents are the full document. This does not implement the plan.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Existing plan-*.plan.md to rewrite. Required when this work already has a plan.',
          },
          description: {
            type: 'string',
            description: 'Short description for a new file name, such as "todo" or "add status bar". Omit when path is set.',
          },
          contents: {
            type: 'string',
            description:
              'Full plan markdown: # Requirements, # Spec with SHALL requirements and WHEN/THEN scenarios, # State, # Interface, and # Files.',
          },
        },
        required: ['contents'],
      },
    },
    async (call) => {
      try {
        const args = asRecord(call.arguments);
        const contents = String(args.contents ?? '');
        if (!contents.trim()) {
          return { id: call.id, name: call.name, ok: false, output: null, error: 'Plan contents are empty' };
        }
        const target = planWriteTarget(args);
        if ('error' in target) {
          return { id: call.id, name: call.name, ok: false, output: null, error: target.error };
        }
        const qualified = await qualifyWorkspaceToolPath(target.path, 'write');
        if (!qualified.ok) {
          return { id: call.id, name: call.name, ok: false, output: null, error: qualified.error, mutating: true };
        }
        if (!isPlanFilePath(qualified.path)) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: 'path must be a plan-*.plan.md file',
          };
        }
        const path = qualified.path;
        const { resource } = await resolveResource(path, { create: true });
        if (!(resource instanceof File)) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: 'No workspace / not a file',
            mutating: true,
          };
        }
        await resource.saveContents(contents);
        return {
          id: call.id,
          name: call.name,
          ok: true,
          output: { path: resource.getWorkspacePath() || path },
          mutating: true,
        };
      } catch (err) {
        return {
          id: call.id,
          name: call.name,
          ok: false,
          output: null,
          error: err instanceof Error ? err.message : String(err),
          mutating: true,
        };
      }
    },
  );
}

