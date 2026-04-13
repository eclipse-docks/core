/**
 * In-repo AI extension registration (after package entry from resolveDepVersionsPlugin’s default extension side-effects).
 * Keeps auxiliary tab order before E2E contributions (see README).
 */
import '../../extension-ai-system/src/ai-system-extension';

import {
    TOOLBAR_MAIN,
    SIDEBAR_AUXILIARY,
    appLoaderService,
    contributionRegistry,
    type HTMLContribution,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';

import './e2e-coupled-panel';

contributionRegistry.registerContribution(SIDEBAR_AUXILIARY, {
    name: 'e2e-coupled-ai-config',
    label: 'E2E Coupled',
    icon: 'link',
    closable: false,
    coupledEditors: ['system.ai-config-editor'],
    component: (id: string) => html`<e2e-coupled-panel id="${id}"></e2e-coupled-panel>`,
});

contributionRegistry.registerContribution(SIDEBAR_AUXILIARY, {
    name: 'e2e-decoy-coupled-ai-config',
    label: 'E2E Decoy',
    icon: 'link',
    closable: false,
    coupledEditors: ['system.ai-config-editor-FAKE'],
    component: (id: string) => html`<e2e-coupled-panel id="${id}"></e2e-coupled-panel>`,
});

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
    label: 'Docks E2E',
    slot: 'start',
    component: () => html`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-s);
        padding: 0 var(--wa-space-s);
      "
    >
      <img
        src="/logo.svg"
        alt="Docks E2E"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `,
} as HTMLContribution);

const appRoot = document.getElementById('app-root') ?? document.body;
appLoaderService.registerApp(
    {
        name: 'Docks E2E',
        description: 'Playwright harness — not the product demo.',
        layoutId: 'standard-full',
        extensions: [
            '@eclipse-docks/extension-ai-system',
            '@eclipse-docks/extension-plain-editor',
            '@eclipse-docks/extension-python-runtime',
        ],
    },
    { autoStart: true, hostConfig: true, container: appRoot },
);
