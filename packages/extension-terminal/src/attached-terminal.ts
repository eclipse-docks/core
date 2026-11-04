import { terminalService } from './terminal-service';
import type { Terminal } from './terminal-api';

/**
 * One terminal tab bound to a caller-owned session.
 * Closing the tab forgets the tab only. release() also drops the session binding.
 */
export class AttachedTerminal {
  private terminal?: Terminal;
  private unsubscribe?: () => void;
  private opening?: Promise<Terminal | undefined>;
  private disposed = false;
  private generation = 0;

  constructor(
    private readonly openTerminal: () => Promise<Terminal | undefined>,
    private readonly onDiscard?: () => void,
  ) {}

  async show(): Promise<boolean> {
    if (this.disposed) return false;
    if (this.terminal) {
      this.terminal.show();
      return true;
    }

    const generation = this.generation;
    this.opening ??= this.openTerminal();
    try {
      const terminal = await this.opening;
      if (this.disposed || generation !== this.generation) {
        void terminal?.dispose({ confirm: false });
        return false;
      }
      const existing = this.currentTerminal();
      if (existing) {
        existing.show();
        return true;
      }
      if (!terminal) return false;
      this.remember(terminal);
      return true;
    } finally {
      if (this.generation === generation) this.opening = undefined;
    }
  }

  release(): void {
    this.disposed = true;
    this.drop();
  }

  /** Forget the current tab so the next show() attaches the replacement session. */
  reset(): void {
    this.disposed = false;
    this.drop();
  }

  private currentTerminal(): Terminal | undefined {
    return this.terminal;
  }

  private remember(terminal: Terminal): void {
    this.terminal = terminal;
    this.unsubscribe = terminalService.onDidCloseTerminal((closed) => {
      if (closed.id !== terminal.id) return;
      this.unsubscribe?.();
      this.unsubscribe = undefined;
      if (this.terminal === terminal) this.terminal = undefined;
    });
  }

  private drop(): void {
    this.generation += 1;
    this.opening = undefined;
    const terminal = this.terminal;
    this.terminal = undefined;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.onDiscard?.();
    void terminal?.dispose({ confirm: false });
  }
}
