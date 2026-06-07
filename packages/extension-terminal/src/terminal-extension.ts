import { html } from '@eclipse-docks/core/externals/lit';
import { contributionRegistry, PANEL_BOTTOM, registerAll } from '@eclipse-docks/core';
import { VIEW_TERMINAL } from './terminal-api';
import { CommandsBackend } from './commands-backend';
import { JsReplBackend, JS_REPL_PROFILE_ID } from './js-terminal-backend';
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

  contributionRegistry.registerContribution(PANEL_BOTTOM, {
    name: VIEW_TERMINAL,
    label: 'Terminal',
    icon: 'terminal',
    component: (id: string) => html`<docks-terminal-panel id="${id}"></docks-terminal-panel>`,
  });
}
