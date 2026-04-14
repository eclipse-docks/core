import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { DocksElement } from '@eclipse-docks/core';

type SwUpdateProgressMessage = {
  type: 'SW_UPDATE_PROGRESS';
  completed: number;
  total: number;
  done?: boolean;
};

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
  @state()
  private updateProgress = 0;
  @state()
  private updateProgressVisible = false;

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

  private readonly onServiceWorkerMessage = (event: MessageEvent): void => {
    const data = event.data as SwUpdateProgressMessage | undefined;
    if (!data || data.type !== 'SW_UPDATE_PROGRESS') {
      return;
    }
    if (data.total <= 0) {
      return;
    }
    const ratio = Math.max(0, Math.min(1, data.completed / data.total));
    this.updateProgress = ratio;
    this.updateProgressVisible = !this.updateAvailable && !data.done && ratio < 1;
  };

  connectedCallback(): void {
    super.connectedCallback();
    if (!('serviceWorker' in navigator)) {
      return;
    }
    navigator.serviceWorker.addEventListener('controllerchange', this.onControllerChange);
    navigator.serviceWorker.addEventListener('message', this.onServiceWorkerMessage);
    void this.findOrAttachRegistration();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    navigator.serviceWorker.removeEventListener('controllerchange', this.onControllerChange);
    navigator.serviceWorker.removeEventListener('message', this.onServiceWorkerMessage);
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
    this.updateProgress = 0;
    this.updateProgressVisible = false;
  }

  /**
   * Show only when a new worker is waiting and an older version is already controlling
   * the page (real update). Avoid treating the first install as an “update”.
   */
  private syncUpdateState(registration: ServiceWorkerRegistration): void {
    const waiting = Boolean(registration.waiting);
    const hasActiveController = Boolean(navigator.serviceWorker.controller);
    this.updateAvailable = waiting && hasActiveController;
    if (this.updateAvailable) {
      this.updateProgress = 1;
      this.updateProgressVisible = false;
    }
  }

  private readonly onUpdateFound = (): void => {
    const registration = this.registration;
    if (!registration) {
      return;
    }
    // Fast installs (common in standalone PWA): worker may already be `waiting` when
    // this runs, with `installing` already null — still an update if a controller exists.
    this.syncUpdateState(registration);

    const installing = registration.installing;
    if (!installing) {
      return;
    }
    if (navigator.serviceWorker.controller) {
      this.updateProgress = 0;
      this.updateProgressVisible = true;
    }
    const signal = this.attachAbort?.signal;
    if (!signal) {
      return;
    }
    installing.addEventListener(
      'statechange',
      () => {
        if (installing.state === 'redundant') {
          this.updateProgress = 0;
          this.updateProgressVisible = false;
          return;
        }
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

    queueMicrotask(() => {
      if (this.registration !== registration) {
        return;
      }
      this.syncUpdateState(registration);
    });
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
    if (this.updateProgressVisible && !this.updateAvailable) {
      return html`
        <div
          style="display: inline-flex; align-items: center; gap: 0.5rem; min-width: 170px;"
          title="Downloading the latest update..."
          aria-label="Downloading the latest update"
        >
          <wa-progress-bar value=${Math.round(this.updateProgress * 100)}></wa-progress-bar>
          <span style="font-size: 0.8rem; opacity: 0.8;">${Math.round(this.updateProgress * 100)}%</span>
        </div>
      `;
    }

    if (!this.updateAvailable) {
      return html``;
    }

    return html`
      <wa-animation
        style="display: inline-flex; align-items: center;"
        name="zoomIn"
        duration="1400"
        easing="ease-out"
        iterations="Infinity"
        ?play=${true}
      >
        <wa-button
          appearance="plain"
          title="A new version is available. Click to reload."
          aria-label="A new version is available. Reload to update."
          @click=${this.onActivateClick}
        >
          <wa-icon
            name="arrows-rotate"
            label=""
            style="color: var(--wa-color-success-fill-loud)"
          ></wa-icon>
        </wa-button>
      </wa-animation>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-sw-update-indicator': DocksSwUpdateIndicator;
  }
}
