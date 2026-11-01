import { workspaceService, File, Directory } from '@eclipse-docks/core';
import type { ToolBroker } from './broker';

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

/** Registers built-in workspace file tools on the broker. */
export function registerWorkspaceTools(broker: ToolBroker): void {
  broker.register(
    {
      name: 'workspace_list',
      description: 'List children of a workspace directory path',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string', description: 'Directory path relative to workspace' } },
        required: ['path'],
      },
    },
    async (call) => {
      try {
        const path = String(call.arguments.path ?? '');
        const root = await workspaceService.getWorkspace();
        if (!root) return { id: call.id, name: call.name, ok: false, output: null, error: 'No workspace' };
        const resource = await root.getResource(path.endsWith('/') ? path : `${path}/`);
        if (!(resource instanceof Directory)) {
          return { id: call.id, name: call.name, ok: false, output: null, error: 'Not a directory' };
        }
        const children = await resource.listChildren(true);
        return {
          id: call.id,
          name: call.name,
          ok: true,
          output: children.map((c) => ({ name: c.getName(), path: c.getWorkspacePath() })),
        };
      } catch (err) {
        return { id: call.id, name: call.name, ok: false, output: null, error: err instanceof Error ? err.message : String(err) };
      }
    },
  );

  broker.register(
    {
      name: 'workspace_read',
      description: 'Read a workspace file as text',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' } },
        required: ['path'],
      },
    },
    async (call) => {
      try {
        const path = String(call.arguments.path ?? '');
        const root = await workspaceService.getWorkspace();
        if (!root) return { id: call.id, name: call.name, ok: false, output: null, error: 'No workspace' };
        const resource = await root.getResource(path);
        if (!(resource instanceof File)) {
          return { id: call.id, name: call.name, ok: false, output: null, error: 'Not a file' };
        }
        const contents = await resource.getContents();
        return { id: call.id, name: call.name, ok: true, output: contents };
      } catch (err) {
        return { id: call.id, name: call.name, ok: false, output: null, error: err instanceof Error ? err.message : String(err) };
      }
    },
  );

  broker.register(
    {
      name: 'workspace_write',
      description: 'Write text contents to a workspace file (creates parents as needed)',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          contents: { type: 'string' },
        },
        required: ['path', 'contents'],
      },
    },
    async (call) => {
      try {
        const args = asRecord(call.arguments);
        const path = String(args.path ?? '');
        const contents = String(args.contents ?? '');
        const root = await workspaceService.getWorkspace();
        if (!root) {
          return { id: call.id, name: call.name, ok: false, output: null, error: 'No workspace', mutating: true };
        }
        const resource = await root.getResource(path, { create: true });
        if (!(resource instanceof File)) {
          return { id: call.id, name: call.name, ok: false, output: null, error: 'Not a file', mutating: true };
        }
        await resource.saveContents(contents);
        return { id: call.id, name: call.name, ok: true, output: { path }, mutating: true };
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
