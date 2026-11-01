import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@eclipse-docks/core', () => ({
  commandRegistry: {
    createExecutionContext: () => ({}),
    listCommands: () => ({
      canvas_help: {
        id: 'canvas.help',
        name: 'Canvas help',
        description: 'Show canvas help',
        parameters: [],
      },
    }),
    execute: vi.fn(),
  },
}));

import { ToolBroker } from '../src/runtime/tools/broker';
import { refreshCommandTools } from '../src/runtime/tools/command-adapter';

describe('refreshCommandTools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('keeps attachment tools registered across command refresh', () => {
    const broker = new ToolBroker();
    broker.register(
      {
        name: 'attachment_list',
        description: 'list',
        parameters: { type: 'object', properties: {} },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: [] }),
    );
    broker.register(
      {
        name: 'attachment_read',
        description: 'read',
        parameters: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: {} }),
    );
    broker.register(
      {
        name: 'workspace_read',
        description: 'read workspace',
        parameters: { type: 'object', properties: {} },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: '' }),
    );

    refreshCommandTools(broker, 'build');

    const names = broker.listDefinitions('build').map((d) => d.name);
    expect(names).toContain('attachment_list');
    expect(names).toContain('attachment_read');
    expect(names).toContain('workspace_read');
    expect(names).toContain('canvas_help');
  });
});
