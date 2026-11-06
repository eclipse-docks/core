/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { ToolBroker } from '../src/runtime/tools/broker';
import { buildPlanPrompt, isPlanFilePath, planFileName, planWriteTarget } from '../src/runtime/tools/plan-file';

describe('plan files', () => {
  it('names a plan from a short description', () => {
    expect(planFileName('Add a status bar')).toBe('plan-add-a-status-bar.plan.md');
    expect(planFileName('Todo')).toBe('plan-todo.plan.md');
    expect(isPlanFilePath('My Folder/plan-todo.plan.md')).toBe(true);
    expect(isPlanFilePath('notes.md')).toBe(false);
    expect(buildPlanPrompt('My Folder/plan-todo.plan.md')).toContain('# Files');
  });

  it('rewrites an existing plan and only names a new file when none is given', () => {
    expect(planWriteTarget({ path: 'IndexedDB/plan-daily-todos.plan.md', description: 'kanban' })).toEqual({
      path: 'IndexedDB/plan-daily-todos.plan.md',
    });
    expect(planWriteTarget({ description: 'daily todos' })).toEqual({ path: 'plan-daily-todos.plan.md' });
    expect(planWriteTarget({ path: 'notes.md' })).toEqual({ error: 'path must be a plan-*.plan.md file' });
    expect(planWriteTarget({})).toEqual({ error: 'description is required when path is omitted' });
  });

  it('falls back to a short id when the description has no usable characters', () => {
    expect(planFileName('!!!')).toMatch(/^plan-[a-z0-9]+\.plan\.md$/);
  });

  it('offers create_plan only in plan mode and still blocks other writes', async () => {
    const broker = new ToolBroker();
    broker.register(
      { name: 'create_plan', description: 'plan', parameters: { type: 'object', properties: {} } },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: { path: 'plan-x.plan.md' } }),
    );
    broker.register(
      { name: 'workspace_write', description: 'write', parameters: { type: 'object', properties: {} } },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: {} }),
    );

    expect(broker.listDefinitions('plan').map((tool) => tool.name)).toEqual(['create_plan']);
    expect(broker.listDefinitions('explore').map((tool) => tool.name)).toEqual([]);
    expect(broker.listDefinitions('build').map((tool) => tool.name)).toEqual(['workspace_write']);

    const written = await broker.execute(
      { id: '1', name: 'create_plan', arguments: {} },
      's',
      'plan',
    );
    expect(written.ok).toBe(true);

    const deniedPlan = await broker.execute(
      { id: '2', name: 'create_plan', arguments: {} },
      's',
      'explore',
    );
    expect(deniedPlan.ok).toBe(false);

    const deniedWrite = await broker.execute(
      { id: '3', name: 'workspace_write', arguments: {} },
      's',
      'plan',
    );
    expect(deniedWrite.ok).toBe(false);
    expect(deniedWrite.error).toMatch(/denied/);
  });
});
