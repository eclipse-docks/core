import { activeSelectionSignal, Directory, toastError } from '@eclipse-docks/core';
import { terminalService } from './terminal-service';

export const SHELL_PROFILE_ID = 'terminal.javascript-shell';

export function selectedDirectory(): Directory | undefined {
  const selection = activeSelectionSignal.get();
  return selection instanceof Directory ? selection : undefined;
}

export function openShellHere(): void {
  const directory = selectedDirectory();
  if (!directory) {
    toastError('Select a folder to open a shell.');
    return;
  }
  void terminalService.createTerminal({
    profileId: SHELL_PROFILE_ID,
    cwd: directory.getWorkspacePath(),
    name: directory.getName(),
  });
}
