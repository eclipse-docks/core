import { appLoaderService, contributionRegistry, type HTMLContribution, TOOLBAR_MAIN } from '@eclipse-docks/core';

/** Which extensions the shell offers; keep in sync with `extension-*` / `@scope/extension-*` entries in package.json (auto side-effect-imported via resolveDepVersionsPlugin). */
contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  label: 'Brand',
  slot: 'start',
  component: '<span style="margin-right: 1rem;">{{APP_NAME}}</span>',
} as HTMLContribution);

const appRoot = document.getElementById('app-root') ?? document.body;
appLoaderService.registerApp(
  {
    extensions: [
      '@eclipse-docks/extension-utils',
      '@eclipse-docks/extension-pwa',
      '@eclipse-docks/extension-command-palette',
      '@eclipse-docks/extension-catalog',
      '@eclipse-docks/extension-md-editor',
      '@eclipse-docks/extension-plain-editor',
      '@eclipse-docks/extension-media-viewer',
      '@eclipse-docks/extension-settings-tree',
      '@eclipse-docks/extension-memory-usage',
      '@eclipse-docks/extension-ai-system',
      'extension-example',
    ],
  },
  { autoStart: true, hostConfig: true, container: appRoot },
);
