import { css, customElement, html } from '@eclipse-docks/core/externals/lit';
import {
  DocksPart,
  appSettings,
  promptDialog,
  subscribe,
  unsubscribe,
} from '@eclipse-docks/core';
import {
  TERMINAL_INSTANCES_TABS_ID,
  TERMINAL_NEW_DROPDOWN,
  TERMINAL_PANEL_SETTINGS_KEY,
  TOPIC_TERMINAL_ACTIVE_CHANGED,
  TOPIC_TERMINAL_CLOSED,
  TOPIC_TERMINAL_OPENED,
  type PersistedTerminalState,
} from './terminal-api';
import { emptyTerminalState, parseTerminalState } from './terminal-persistence';
import { terminalService, type TerminalTabsHost } from './terminal-service';
import './terminal-view';

@customElement('docks-terminal-panel')
export class DocksTerminalPanel extends DocksPart {
  protected scrollMode: 'scroller' | 'native' | 'none' = 'none';

  private unsubscribeTerminalEvents: (() => void)[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    terminalService.setPersistenceHandlers(
      () => this.loadPersistedState(),
      (state) => this.savePersistedState(state)
    );
    for (const topic of [TOPIC_TERMINAL_ACTIVE_CHANGED, TOPIC_TERMINAL_OPENED, TOPIC_TERMINAL_CLOSED]) {
      const token = subscribe(topic, () => this.requestUpdate());
      this.unsubscribeTerminalEvents.push(() => unsubscribe(token));
    }
    this.updateComplete.then(() => {
      this.bindInstanceTabsHost();
      this.attachTabActivationListener();
      void terminalService.restorePersistedTerminals();
    });
  }

  private bindInstanceTabsHost(): void {
    const tabs = this.renderRoot.querySelector(
      `docks-tabs#${TERMINAL_INSTANCES_TABS_ID}`
    ) as TerminalTabsHost | null;
    terminalService.setInstanceTabsHost(tabs);
  }

  private attachTabActivationListener(): void {
    const tabs = this.renderRoot.querySelector('docks-tabs');
    if (!tabs) return;
    tabs.addEventListener('wa-tab-show', (event: Event) => {
      const name = (event as CustomEvent<{ name?: string }>).detail?.name;
      if (name) terminalService.handleTabActivated(name);
    });
  }

  disconnectedCallback(): void {
    for (const off of this.unsubscribeTerminalEvents) off();
    this.unsubscribeTerminalEvents = [];
    terminalService.setInstanceTabsHost(null);
    super.disconnectedCallback();
  }

  private async loadPersistedState(): Promise<PersistedTerminalState | null> {
    const raw = await appSettings.getDialogSetting(TERMINAL_PANEL_SETTINGS_KEY);
    return parseTerminalState(raw) ?? emptyTerminalState();
  }

  private async savePersistedState(state: PersistedTerminalState): Promise<void> {
    await appSettings.setDialogSetting(TERMINAL_PANEL_SETTINGS_KEY, state);
  }

  protected renderToolbar() {
    const hasActive = !!terminalService.activeTerminal;
    return html`
      <docks-command
        icon="plus"
        title="New Terminal"
        dropdown="${TERMINAL_NEW_DROPDOWN}"
        .action=${() => void terminalService.createTerminal()}
      >
      </docks-command>
      <docks-command
        icon="xmark"
        title="Kill Terminal"
        ?disabled=${!hasActive}
        .action=${async () => {
          await terminalService.activeTerminal?.dispose();
        }}
      ></docks-command>
      <docks-command
        icon="eraser"
        title="Clear"
        ?disabled=${!hasActive}
        .action=${() => {
          terminalService.activeTerminal?.clear?.();
        }}
      ></docks-command>
      <docks-command
        icon="pen"
        title="Rename"
        ?disabled=${!hasActive}
        .action=${async () => {
          const active = terminalService.activeTerminal;
          if (!active) return;
          const name = await promptDialog('Terminal name', active.name);
          if (name?.trim()) terminalService.renameActiveTerminal(name.trim());
        }}
      ></docks-command>
    `;
  }

  protected renderContent() {
    return html`
      <docks-tabs
        id="${TERMINAL_INSTANCES_TABS_ID}"
        placement="start"
        item-size="small"
      ></docks-tabs>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      min-height: 0;
    }

    docks-tabs {
      flex: 1;
      min-height: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-terminal-panel': DocksTerminalPanel;
  }
}
