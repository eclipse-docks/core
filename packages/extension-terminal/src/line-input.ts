/** Minimal readline-style editor for xterm-backed REPL backends. */
export class LineInput {
  private buffer = '';
  private cursor = 0;
  private history: string[] = [];
  private historyDraft = '';
  private historyIndex = 0;

  constructor(private write: (data: string) => void) {}

  reset(): void {
    this.buffer = '';
    this.cursor = 0;
    this.historyDraft = '';
    this.historyIndex = this.history.length;
  }

  /** Returns the submitted line on Enter, otherwise null. */
  feed(data: string): string | null {
    if (data === '\r') {
      const line = this.buffer;
      this.pushHistory(line);
      this.buffer = '';
      this.cursor = 0;
      this.write('\r\n');
      return line;
    }

    if (data === '\u007f' || data === '\b') {
      this.deleteBackward();
      return null;
    }

    if (data === '\x1b[D' || data === '\x1bOD') {
      this.move(-1);
      return null;
    }
    if (data === '\x1b[C' || data === '\x1bOC') {
      this.move(1);
      return null;
    }
    if (data === '\x1b[A' || data === '\x1bOA') {
      this.historyPrev();
      return null;
    }
    if (data === '\x1b[B' || data === '\x1bOB') {
      this.historyNext();
      return null;
    }
    if (data === '\x1b[3~') {
      this.deleteForward();
      return null;
    }
    if (data === '\x1b[H' || data === '\x1bOH') {
      this.cursorHome();
      return null;
    }
    if (data === '\x1b[F' || data === '\x1bOF') {
      this.cursorEnd();
      return null;
    }

    if (data.startsWith('\x1b')) return null;

    for (const char of data) {
      if (char < ' ') continue;
      this.insert(char);
    }
    return null;
  }

  private move(delta: number): void {
    const next = this.cursor + delta;
    if (next < 0 || next > this.buffer.length) return;
    const steps = Math.abs(delta);
    this.cursor = next;
    this.write(delta < 0 ? `\x1b[${steps}D` : `\x1b[${steps}C`);
  }

  private cursorHome(): void {
    if (this.cursor === 0) return;
    this.write(`\x1b[${this.cursor}D`);
    this.cursor = 0;
  }

  private cursorEnd(): void {
    const steps = this.buffer.length - this.cursor;
    if (steps <= 0) return;
    this.write(`\x1b[${steps}C`);
    this.cursor = this.buffer.length;
  }

  private insert(char: string): void {
    if (this.cursor === this.buffer.length) {
      this.buffer += char;
      this.cursor++;
      this.write(char);
      return;
    }
    const tail = this.buffer.slice(this.cursor);
    this.buffer = this.buffer.slice(0, this.cursor) + char + tail;
    this.cursor++;
    this.write(char + tail + `\x1b[${tail.length}D`);
  }

  private deleteBackward(): void {
    if (this.cursor === 0) return;
    if (this.cursor === this.buffer.length) {
      this.buffer = this.buffer.slice(0, -1);
      this.cursor--;
      this.write('\b \b');
      return;
    }
    const after = this.buffer.slice(this.cursor);
    this.buffer = this.buffer.slice(0, this.cursor - 1) + after;
    this.cursor--;
    this.write(`\b${after} ` + `\x1b[${after.length + 1}D`);
  }

  private deleteForward(): void {
    if (this.cursor >= this.buffer.length) return;
    const after = this.buffer.slice(this.cursor + 1);
    this.write(`${after} ` + `\x1b[${after.length + 1}D`);
    this.buffer = this.buffer.slice(0, this.cursor) + after;
  }

  private replaceBuffer(next: string): void {
    if (this.cursor > 0) this.write(`\x1b[${this.cursor}D`);
    if (this.buffer.length > 0) this.write('\x1b[K');
    this.buffer = next;
    this.cursor = next.length;
    if (next) this.write(next);
  }

  private historyPrev(): void {
    if (this.history.length === 0) return;
    if (this.historyIndex === this.history.length) {
      this.historyDraft = this.buffer;
    }
    if (this.historyIndex === 0) return;
    this.historyIndex--;
    this.replaceBuffer(this.history[this.historyIndex]);
  }

  private historyNext(): void {
    if (this.historyIndex >= this.history.length) return;
    this.historyIndex++;
    if (this.historyIndex === this.history.length) {
      this.replaceBuffer(this.historyDraft);
      this.historyDraft = '';
      return;
    }
    this.replaceBuffer(this.history[this.historyIndex]);
  }

  private pushHistory(line: string): void {
    if (line.length > 0 && this.history[this.history.length - 1] !== line) {
      this.history.push(line);
    }
    this.historyIndex = this.history.length;
    this.historyDraft = '';
  }
}
