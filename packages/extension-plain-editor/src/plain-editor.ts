import { customElement, property, state } from 'lit/decorators.js';
import {
  DocksPart,
  EditorContentProvider,
  EditorInput,
  File,
  i18n,
} from '@eclipse-docks/core';
import { css, html, nothing, type TemplateResult } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { BINARY_HEX_VIEW_MAX_BYTES, detectBinaryBlob } from './utils.js';
import './hexeditor.js';
import './texteditor.js';
import type { DocksHexEditor } from './hexeditor.js';
import type { DocksTextEditor } from './texteditor.js';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

@customElement('docks-plain-editor')
export class DocksPlainEditor extends DocksPart implements EditorContentProvider {
  protected scrollMode: 'scroller' | 'native' = 'native';

  @property({ attribute: false })
  input?: EditorInput;

  @property({ type: Boolean })
  readOnly = false;

  @state()
  private ready = false;

  @state()
  private hexMode = false;

  @state()
  private textValue = '';

  private bytes: Uint8Array = new Uint8Array(0);

  @state()
  private hexSeed = 0;

  @state()
  private hexInitialBytes: Uint8Array = new Uint8Array(0);

  /** True when binary mode loaded only a prefix of a larger file (editing disabled). */
  @state()
  private binaryViewTruncated = false;

  private binarySourceByteLength = 0;

  private textRef = createRef<DocksTextEditor>();
  private hexRef = createRef<DocksHexEditor>();

  protected async doInitUI(): Promise<void> {
    const file = this.input!.data as File;
    const blob = await file.getContents({ blob: true });
    this.hexMode = await detectBinaryBlob(blob);

    if (this.hexMode) {
      if (blob.size > BINARY_HEX_VIEW_MAX_BYTES) {
        this.bytes = new Uint8Array(
          await blob.slice(0, BINARY_HEX_VIEW_MAX_BYTES).arrayBuffer(),
        );
        this.binaryViewTruncated = true;
        this.binarySourceByteLength = blob.size;
      } else {
        this.bytes = new Uint8Array(await blob.arrayBuffer());
        this.binaryViewTruncated = false;
        this.binarySourceByteLength = 0;
      }
      this.textValue = new TextDecoder('utf-8', { fatal: false }).decode(this.bytes);
      this.hexInitialBytes = new Uint8Array(this.bytes);
      this.hexSeed = 1;
    } else {
      this.bytes = new Uint8Array(await blob.arrayBuffer());
      this.binaryViewTruncated = false;
      this.binarySourceByteLength = 0;
      this.textValue = new TextDecoder('utf-8', { fatal: false }).decode(this.bytes);
    }
    this.ready = true;
  }

  private onTextChange = (e: CustomEvent<{ value: string }>) => {
    this.textValue = e.detail.value;
    this.bytes = new TextEncoder().encode(this.textValue);
    this.markDirty(true);
  };

  private onHexChange = (e: CustomEvent<{ bytes: Uint8Array }>) => {
    this.bytes = e.detail.bytes;
    this.textValue = new TextDecoder('utf-8', { fatal: false }).decode(this.bytes);
    this.markDirty(true);
  };

  private onHexViewToggle = (e: Event) => {
    const on = (e.target as HTMLInputElement).checked;
    if (on === this.hexMode) return;
    if (on) {
      this.bytes = new TextEncoder().encode(this.textValue);
      this.hexInitialBytes = new Uint8Array(this.bytes);
      this.hexSeed += 1;
      this.hexMode = true;
    } else {
      this.textValue = new TextDecoder('utf-8', { fatal: false }).decode(this.bytes);
      this.hexMode = false;
    }
    this.requestUpdate();
  };

  save(): void {
    if (this.binaryViewTruncated) {
      return;
    }
    const blob = new Blob([new Uint8Array(this.bytes)]);
    this.input?.data.saveContents(blob);
    this.markDirty(false);
  }

  protected doClose(): void {
    this.ready = false;
    this.binaryViewTruncated = false;
    this.binarySourceByteLength = 0;
  }

  getContent(): string | null {
    if (this.hexMode) {
      const hex = this.hexRef.value?.getBytesSnapshot();
      if (hex) {
        return [...hex].map((b) => b.toString(16).padStart(2, '0')).join(' ');
      }
      return null;
    }
    return this.textRef.value?.getValue() ?? this.textValue;
  }

  getSelection(): string | null {
    if (this.hexMode) return null;
    return this.textRef.value?.getSelection() ?? null;
  }

  getSnippet(lines = 5): { snippet: string; cursorLine: number } | null {
    if (this.hexMode) return null;
    return this.textRef.value?.getSnippet(lines) ?? null;
  }

  getLanguage(): string | null {
    return null;
  }

  getFilePath(): string | null {
    return this.input?.data?.getWorkspacePath() ?? null;
  }

  protected renderToolbar(): TemplateResult | typeof nothing {
    if (!this.ready) return nothing;
    const fmt = (n: number) => n.toLocaleString();
    const truncMsg =
      this.binaryViewTruncated && this.binarySourceByteLength > 0
        ? t.BINARY_VIEW_TRUNCATED({
            shown: fmt(BINARY_HEX_VIEW_MAX_BYTES),
            total: fmt(this.binarySourceByteLength),
          })
        : null;
    return html`
      ${truncMsg
        ? html`<span class="binary-trunc-msg" title=${truncMsg}>${truncMsg}</span>`
        : nothing}
      <label class="hex-toggle">
        <span class="hex-label">${t.HEX_VIEW_LABEL}</span>
        <wa-switch ?checked=${this.hexMode} @change=${this.onHexViewToggle}></wa-switch>
      </label>
    `;
  }

  protected renderContent(): TemplateResult | typeof nothing {
    if (!this.ready) {
      return html`<div class="placeholder"></div>`;
    }
    if (this.hexMode) {
      return html`
        <docks-hexeditor
          ${ref(this.hexRef)}
          .initialBytes=${this.hexInitialBytes}
          .seed=${this.hexSeed}
          .readOnly=${this.readOnly || this.binaryViewTruncated}
          @content-change=${this.onHexChange}
        ></docks-hexeditor>
      `;
    }
    return html`
      <docks-texteditor
        ${ref(this.textRef)}
        .value=${this.textValue}
        .readOnly=${this.readOnly || this.binaryViewTruncated}
        @content-change=${this.onTextChange}
      ></docks-texteditor>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      height: 100%;
    }
    /* Fill tab panel: let the editor surface stretch with the layout grid */
    .part-content-inner {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .part-content-inner > docks-texteditor,
    .part-content-inner > docks-hexeditor {
      flex: 1 1 auto;
      min-height: 0;
    }
    .placeholder {
      flex: 1;
      min-height: 2rem;
    }
    .binary-trunc-msg {
      flex: 1 1 auto;
      min-width: 0;
      margin-right: var(--wa-space-m, 0.75rem);
      font-size: var(--wa-font-size-xs, 0.75rem);
      color: var(--wa-color-neutral-50, #888);
      line-height: 1.3;
    }
    .hex-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--wa-space-s, 0.5rem);
      margin: 0;
      font-size: var(--wa-font-size-s, 0.875rem);
      flex-shrink: 0;
    }
    .hex-label {
      user-select: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-plain-editor': DocksPlainEditor;
  }
}
