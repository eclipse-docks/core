import { customElement, property, state } from 'lit/decorators.js';
import { DocksWidget } from '@eclipse-docks/core';
import { css, html, type PropertyValues } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('docks-texteditor')
export class DocksTextEditor extends DocksWidget {
  @property()
  value = '';

  @property({ type: Boolean })
  readOnly = false;

  @state()
  private lineCount = 1;

  /** Matches textarea.scrollHeight so gutter scroll range equals text scroll range. */
  @state()
  private gutterScrollHeight = 0;

  private textareaRef = createRef<HTMLElement & { value: string }>();
  private innerTextarea: HTMLTextAreaElement | null = null;
  private gutterEl: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('value')) {
      const lines = this.value.split('\n').length;
      this.lineCount = Math.max(1, lines);
    }
  }

  protected updated(): void {
    queueMicrotask(() => {
      this.cacheElements();
      this.syncScrollMetrics();
      this.attachScrollListeners();
    });
  }

  disconnectedCallback(): void {
    this.teardownScrollListeners();
    super.disconnectedCallback();
  }

  private cacheElements(): void {
    const wa = this.textareaRef.value;
    this.innerTextarea = wa?.shadowRoot?.querySelector('textarea') ?? null;
    this.gutterEl = (this.renderRoot as ShadowRoot)?.querySelector('.line-gutter') ?? null;
  }

  private attachScrollListeners(): void {
    const inner = this.innerTextarea;
    const gutter = this.gutterEl;
    if (!inner || !gutter) return;

    inner.removeEventListener('scroll', this.onTextScroll);
    inner.addEventListener('scroll', this.onTextScroll, { passive: true });

    gutter.removeEventListener('scroll', this.onGutterScroll);
    gutter.addEventListener('scroll', this.onGutterScroll, { passive: true });

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.syncScrollMetrics();
      });
    }
    this.resizeObserver.disconnect();
    this.resizeObserver.observe(inner);
  }

  private teardownScrollListeners(): void {
    this.innerTextarea?.removeEventListener('scroll', this.onTextScroll);
    this.gutterEl?.removeEventListener('scroll', this.onGutterScroll);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.innerTextarea = null;
    this.gutterEl = null;
  }

  private onTextScroll = (): void => {
    const inner = this.innerTextarea;
    const gutter = this.gutterEl;
    if (!inner || !gutter) return;
    if (gutter.scrollTop !== inner.scrollTop) {
      gutter.scrollTop = inner.scrollTop;
    }
  };

  private onGutterScroll = (): void => {
    const inner = this.innerTextarea;
    const gutter = this.gutterEl;
    if (!inner || !gutter) return;
    if (inner.scrollTop !== gutter.scrollTop) {
      inner.scrollTop = gutter.scrollTop;
    }
  };

  private syncScrollMetrics(): void {
    const inner = this.innerTextarea;
    if (!inner) return;
    const sh = inner.scrollHeight;
    if (sh !== this.gutterScrollHeight) {
      this.gutterScrollHeight = sh;
    }
    this.onTextScroll();
  }

  private emitChange() {
    this.dispatchEvent(
      new CustomEvent('content-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onInput = (e: Event) => {
    const t = e.target as HTMLElement & { value: string };
    this.value = t.value;
    const lines = this.value.split('\n').length;
    this.lineCount = Math.max(1, lines);
    this.emitChange();
    queueMicrotask(() => this.syncScrollMetrics());
  };

  getValue(): string {
    return this.value;
  }

  getSelection(): string | null {
    const wa = this.textareaRef.value;
    const inner = wa?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!inner) return null;
    const { selectionStart, selectionEnd, value } = inner;
    if (selectionStart === selectionEnd) return '';
    return value.slice(selectionStart, selectionEnd);
  }

  getSnippet(linesAround = 5): { snippet: string; cursorLine: number } | null {
    const wa = this.textareaRef.value;
    const inner = wa?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!inner) return null;
    const text = this.value;
    const pos = inner.selectionStart;
    let lineStart = 0;
    let line = 0;
    for (let i = 0; i < text.length && i < pos; i++) {
      if (text[i] === '\n') {
        line++;
        lineStart = i + 1;
      }
    }
    const allLines = text.split('\n');
    const cur = line;
    const from = Math.max(0, cur - linesAround);
    const to = Math.min(allLines.length, cur + linesAround + 1);
    const snippet = allLines.slice(from, to).join('\n');
    return { snippet, cursorLine: cur };
  }

  protected render() {
    const numbers: number[] = [];
    for (let i = 1; i <= this.lineCount; i++) {
      numbers.push(i);
    }
    const innerMinHeight = this.gutterScrollHeight > 0 ? `${this.gutterScrollHeight}px` : '100%';
    return html`
      <div class="wrap">
        <div class="line-gutter" aria-hidden="true">
          <div class="line-gutter-inner" style="min-height: ${innerMinHeight}">
            ${numbers.map((n) => html`<div class="ln">${n}</div>`)}
          </div>
        </div>
        <wa-textarea
          class="editor-ta"
          resize="none"
          .value=${this.value}
          ?readonly=${this.readOnly}
          @input=${this.onInput}
          ${ref(this.textareaRef)}
        ></wa-textarea>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
    }
    .wrap {
      display: flex;
      flex-direction: row;
      height: 100%;
      min-height: 0;
      gap: var(--wa-space-s, 0.5rem);
    }
    .line-gutter {
      flex: 0 0 auto;
      min-width: 2.5rem;
      min-height: 0;
      align-self: stretch;
      padding: 0;
      text-align: right;
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      /* Match wa-textarea value line metrics (gutter used 1.5 while controls use --wa-form-control-value-line-height, e.g. 1.2) */
      line-height: var(--wa-form-control-value-line-height, 1.5);
      color: var(--wa-color-neutral-50, #888);
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none;
      box-sizing: border-box;
    }
    .line-gutter::-webkit-scrollbar {
      display: none;
    }
    .line-gutter-inner {
      box-sizing: border-box;
      line-height: inherit;
      /* Same vertical padding as wa-textarea inner control (see webawesome textarea.styles) */
      padding-block: calc(var(--wa-form-control-padding-block, 0.75em) - ((1lh - 1em) / 2));
      padding-inline: 0;
    }
    .ln {
      padding-right: var(--wa-space-xs, 0.25rem);
      box-sizing: border-box;
      line-height: inherit;
      min-height: 1lh;
    }
    .editor-ta {
      flex: 1 1 auto;
      align-self: stretch;
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 100%;
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      line-height: var(--wa-form-control-value-line-height, 1.5);
    }
    .editor-ta::part(base) {
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      align-items: stretch;
      justify-items: stretch;
    }
    .editor-ta::part(textarea) {
      min-height: 100%;
      height: 100%;
      resize: none;
      line-height: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-texteditor': DocksTextEditor;
  }
}
