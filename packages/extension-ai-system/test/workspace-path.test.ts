import { describe, expect, it } from 'vitest';
import {
  decideRootQualification,
  joinUnderRoot,
  pathHasKnownRoot,
} from '../src/runtime/tools/workspace-path-qualify';

describe('workspace path qualification', () => {
  it('detects known composite roots', () => {
    expect(pathHasKnownRoot('tests/demo.canvas.js', ['tests'])).toBe(true);
    expect(pathHasKnownRoot('demo.canvas.js', ['tests'])).toBe(false);
    expect(pathHasKnownRoot('in-memory/sess/a.png', ['tests', 'in-memory'])).toBe(true);
  });

  it('joins under a chosen root', () => {
    expect(joinUnderRoot('tests', 'demo.canvas.js')).toBe('tests/demo.canvas.js');
    expect(joinUnderRoot('tests/', 'sub/demo.canvas.js')).toBe('tests/sub/demo.canvas.js');
  });

  it('auto-prefixes when a single durable root exists', () => {
    expect(decideRootQualification('demo.canvas.js', ['tests'], 'write')).toEqual({
      action: 'prefix',
      root: 'tests',
    });
  });

  it('asks the user to pick when several durable roots exist on write', () => {
    expect(decideRootQualification('demo.canvas.js', ['tests', 'docs'], 'write')).toEqual({
      action: 'pick',
    });
  });

  it('keeps already-rooted and in-memory paths', () => {
    expect(decideRootQualification('tests/demo.canvas.js', ['tests'], 'write')).toEqual({
      action: 'keep',
    });
    expect(decideRootQualification('in-memory/sess/a.png', ['tests'], 'write')).toEqual({
      action: 'keep',
    });
  });

  it('errors on write with no durable roots', () => {
    const result = decideRootQualification('demo.canvas.js', [], 'write');
    expect(result.action).toBe('error');
  });

  it('errors on ambiguous read instead of opening a picker', () => {
    const result = decideRootQualification('demo.canvas.js', ['tests', 'docs'], 'read');
    expect(result.action).toBe('error');
  });
});
