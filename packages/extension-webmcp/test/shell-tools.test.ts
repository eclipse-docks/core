/**
 * @vitest-environment jsdom
 */
import { COMMAND_TAG_SHELL, registerAll } from '@eclipse-docks/core';
import { afterEach, describe, expect, it } from 'vitest';
import { WebMCPService } from '../src/webmcp-service';

describe('WebMCP shell filter', () => {
  const registered: Array<{ name: string; description: string }> = [];

  afterEach(() => {
    registered.length = 0;
  });

  it('skips shell-tagged commands and refreshes the shell catalog', async () => {
    registerAll({
      command: {
        id: 'shell',
        name: 'Shell',
        description: 'placeholder',
        parameters: [
          { name: 'line', description: 'line', required: false },
          { name: 'cwd', description: 'cwd', required: false },
        ],
      },
      handler: { execute: () => 'ok' },
    });

    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {
        registerTool: async (tool: { name: string; description: string }) => {
          const existing = registered.findIndex((entry) => entry.name === tool.name);
          if (existing >= 0) registered.splice(existing, 1);
          registered.push({ name: tool.name, description: tool.description });
        },
        getTools: async () => registered,
      },
    });

    const service = new WebMCPService();
    await service.start();

    expect(registered.some((tool) => tool.name === 'ls')).toBe(false);
    const shell = registered.find((tool) => tool.name === 'shell');
    expect(shell?.description).toContain('ls (r)');

    registerAll({
      command: {
        id: 'webmcp_shell_verb',
        name: 'Verb',
        description: 'later verb',
        tags: [COMMAND_TAG_SHELL],
        grants: ['w'],
        parameters: [],
      },
      handler: { execute: () => 'v' },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(registered.some((tool) => tool.name === 'webmcp_shell_verb')).toBe(false);
    const refreshed = registered.find((tool) => tool.name === 'shell');
    expect(refreshed?.description).toContain('webmcp_shell_verb (w)');
    service.stop();
  });
});
