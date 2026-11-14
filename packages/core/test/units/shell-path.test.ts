import { describe, expect, it } from 'vitest';
import { explicitWorkspacePath, namesWorkspaceRoot, resolveWorkspacePath } from '../../src/commands/shell-path';

describe('resolveWorkspacePath', () => {
  it('joins a relative path and rejects leaving the workspace root', () => {
    expect(resolveWorkspacePath('src', 'components')).toBe('src/components');
    expect(resolveWorkspacePath('src', '..')).toBe('');
    expect(resolveWorkspacePath('src', '../..')).toBeNull();
    expect(resolveWorkspacePath('', '..')).toBeNull();
    expect(resolveWorkspacePath('src', '/abs')).toBe('abs');
  });

  it('formats an explicit workspace path with a leading slash', () => {
    expect(explicitWorkspacePath('src/components')).toBe('/src/components');
    expect(explicitWorkspacePath('')).toBe('/');
  });

  it('recognizes a path that names a connected root', () => {
    expect(namesWorkspaceRoot('IndexedDB', ['IndexedDB'])).toBe(true);
    expect(namesWorkspaceRoot('IndexedDB/file', ['IndexedDB'])).toBe(true);
    expect(namesWorkspaceRoot('/IndexedDB', ['IndexedDB'])).toBe(false);
    expect(namesWorkspaceRoot('file.txt', ['IndexedDB'])).toBe(false);
  });
});
