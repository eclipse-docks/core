import { html } from '@eclipse-docks/core/externals/lit';
import {
  confirmDialog,
  contributionRegistry,
  i18n,
  PANEL_BOTTOM,
  publish,
  renderDropdownItem,
  rootContext,
  subscribe,
  unsubscribe,
  type TabContribution,
} from '@eclipse-docks/core';
import {
  TARGET_TERMINAL_PROFILES,
  TERMINAL_NEW_DROPDOWN,
  TOPIC_TERMINAL_ACTIVE_CHANGED,
  TOPIC_TERMINAL_CLOSED,
  TOPIC_TERMINAL_OPENED,
  VIEW_TERMINAL,
  type Terminal,
  type TerminalBackend,
  type TerminalCreationOptions,
  type TerminalProfileContribution,
  type TerminalTaskPresentation,
  type TerminalTaskRunner,
  type PersistedTerminalState,
  type TerminalRuntime,
} from './terminal-api';
import { emptyTerminalState, parseTerminalState, serializeTerminalState } from './terminal-persistence';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

async function confirmKillTerminal(name: string): Promise<boolean> {
  return confirmDialog(t.TERMINAL_KILL_CONFIRM({ name }));
}

interface TerminalTabsHost {
  has(key: string): boolean;
  activate(key: string): void;
  open(contribution: TabContribution): void;
  closeTab(event: Event, tabName: string): Promise<void>;
  updateTabLabel(tabName: string, label: string): void;
}

export type { TerminalTabsHost };

let terminalCounter = 0;

function nextTerminalId(): string {
  terminalCounter += 1;
  return `terminal-${terminalCounter}`;
}

class TerminalInstance implements TerminalRuntime {
  readonly id: string;
  name: string;
  readonly profileId: string;
  readonly creationOptions: TerminalCreationOptions;
  readonly groupId: string;
  hidden = false;
  backend: TerminalBackend | null = null;
  clearScreen?: () => void;

  constructor(
    id: string,
    name: string,
    profileId: string,
    creationOptions: TerminalCreationOptions,
    groupId: string
  ) {
    this.id = id;
    this.name = name;
    this.profileId = profileId;
    this.creationOptions = creationOptions;
    this.groupId = groupId;
  }

  sendText(text: string, addNewLine = true): void {
    if (!this.backend) return;
    this.backend.handleInput(text + (addNewLine ? '\r' : ''));
  }

  show(_preserveFocus?: boolean): void {
    terminalService.focusTerminalPanel();
    terminalService.activateTerminal(this.id);
    this.hidden = false;
  }

  hide(): void {
    this.hidden = true;
  }

  async dispose(): Promise<void> {
    await terminalService.disposeTerminal(this.id);
  }

  clear(): void {
    this.clearScreen?.();
  }
}

class TerminalService implements TerminalTaskRunner {
  private terminals = new Map<string, TerminalInstance>();
  private activeTerminalId: string | null = null;
  private preferredProfileId: string | null = null;
  private persistenceHandler: (() => Promise<PersistedTerminalState | null>) | null = null;
  private persistCallback: ((state: PersistedTerminalState) => Promise<void>) | null = null;
  private restoreStarted = false;
  private instanceTabsHost: TerminalTabsHost | null = null;

  get activeTerminal(): Terminal | undefined {
    if (!this.activeTerminalId) return undefined;
    return this.terminals.get(this.activeTerminalId);
  }

  getTerminals(): Terminal[] {
    return [...this.terminals.values()];
  }

  onDidOpenTerminal(callback: (terminal: Terminal) => void): () => void {
    const token = subscribe(TOPIC_TERMINAL_OPENED, callback);
    return () => unsubscribe(token);
  }

  onDidCloseTerminal(callback: (terminal: Terminal) => void): () => void {
    const token = subscribe(TOPIC_TERMINAL_CLOSED, callback);
    return () => unsubscribe(token);
  }

  onDidChangeActiveTerminal(callback: (terminal: Terminal | undefined) => void): () => void {
    const token = subscribe(TOPIC_TERMINAL_ACTIVE_CHANGED, callback);
    return () => unsubscribe(token);
  }

  setPersistenceHandlers(
    load: () => Promise<PersistedTerminalState | null>,
    save: (state: PersistedTerminalState) => Promise<void>
  ): void {
    this.persistenceHandler = load;
    this.persistCallback = save;
  }

  async restorePersistedTerminals(): Promise<void> {
    if (this.restoreStarted || !this.persistenceHandler) return;
    this.restoreStarted = true;
    const raw = await this.persistenceHandler();
    const state = raw ? parseTerminalState(raw) : null;
    if (!state || state.terminals.length === 0) return;

    this.preferredProfileId = state.preferredProfileId;
    for (const entry of state.terminals) {
      await this.createTerminal({
        ...entry.creationOptions,
        name: entry.name,
        profileId: entry.profileId,
        groupId: entry.groupId,
      }, entry.id);
    }
    if (state.activeTerminalId && this.terminals.has(state.activeTerminalId)) {
      this.setActiveTerminal(state.activeTerminalId);
    }
  }

  getProfiles(): TerminalProfileContribution[] {
    return contributionRegistry.getContributions<TerminalProfileContribution>(TARGET_TERMINAL_PROFILES);
  }

  resolveDefaultProfileId(): string | null {
    if (this.preferredProfileId) {
      const preferred = this.getProfiles().find((p) => p.id === this.preferredProfileId);
      if (preferred) return preferred.id;
    }
    const profiles = this.getProfiles().filter((p) => !p.hidden);
    const defaultProfile = profiles.find((p) => p.isDefault) ?? profiles[0];
    return defaultProfile?.id ?? null;
  }

  setInstanceTabsHost(host: TerminalTabsHost | null): void {
    this.instanceTabsHost = host;
  }

  getInstanceTabs(): TerminalTabsHost | null {
    return this.instanceTabsHost;
  }

  focusTerminalPanel(): void {
    const panel = document.querySelector(`docks-tabs#${PANEL_BOTTOM}`) as TerminalTabsHost | null;
    panel?.activate(VIEW_TERMINAL);
  }

  activateTerminal(id: string): void {
    const tabs = this.getInstanceTabs();
    if (tabs?.has(id)) {
      tabs.activate(id);
    }
    this.setActiveTerminal(id);
  }

  private setActiveTerminal(id: string | null): void {
    if (this.activeTerminalId === id) return;
    this.activeTerminalId = id;
    publish(TOPIC_TERMINAL_ACTIVE_CHANGED, id ? this.terminals.get(id) : undefined);
    void this.persistState();
  }

  async createTerminal(
    options: TerminalCreationOptions = {},
    forcedId?: string
  ): Promise<Terminal | undefined> {
    const profileId = options.profileId ?? this.resolveDefaultProfileId();
    if (!profileId) return undefined;

    const profile = this.getProfiles().find((p) => p.id === profileId);
    if (!profile) return undefined;

    const id = forcedId ?? nextTerminalId();
    if (forcedId) syncTerminalCounterFromId(forcedId);
    const groupId = options.groupId ?? id;
    const name = options.name ?? profile.label;

    let backend: TerminalBackend;
    try {
      backend = await profile.create({ ...options, profileId, name, groupId });
    } catch {
      return undefined;
    }

    const terminal = new TerminalInstance(id, name, profileId, { ...options, profileId, name, groupId }, groupId);
    terminal.backend = backend;
    terminal.hidden = options.hidden ?? false;

    this.terminals.set(id, terminal);
    this.openTerminalTab(terminal, profile.icon);

    if (!options.hidden) {
      this.focusTerminalPanel();
      this.activateTerminal(id);
    }

    publish(TOPIC_TERMINAL_OPENED, terminal);
    void this.persistState();
    return terminal;
  }

  private openTerminalTab(terminal: TerminalInstance, icon?: string): void {
    const tabs = this.getInstanceTabs();
    if (!tabs) return;

    const contribution: TabContribution = {
      name: terminal.id,
      label: terminal.name,
      icon: icon ?? 'terminal',
      closable: true,
      toolbar: false,
      beforeClose: async () => confirmKillTerminal(terminal.name),
      component: (tabId: string) =>
        html`<docks-terminal-view id="${tabId}" .terminal=${terminal}></docks-terminal-view>`,
    };

    if (tabs.has(terminal.id)) {
      tabs.activate(terminal.id);
      return;
    }
    tabs.open(contribution);
  }

  async disposeTerminal(id: string, options?: { skipTabRemoval?: boolean }): Promise<void> {
    const terminal = this.terminals.get(id);
    if (!terminal) return;

    if (!options?.skipTabRemoval) {
      const tabs = this.getInstanceTabs();
      if (tabs?.has(id)) {
        await tabs.closeTab(new Event('close'), id);
        return;
      }
    }

    await terminal.backend?.close?.();
    terminal.backend = null;
    this.terminals.delete(id);

    if (this.activeTerminalId === id) {
      const remaining = [...this.terminals.keys()];
      this.setActiveTerminal(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }

    publish(TOPIC_TERMINAL_CLOSED, terminal);
    void this.persistState();
  }

  async killAll(): Promise<void> {
    const tabs = this.getInstanceTabs();
    const ids = [...this.terminals.keys()];
    for (const id of ids) {
      if (tabs?.has(id)) {
        await tabs.closeTab(new Event('close'), id);
      } else {
        await this.disposeTerminal(id, { skipTabRemoval: true });
      }
    }
  }

  renameActiveTerminal(name: string): void {
    const active = this.activeTerminal;
    if (!active || !(active instanceof TerminalInstance)) return;
    active.name = name;
    this.getInstanceTabs()?.updateTabLabel(active.id, name);
    void this.persistState();
  }

  setPreferredProfile(profileId: string): void {
    this.preferredProfileId = profileId;
    void this.persistState();
  }

  clearActiveTerminal(): void {
    this.activeTerminal?.clear?.();
  }

  async runTask(
    presentation: TerminalTaskPresentation,
    execute: (terminal: Terminal) => Promise<void>
  ): Promise<void> {
    let terminal = this.getTerminals().find((t) => t.profileId === presentation.profileId);
    if (!terminal) {
      terminal = await this.createTerminal({ profileId: presentation.profileId });
    }
    if (!terminal) return;

    if (presentation.reveal !== 'never') {
      if (presentation.focus !== false) {
        terminal.show();
      } else {
        this.focusTerminalPanel();
      }
    }
    if (presentation.clear) {
      terminal.clear?.();
    }
    await execute(terminal);
  }

  private async persistState(): Promise<void> {
    if (!this.persistCallback) return;
    const state: PersistedTerminalState = {
      activeTerminalId: this.activeTerminalId,
      preferredProfileId: this.preferredProfileId,
      terminals: [...this.terminals.values()].map((t) => ({
        id: t.id,
        name: t.name,
        profileId: t.profileId,
        groupId: t.groupId,
        creationOptions: t.creationOptions,
      })),
    };
    await this.persistCallback(serializeTerminalState(state));
  }

  handleTabActivated(tabName: string): void {
    if (this.terminals.has(tabName)) {
      this.setActiveTerminal(tabName);
    }
  }

  handleTabClosed(tabName: string): void {
    if (this.terminals.has(tabName)) {
      void this.disposeTerminal(tabName, { skipTabRemoval: true });
    }
  }
}

function syncTerminalCounterFromId(id: string): void {
  const match = /^terminal-(\d+)$/.exec(id);
  if (!match) return;
  const n = Number.parseInt(match[1], 10);
  if (n > terminalCounter) terminalCounter = n;
}

export const terminalService = new TerminalService();
rootContext.put('terminalService', terminalService);

export function registerTerminalProfile(contribution: TerminalProfileContribution): void {
  contributionRegistry.registerContribution(TARGET_TERMINAL_PROFILES, contribution);
  if (contribution.hidden) return;
  const profileId = contribution.id;
  contributionRegistry.registerContribution(TERMINAL_NEW_DROPDOWN, {
    label: contribution.label,
    icon: contribution.icon ?? 'terminal',
    component: () => renderDropdownItem({
      icon: contribution.icon ?? 'terminal',
      label: contribution.label,
      title: contribution.label,
      action: () => {
        terminalService.setPreferredProfile(profileId);
        void terminalService.createTerminal({ profileId });
      },
    }),
  });
}
