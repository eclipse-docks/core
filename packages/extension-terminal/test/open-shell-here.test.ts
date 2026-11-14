import { activeSelectionSignal, Directory } from '@eclipse-docks/core';

if (typeof HTMLElement !== 'undefined') {
  if (typeof HTMLElement.prototype.showPopover !== 'function') {
    HTMLElement.prototype.showPopover = () => {};
  }
  if (typeof HTMLElement.prototype.getAnimations !== 'function') {
    HTMLElement.prototype.getAnimations = () => [];
  }
}
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
  });
}
import { afterEach, describe, expect, it, vi } from 'vitest';
import activate from '../src/terminal-extension';
import { openShellHere, selectedDirectory, SHELL_PROFILE_ID } from '../src/shell-here';
import { terminalService } from '../src/terminal-service';

class Folder extends Directory {
  constructor(
    private readonly label: string,
    private readonly path: string,
  ) {
    super();
  }

  getName(): string {
    return this.label;
  }

  getParent(): Directory | undefined {
    return undefined;
  }

  override getWorkspacePath(): string {
    return this.path;
  }

  async delete(): Promise<void> {}

  async copyTo(): Promise<void> {}

  async rename(): Promise<void> {}

  async listChildren(): Promise<never[]> {
    return [];
  }

  async getResource(): Promise<null> {
    return null;
  }

  touch(): void {}
}

describe('open shell here', () => {
  afterEach(() => {
    activeSelectionSignal.set(undefined);
    vi.restoreAllMocks();
  });

  it('names the terminal after the folder and hides the action for other selections', () => {
    const create = vi.spyOn(terminalService, 'createTerminal').mockResolvedValue(undefined);
    const folder = new Folder('src', 'IndexedDB/src');
    activeSelectionSignal.set(folder);
    expect(selectedDirectory()).toBe(folder);

    openShellHere();
    expect(create).toHaveBeenCalledWith({
      profileId: SHELL_PROFILE_ID,
      cwd: 'IndexedDB/src',
      name: 'src',
    });

    activeSelectionSignal.set(undefined);
    expect(selectedDirectory()).toBeUndefined();
    create.mockClear();
    openShellHere();
    expect(create).not.toHaveBeenCalled();
  });

  it('names a session opened from the dropdown Shell', async () => {
    await activate();
    const terminal = await terminalService.createTerminal({ profileId: SHELL_PROFILE_ID });
    expect(terminal?.name).toBe('Shell');
    expect(terminal?.profileId).toBe('terminal.javascript-shell');
    expect(terminal?.creationOptions.cwd).toBeUndefined();
  });
});
