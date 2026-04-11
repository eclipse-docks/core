import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { DocksElement } from '@eclipse-docks/core';

/**
 * Shows a toolbar icon when a new service worker is waiting (vite-plugin-pwa injectManifest + SKIP_WAITING message).
 * Hidden when there is no update or when service workers are unavailable.
 *
 * Safe when the extension loads late: attaches via `getRegistration()`, reads `registration.waiting`,
 * and subscribes to `updatefound` for subsequent updates.
 */
@customElement('docks-sw-update-indicator')
export class DocksSwUpdateIndicator extends DocksElement {
  @state()
  private updateAvailable = false;

  private pendingReload = false;
  private registration: ServiceWorkerRegistration | null = null;
  private periodicInterval: number | null = null;
  private pollInterval: number | null = null;
  private pollAttempts = 0;
  private attachAbort: AbortController | null = null;

  private readonly onControllerChange = (): void => {
    if (!this.pendingReload) {
      return;
    }
    window.location.reload();
  };

  connectedCallback(): void {
    super.connectedCallback();
    if (!('serviceWorker' in navigator)) {
      return;
    }
    navigator.serviceWorker.addEventListener('controllerchange', this.onControllerChange);
    void this.findOrAttachRegistration();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    navigator.serviceWorker.removeEventListener('controllerchange', this.onControllerChange);
    this.teardownAttachment();
  }

  private async findOrAttachRegistration(): Promise<void> {
    const existing = await navigator.serviceWorker.getRegistration();
    if (existing) {
      this.attach(existing);
      return;
    }

    this.pollInterval = window.setInterval(async () => {
      this.pollAttempts += 1;
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        this.clearPoll();
        this.attach(reg);
        return;
      }
      if (this.pollAttempts >= 30) {
        this.clearPoll();
      }
    }, 1000);
  }

  private clearPoll(): void {
    if (this.pollInterval !== null) {
      window.clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private teardownAttachment(): void {
    this.clearPoll();
    if (this.periodicInterval !== null) {
      window.clearInterval(this.periodicInterval);
      this.periodicInterval = null;
    }
    this.attachAbort?.abort();
    this.attachAbort = null;
    this.registration = null;
    this.updateAvailable = false;
  }

  private syncUpdateState(registration: ServiceWorkerRegistration): void {
    this.updateAvailable = Boolean(registration.waiting);
  }

  private readonly onUpdateFound = (): void => {
    const registration = this.registration;
    if (!registration) {
      return;
    }
    const installing = registration.installing;
    if (!installing) {
      return;
    }
    const signal = this.attachAbort?.signal;
    if (!signal) {
      return;
    }
    installing.addEventListener(
      'statechange',
      () => {
        if (installing.state !== 'installed') {
          return;
        }
        if (!navigator.serviceWorker.controller) {
          return;
        }
        this.syncUpdateState(registration);
      },
      { signal },
    );
  };

  private attach(registration: ServiceWorkerRegistration): void {
    if (this.registration === registration) {
      return;
    }
    this.attachAbort?.abort();
    this.attachAbort = new AbortController();
    const signal = this.attachAbort.signal;

    this.registration = registration;
    this.syncUpdateState(registration);

    registration.addEventListener('updatefound', this.onUpdateFound, { signal });

    void registration.update().catch(() => {});
    this.periodicInterval = window.setInterval(() => {
      void registration.update().catch(() => {});
    }, 60 * 60 * 1000);
  }

  private onActivateClick(): void {
    const w = this.registration?.waiting;
    if (w) {
      this.pendingReload = true;
      w.postMessage({ type: 'SKIP_WAITING' });
      return;
    }
    window.location.reload();
  }

  protected render() {
    if (!this.updateAvailable) {
      return html``;
    }

    return html`
      <wa-button
        appearance="plain"
        title="A new version is available. Click to reload."
        aria-label="A new version is available. Reload to update."
        @click=${this.onActivateClick}
      >
        <wa-icon name="arrows-rotate" label=""></wa-icon>
      </wa-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-sw-update-indicator': DocksSwUpdateIndicator;
  }
}
