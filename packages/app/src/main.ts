import { TOOLBAR_MAIN, appLoaderService, contributionRegistry, type HTMLContribution } from '@eclipse-lyra/core';
import { html } from '@eclipse-lyra/core/externals/lit';
import { fetchReleases } from "@eclipse-lyra/extension-github-service";
void import.meta.glob('../../extension-*/src/index.ts', { eager: true });

import './dashboard-layout';

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  label: "Eclipse Lyra",
  slot: "start",
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
        alt="Eclipse Lyra"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `,
} as HTMLContribution);

const appRoot = document.getElementById('app-root') ?? document.body;
appLoaderService.registerApp(
  {
    name: 'Eclipse Lyra',
    description: 'Eclipse Lyra demo app with default extensions.',
    layoutId: 'standard-full',
    metadata: {
      github: {
        owner: 'eclipse-lyra',
        repo: 'core',
      },
    },
    releaseHistory: fetchReleases,
    extensions: [
      '@eclipse-lyra/extension-utils',
      '@eclipse-lyra/extension-command-palette',
      '@eclipse-lyra/extension-command-shell',
      '@eclipse-lyra/extension-md-editor',
      '@eclipse-lyra/extension-monaco-editor',
      '@eclipse-lyra/extension-media-viewer',
      '@eclipse-lyra/extension-settings-tree',
      '@eclipse-lyra/extension-memory-usage',
      '@eclipse-lyra/extension-ai-system',
      '@eclipse-lyra/extension-dataviewer',
    ],
  },
  { autoStart: true, hostConfig: true, container: appRoot },
);
