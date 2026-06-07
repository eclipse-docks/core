import { css, createRef, customElement, html, property, ref, unsafeCSS, type Ref } from '@eclipse-docks/core/externals/lit';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { DocksPart } from '@eclipse-docks/core';
import { terminalService } from './terminal-service';
import type { TerminalRuntime } from './terminal-api';
import { getTerminalTheme, observeTerminalTheme } from './terminal-theme';
import xtermStyles from '@xterm/xterm/css/xterm.css?raw';

@customElement('docks-terminal-view')
export class DocksTerminalView extends DocksPart {
  protected scrollMode: 'scroller' | 'native' | 'none' = 'none';

  @property({ attribute: false })
  terminal?: TerminalRuntime;

  private xtermRef: Ref<HTMLDivElement> = createRef();
  private xterm: Terminal | null = null;
  private fitAddon: FitAddon | null = null;
  private unsubscribeWrite: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private tabsHost: Element | null = null;
  private tabPanelName: string | null = null;
  private onTabShow: ((event: Event) => void) | null = null;
  private backendOpened = false;
  private unobserveTheme: (() => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    void this.initTerminal();
  }

  disconnectedCallback(): void {
    this.teardownTerminal();
    super.disconnectedCallback();
  }

  close(): void {
    if (this.terminal) {
      terminalService.handleTabClosed(this.terminal.id);
    }
    this.teardownTerminal();
  }

  private findTabContext(): { panelName: string; tabPanel: HTMLElement; tabsHost: Element } | null {
    let panelName: string | null = null;
    let tabPanel: HTMLElement | null = null;
    let tabsHost: Element | null = null;
    let el: Element | null = this;

    while (el) {
      const tag = el.tagName?.toLowerCase();
      if (tag === 'wa-tab-panel' && !tabPanel) {
        tabPanel = el as HTMLElement;
        panelName = el.getAttribute('name');
      }
      if (tag === 'docks-tabs') {
        tabsHost = el;
        break;
      }
      const parent: Element | null = el.parentElement;
      if (parent) {
        el = parent;
      } else {
        const root = el.getRootNode();
        el = root instanceof ShadowRoot ? (root.host as Element) : null;
      }
    }

    if (!tabsHost || !tabPanel || !panelName) return null;
    return { panelName, tabPanel, tabsHost };
  }

  private isTabPanelActive(tabPanel: HTMLElement): boolean {
    return tabPanel.hasAttribute('active');
  }

  private attachTabVisibilityHandling(context: {
    panelName: string;
    tabsHost: Element;
  }): void {
    this.tabsHost = context.tabsHost;
    this.tabPanelName = context.panelName;
    this.onTabShow = (event: Event) => {
      const name = (event as CustomEvent<{ name?: string }>).detail?.name;
      if (name !== context.panelName) return;
      this.onTabShown();
    };
    context.tabsHost.addEventListener('wa-tab-show', this.onTabShow);
  }

  private detachTabVisibilityHandling(): void {
    if (this.tabsHost && this.onTabShow) {
      this.tabsHost.removeEventListener('wa-tab-show', this.onTabShow);
    }
    this.tabsHost = null;
    this.tabPanelName = null;
    this.onTabShow = null;
  }

  private scheduleFit(focus = false): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.applyFit();
        if (focus) this.xterm?.focus();
      });
    });
  }

  private async openBackendIfNeeded(): Promise<void> {
    if (this.backendOpened || !this.terminal?.backend) return;
    this.backendOpened = true;
    await this.terminal.backend.open?.(this.getDimensions());
  }

  private onTabShown(): void {
    this.scheduleFit(true);
    void this.openBackendIfNeeded();
  }

  private async initTerminal(): Promise<void> {
    if (!this.terminal?.backend) return;
    await this.updateComplete;

    const container = this.xtermRef.value;
    if (!container) return;

    this.xterm = new Terminal({
      cursorBlink: true,
      fontFamily: 'var(--wa-font-mono, monospace)',
      fontSize: 13,
      theme: getTerminalTheme(),
    });
    this.fitAddon = new FitAddon();
    this.xterm.loadAddon(this.fitAddon);
    this.xterm.open(container);

    const backend = this.terminal.backend;
    this.unsubscribeWrite = backend.onDidWrite((data) => {
      this.xterm?.write(data);
    });

    this.xterm.onData((data) => {
      backend.handleInput(data);
    });

    this.terminal.clearScreen = () => {
      this.xterm?.clear();
    };

    this.unobserveTheme = observeTerminalTheme(() => {
      if (!this.xterm) return;
      this.xterm.options.theme = getTerminalTheme();
    });

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isVisible()) return;
      this.scheduleFit();
    });
    this.resizeObserver.observe(container);
    this.resizeObserver.observe(this);
    this.observeAncestorResizableGrids(container);

    const tabContext = this.findTabContext();
    if (tabContext) {
      this.attachTabVisibilityHandling(tabContext);
    }

    if (!tabContext || this.isTabPanelActive(tabContext.tabPanel)) {
      this.scheduleFit(true);
      void this.openBackendIfNeeded();
    }
  }

  private observeAncestorResizableGrids(from: Element): void {
    if (!this.resizeObserver) return;
    let el: Element | null = from;
    while (el) {
      if (el.tagName?.toLowerCase() === 'docks-resizable-grid') {
        this.resizeObserver.observe(el);
      }
      const parent: Element | null = el.parentElement;
      if (parent) {
        el = parent;
      } else {
        const root = el.getRootNode();
        el = root instanceof ShadowRoot ? (root.host as Element) : null;
      }
    }
  }

  private isVisible(): boolean {
    if (!this.tabPanelName) return true;
    return this.offsetParent !== null;
  }

  private applyFit(): void {
    if (!this.fitAddon || !this.xterm || !this.isVisible()) return;
    try {
      this.fitAddon.fit();
    } catch {
      return;
    }
    const dims = this.getDimensions();
    this.terminal?.backend?.setDimensions?.(dims);
  }

  private getDimensions(): { cols: number; rows: number } {
    return {
      cols: this.xterm?.cols ?? 80,
      rows: this.xterm?.rows ?? 24,
    };
  }

  private teardownTerminal(): void {
    this.detachTabVisibilityHandling();
    this.unobserveTheme?.();
    this.unobserveTheme = null;
    this.backendOpened = false;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.unsubscribeWrite?.();
    this.unsubscribeWrite = null;
    this.xterm?.dispose();
    this.xterm = null;
    this.fitAddon = null;
  }

  protected renderContent() {
    return html`<div class="terminal-host" ${ref(this.xtermRef)}></div>`;
  }

  static styles = [
    unsafeCSS(xtermStyles),
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        min-height: 0;
      }

      .part-shell {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        height: 100%;
      }

      .part-content {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      .part-content-inner {
        flex: 1;
        min-height: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .terminal-host {
        flex: 1;
        min-height: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: var(--wa-color-surface-lowered);
        padding-left: var(--wa-space-s);
        box-sizing: border-box;
      }

      .terminal-host .xterm {
        height: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-terminal-view': DocksTerminalView;
  }
}
