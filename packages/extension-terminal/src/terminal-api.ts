export const TARGET_TERMINAL_PROFILES = 'system.terminal.profiles';

export const VIEW_TERMINAL = 'view.terminal';
export const TERMINAL_INSTANCES_TABS_ID = 'terminal-instances';
/** Dropdown target: contributors register items that create a terminal with a profile. */
export const TERMINAL_NEW_DROPDOWN = `${TERMINAL_INSTANCES_TABS_ID}-new`;
export const TERMINAL_PANEL_SETTINGS_KEY = 'docks-terminal-panel';

export const TOPIC_TERMINAL_OPENED = 'events/terminal/opened';
export const TOPIC_TERMINAL_CLOSED = 'events/terminal/closed';
export const TOPIC_TERMINAL_ACTIVE_CHANGED = 'events/terminal/activeChanged';

export interface TerminalDimensions {
  cols: number;
  rows: number;
}

export interface TerminalCreationOptions {
  name?: string;
  profileId?: string;
  cwd?: string;
  env?: Record<string, string>;
  groupId?: string;
  hidden?: boolean;
}

export interface TerminalBackend {
  open?(initialDimensions?: TerminalDimensions): void | Promise<void>;
  close?(): void | Promise<void>;
  onDidWrite(callback: (data: string) => void): () => void;
  handleInput(data: string): void;
  setDimensions?(dimensions: TerminalDimensions): void;
}

export interface TerminalProfileContribution {
  id: string;
  label: string;
  icon?: string;
  isDefault?: boolean;
  hidden?: boolean;
  create(options?: TerminalCreationOptions): Promise<TerminalBackend>;
}

export interface TerminalTaskPresentation {
  profileId: string;
  reveal?: 'always' | 'silent' | 'never';
  focus?: boolean;
  clear?: boolean;
}

export interface Terminal {
  readonly id: string;
  name: string;
  readonly profileId: string;
  readonly creationOptions: TerminalCreationOptions;
  readonly groupId: string;
  hidden: boolean;
  sendText(text: string, addNewLine?: boolean): void;
  show(preserveFocus?: boolean): void;
  hide(): void;
  dispose(): Promise<void>;
  clear?(): void;
}

/** Internal terminal handle used by the host UI (not for provider extensions). */
export interface TerminalRuntime extends Terminal {
  backend: TerminalBackend | null;
  clearScreen?: () => void;
}

export interface TerminalTaskRunner {
  runTask(
    presentation: TerminalTaskPresentation,
    execute: (terminal: Terminal) => Promise<void>
  ): Promise<void>;
}

export interface PersistedTerminalState {
  terminals: PersistedTerminalEntry[];
  activeTerminalId: string | null;
  preferredProfileId: string | null;
}

export interface PersistedTerminalEntry {
  id: string;
  name: string;
  profileId: string;
  groupId: string;
  creationOptions: TerminalCreationOptions;
}
