import { customElement, property, state } from 'lit/decorators.js';
import { DocksWidget } from '@eclipse-docks/core';
import { css, html, type PropertyValues } from 'lit';
import {
  applyHexDigitOverwrite,
  asciiPreview,
  formatHexBytes,
  HEX_BYTES_PER_LINE,
  hexLineCaretNext,
  hexLineCaretPrev,
  hexRowCountForByteLength,
  mergeHexLineAtOffset,
  parseHexFlexible,
} from './utils.js';

const supportsBeforeInput =
  typeof InputEvent !== 'undefined' && 'inputType' in InputEvent.prototype;

@customElement('docks-hexeditor')
export class DocksHexEditor extends DocksWidget {
  @property({ attribute: false })
  initialBytes: Uint8Array = new Uint8Array(0);

  @property({ type: Number })
  seed = 0;

  @property({ type: Boolean })
  readOnly = false;

  @state()
  private bytes: Uint8Array = new Uint8Array(0);

  private lastSeed = -1;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('seed') && this.seed !== this.lastSeed) {
      this.lastSeed = this.seed;
      this.bytes = new Uint8Array(this.initialBytes);
    }
  }

  private emitChange(bytes: Uint8Array) {
    this.dispatchEvent(
      new CustomEvent('content-change', {
        detail: { bytes },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private commitHexLine(byteOffset: number, line: string, input: HTMLInputElement, caret: number) {
    const merged = mergeHexLineAtOffset(this.bytes, byteOffset, line);
    this.bytes = merged;
    this.emitChange(merged);
    void this.updateComplete.then(() => {
      if (!input.isConnected) return;
      const formatted = formatHexBytes(
        merged.subarray(byteOffset, Math.min(byteOffset + HEX_BYTES_PER_LINE, merged.length)),
      );
      input.value = formatted;
      const c = Math.min(caret, formatted.length);
      input.setSelectionRange(c, c);
    });
  }

  private onHexLineBeforeInput = (byteOffset: number, e: Event) => {
    if (this.readOnly || !supportsBeforeInput) return;
    const ie = e as InputEvent;
    if (ie.isComposing) return;
    if (ie.inputType === 'insertText' && ie.data && /^[0-9a-fA-F]$/.test(ie.data)) {
      ie.preventDefault();
      const input = ie.target as HTMLInputElement;
      const next = applyHexDigitOverwrite(input.value, input.selectionStart ?? 0, input.selectionEnd ?? 0, ie.data);
      if (!next) return;
      input.value = next.line;
      input.setSelectionRange(next.caret, next.caret);
      this.commitHexLine(byteOffset, next.line, input, next.caret);
      return;
    }
    if (
      ie.inputType === 'insertText' ||
      ie.inputType === 'insertLineBreak' ||
      ie.inputType === 'insertParagraph' ||
      ie.inputType === 'insertFromPaste'
    ) {
      ie.preventDefault();
    }
  };

  private onHexLineKeydown = (byteOffset: number, e: KeyboardEvent) => {
    if (this.readOnly) return;
    const input = e.target as HTMLInputElement;

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      if (start !== end) {
        input.setSelectionRange(start, start);
        return;
      }
      const caret =
        e.key === 'Backspace' ? hexLineCaretPrev(input.value, start) : hexLineCaretNext(input.value, start);
      input.setSelectionRange(caret, caret);
      return;
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      const caret = hexLineCaretNext(input.value, input.selectionStart ?? 0);
      input.setSelectionRange(caret, caret);
      return;
    }

    if (!supportsBeforeInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (/[0-9a-fA-F]/.test(e.key)) {
        e.preventDefault();
        const next = applyHexDigitOverwrite(
          input.value,
          input.selectionStart ?? 0,
          input.selectionEnd ?? 0,
          e.key,
        );
        if (!next) return;
        input.value = next.line;
        input.setSelectionRange(next.caret, next.caret);
        this.commitHexLine(byteOffset, next.line, input, next.caret);
        return;
      }
      e.preventDefault();
    }
  };

  private onHexLinePaste = (byteOffset: number, e: ClipboardEvent) => {
    if (this.readOnly) return;
    e.preventDefault();
    this.applyHexPaste(byteOffset, e);
  };

  private applyHexPaste(byteOffset: number, e: ClipboardEvent) {
    const input = e.target as HTMLInputElement | null;
    if (!input) return;
    const text = e.clipboardData?.getData('text/plain') ?? '';
    const raw = parseHexFlexible(text);
    const n = Math.min(raw.length, HEX_BYTES_PER_LINE);
    const line = formatHexBytes(raw.subarray(0, n));
    this.commitHexLine(byteOffset, line, input, 0);
  }

  getBytesSnapshot(): Uint8Array {
    return new Uint8Array(this.bytes);
  }

  protected render() {
    const len = this.bytes.length;
    const rows = hexRowCountForByteLength(len || 1);
    const headerCells = [];
    for (let h = 0; h < HEX_BYTES_PER_LINE; h++) {
      headerCells.push(html`<span class="hex-col-head">${h.toString(16)}</span>`);
    }

    const dataRows = [];
    for (let r = 0; r < rows; r++) {
      const offset = r * HEX_BYTES_PER_LINE;
      const slice = this.bytes.subarray(offset, Math.min(offset + HEX_BYTES_PER_LINE, this.bytes.length));
      const addr = offset.toString(16).padStart(8, '0');
      const hexVal = formatHexBytes(slice);
      const asciiVal = asciiPreview(slice);

      dataRows.push(html`
        <div class="hex-row" part="hex-row">
          <span class="addr-col">${addr}h</span>
          <div class="hex-cols" role="group" aria-label="hex bytes">
            <input
              type="text"
              class="hex-line-input"
              spellcheck="false"
              autocomplete="off"
              ?readonly=${this.readOnly}
              .value=${hexVal}
              @beforeinput=${(e: Event) => this.onHexLineBeforeInput(offset, e)}
              @keydown=${(e: KeyboardEvent) => this.onHexLineKeydown(offset, e)}
              @paste=${(e: ClipboardEvent) => this.onHexLinePaste(offset, e)}
              @cut=${(e: ClipboardEvent) => e.preventDefault()}
            />
          </div>
          <span class="ascii-col">${asciiVal}</span>
        </div>
      `);
    }

    return html`
      <div class="hex-shell">
        <div class="hex-header" part="hex-header">
          <span class="addr-col"></span>
          <div class="hex-cols hex-header-cols">${headerCells}</div>
          <span class="ascii-header" title="ASCII">ASCII</span>
        </div>
        <wa-scroller class="hex-scroll" orientation="vertical">
          <div class="hex-body">${dataRows}</div>
        </wa-scroller>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
    }
    .hex-shell {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      padding: var(--wa-space-s, 0.5rem);
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      line-height: 1.5;
      width: fit-content;
      max-width: 100%;
      min-width: 0;
    }
    .hex-scroll {
      flex: 1 1 auto;
      min-height: 0;
    }
    .hex-header {
      display: grid;
      /* addr | hex (48 chars for 16 bytes) | ASCII preview (16 chars) */
      grid-template-columns: 5.5rem 48ch 16ch;
      gap: var(--wa-space-s, 0.5rem);
      align-items: end;
      padding-bottom: var(--wa-space-xs, 0.25rem);
      margin-bottom: var(--wa-space-xs, 0.25rem);
      border-bottom: 1px solid var(--wa-color-neutral-border, #444);
      color: var(--wa-color-neutral-50, #888);
      user-select: none;
    }
    .hex-header-cols {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      gap: 0;
      text-align: center;
      width: 48ch;
      min-width: 0;
    }
    .hex-col-head {
      font-size: var(--wa-font-size-xs, 0.75rem);
    }
    .ascii-header {
      text-align: left;
      width: 16ch;
      min-width: 16ch;
    }
    .hex-body {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .hex-row {
      display: grid;
      grid-template-columns: 5.5rem 48ch 16ch;
      gap: var(--wa-space-s, 0.5rem);
      align-items: center;
      min-height: 1.5em;
    }
    .addr-col {
      color: var(--wa-color-neutral-50, #888);
      text-align: right;
      user-select: none;
      padding-right: var(--wa-space-xs, 0.25rem);
    }
    .hex-cols {
      width: 48ch;
      min-width: 0;
      max-width: 100%;
    }
    .hex-line-input {
      box-sizing: border-box;
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0.1em 0.25em;
      border: 1px solid transparent;
      border-radius: var(--wa-border-radius-s, 2px);
      background: var(--wa-color-neutral-fill-quiet, rgba(128, 128, 128, 0.08));
      color: inherit;
      font: inherit;
      letter-spacing: 0.02em;
    }
    .hex-line-input:hover:not(:read-only) {
      border-color: var(--wa-color-neutral-border, #555);
    }
    .hex-line-input:focus {
      outline: var(--wa-focus-ring-width, 2px) solid var(--wa-color-focus, #3b82f6);
      outline-offset: 0;
      border-color: transparent;
    }
    .hex-line-input:read-only {
      opacity: 0.9;
    }
    .ascii-col {
      color: var(--wa-color-neutral-80, #bbb);
      white-space: pre;
      overflow: visible;
      width: 16ch;
      min-width: 16ch;
      padding-left: var(--wa-space-xs, 0.25rem);
      user-select: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-hexeditor': DocksHexEditor;
  }
}
