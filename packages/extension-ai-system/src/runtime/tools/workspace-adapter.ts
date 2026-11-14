import {
  workspaceService,
  File,
  Directory,
  getInMemoryRoot,
  IN_MEMORY_ROOT_NAME,
} from '@eclipse-docks/core';
import { CREATE_PLAN_TOOL } from '../constants';
import { qualifyWorkspaceToolPath } from './workspace-path';
import { isInMemoryToolPath, isWorkspaceRootPath } from './workspace-path-qualify';
import { isPlanFilePath, planWriteTarget } from './plan-file';
import type { ToolBroker } from './broker';

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
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

/** Registers the plan writer. File workflows go through the shell session. */
export function registerWorkspaceTools(broker: ToolBroker): void {
  broker.register(
    {
      name: CREATE_PLAN_TOOL,
      description:
        'Write the plan document in plan mode.',
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
            'The full plan document.',
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

