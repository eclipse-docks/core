import { describe, expect, it } from 'vitest';
import {
  formatExecutionContextForPrompt,
  summarizeExecutionContext,
} from '../src/runtime/app-context-summary';

describe('appContextPromptEnhancer helpers', () => {
  it('summarizes active part/editor from an execution context', () => {
    const summary = summarizeExecutionContext({
      activePart: {
        id: 'part-1',
        localName: 'docks-part',
        tabContribution: { name: 'view.ai', label: 'AI' },
      },
      activeEditor: {
        localName: 'docks-canvas-editor',
        kind: 'workspace',
        input: { title: 'demo.canvas.js', key: 'tests/demo.canvas.js' },
        getFilePath: () => 'tests/demo.canvas.js',
        getLanguage: () => 'javascript',
        getSelection: () => '',
      },
    });

    expect(summary).toEqual({
      activePart: {
        id: 'part-1',
        label: 'AI',
        name: 'view.ai',
        element: 'docks-part',
      },
      activeEditor: {
        element: 'docks-canvas-editor',
        kind: 'workspace',
        title: 'demo.canvas.js',
        key: 'tests/demo.canvas.js',
        filePath: 'tests/demo.canvas.js',
        language: 'javascript',
      },
    });
  });

  it('formats a prompt section when context is present', () => {
    const section = formatExecutionContextForPrompt({
      activePart: { tabContribution: { label: 'AI' } },
    });
    expect(section).toContain('createExecutionContext');
    expect(section).toContain('"label": "AI"');
  });

  it('returns empty when context has no useful state', () => {
    expect(formatExecutionContextForPrompt({})).toBe('');
  });
});
