import { TOOLBAR_MAIN, appLoaderService, contributionRegistry, type HTMLContribution } from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';
import { fetchReleases } from "@eclipse-docks/extension-github-service";

import './extensions';
import './dashboard-layout';

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  label: "Eclipse Docks",
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
        alt="Eclipse Docks"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `,
} as HTMLContribution);

const appRoot = document.getElementById('app-root') ?? document.body;
appLoaderService.registerApp(
  {
    name: 'Eclipse Docks',
    description: 'Eclipse Docks demo app with default extensions.',
    layoutId: 'standard-full',
    metadata: {
      github: {
        owner: 'eclipse-docks',
        repo: 'core',
      },
    },
    releaseHistory: fetchReleases,
    extensions: [
      '@eclipse-docks/extension-command-palette',
      '@eclipse-docks/extension-command-shell',
      '@eclipse-docks/extension-catalog',
      '@eclipse-docks/extension-md-editor',
      '@eclipse-docks/extension-monaco-editor',
      '@eclipse-docks/extension-media-viewer',
      '@eclipse-docks/extension-settings-tree',
      '@eclipse-docks/extension-memory-usage',
      '@eclipse-docks/extension-pwa',
      '@eclipse-docks/extension-ai-system',
      '@eclipse-docks/extension-dataviewer',
    ],
  },
  { autoStart: true, hostConfig: true, container: appRoot },
);
