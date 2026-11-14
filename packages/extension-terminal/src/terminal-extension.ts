import { html } from '@eclipse-docks/core/externals/lit';
import { contributionRegistry, PANEL_BOTTOM, registerAll } from '@eclipse-docks/core';
import { VIEW_TERMINAL } from './terminal-api';
import { CommandsBackend } from './commands-backend';
import { createJsSessionBackend, JsReplBackend, JS_REPL_PROFILE_ID, JS_SESSION_PROFILE_ID } from './js-terminal-backend';
import { openShellHere, selectedDirectory, SHELL_PROFILE_ID } from './shell-here';
import { registerTerminalProfile } from './terminal-service';
import './shell-command';
import './terminal-panel';

export { openShellHere, selectedDirectory, SHELL_PROFILE_ID };

export default async function activate() {
  registerTerminalProfile({
    id: SHELL_PROFILE_ID,
    label: 'Shell',
    icon: 'terminal',
    isDefault: true,
    create: async (options) => new CommandsBackend(options),
  });

  registerTerminalProfile({
    id: JS_REPL_PROFILE_ID,
    label: 'JavaScript',
    icon: 'code',
    create: async () => new JsReplBackend(),
  });

  registerTerminalProfile({
    id: JS_SESSION_PROFILE_ID,
    label: 'JavaScript',
    icon: 'code',
    hidden: true,
    persist: false,
    create: async (options) => createJsSessionBackend(options),
  });

  registerAll({
    command: {
      id: 'open_shell_here',
      name: 'Open Shell Here',
      description: 'Opens a shell in the selected folder',
    },
    handler: {
      execute: async () => {
        openShellHere();
      },
    },
    contribution: {
      target: 'contextmenu:view.filebrowser',
      name: 'contextmenu.filebrowser.open-shell',
      label: 'Open Shell Here',
      icon: 'terminal',
      visible: () => selectedDirectory() !== undefined,
    },
  });

  contributionRegistry.registerContribution(PANEL_BOTTOM, {
    name: VIEW_TERMINAL,
    label: 'Terminal',
    icon: 'terminal',
    component: (id: string) => html`<docks-terminal-panel id="${id}"></docks-terminal-panel>`,
  });
}
