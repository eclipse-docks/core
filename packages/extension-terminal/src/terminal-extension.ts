import { html } from '@eclipse-docks/core/externals/lit';
import { contributionRegistry, PANEL_BOTTOM, registerAll } from '@eclipse-docks/core';
import { VIEW_TERMINAL } from './terminal-api';
import { CommandsBackend } from './commands-backend';
import { createJsSessionBackend, JsReplBackend, JS_REPL_PROFILE_ID, JS_SESSION_PROFILE_ID } from './js-terminal-backend';
import { registerTerminalProfile, terminalService } from './terminal-service';
import './terminal-panel';

const COMMANDS_PROFILE_ID = 'terminal.javascript-shell';

export default async function activate() {
  registerTerminalProfile({
    id: COMMANDS_PROFILE_ID,
    label: 'Commands',
    icon: 'terminal',
    isDefault: true,
    create: async () => new CommandsBackend(),
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

  contributionRegistry.registerContribution(PANEL_BOTTOM, {
    name: VIEW_TERMINAL,
    label: 'Terminal',
    icon: 'terminal',
    component: (id: string) => html`<docks-terminal-panel id="${id}"></docks-terminal-panel>`,
  });
}
