import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { DocksElement } from '@eclipse-docks/core';

import {
  clearInstallPromptCapture,
  peekInstallPrompt,
  PWA_INSTALL_PROMPT_AVAILABLE,
  type PwaInstallPromptEvent,
} from './install-prompt-capture';

function isRunningAsInstalledPwa(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

@customElement('docks-pwa-install')
export class DocksPwaInstall extends DocksElement {
  @state()
  private showInstall = false;

  private deferredPrompt: PwaInstallPromptEvent | null = null;

  private readonly onPromptAvailable = (): void => {
    this.applyCapturedPrompt();
  };

  private readonly onAppInstalled = (): void => {
    clearInstallPromptCapture();
    this.deferredPrompt = null;
    this.showInstall = false;
  };

  private applyCapturedPrompt(): void {
    const p = peekInstallPrompt();
    if (!p) {
      return;
    }
    this.deferredPrompt = p;
    this.showInstall = true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (isRunningAsInstalledPwa()) {
      return;
    }
    this.applyCapturedPrompt();
    window.addEventListener(PWA_INSTALL_PROMPT_AVAILABLE, this.onPromptAvailable);
    window.addEventListener('appinstalled', this.onAppInstalled);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(PWA_INSTALL_PROMPT_AVAILABLE, this.onPromptAvailable);
    window.removeEventListener('appinstalled', this.onAppInstalled);
  }

  private async onInstallClick(): Promise<void> {
    const promptEvent = this.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    await promptEvent.prompt();
    await promptEvent.userChoice.catch(() => {});
    clearInstallPromptCapture();
    this.deferredPrompt = null;
    this.showInstall = false;
  }

  protected render() {
    if (!this.showInstall) {
      return html``;
    }

    return html`
      <wa-button
        appearance="plain"
        title="Install this app on your device"
        aria-label="Install app"
        @click=${() => void this.onInstallClick()}
      >
        <wa-icon name="download" label=""></wa-icon>
      </wa-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-pwa-install': DocksPwaInstall;
  }
}
