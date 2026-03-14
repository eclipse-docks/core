import { appLoaderService, contributionRegistry, type HTMLContribution, TOOLBAR_MAIN } from '@eclipse-lyra/core';

import './extensions';

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  label: 'Brand',
  slot: 'start',
  component: '<span style="margin-right: 1rem;">{{APP_NAME}}</span>',
} as HTMLContribution);

const appRoot = document.getElementById('app-root') ?? document.body;
appLoaderService.registerApp(
  {
    extensions: [
      '@eclipse-lyra/extension-utils',
      '@eclipse-lyra/extension-command-palette',
      '@eclipse-lyra/extension-md-editor',
      '@eclipse-lyra/extension-monaco-editor',
      '@eclipse-lyra/extension-media-viewer',
      '@eclipse-lyra/extension-settings-tree',
      '@eclipse-lyra/extension-memory-usage',
      '@eclipse-lyra/extension-ai-system',
      'example-extension',
    ],
  },
  { autoStart: true, hostConfig: true, container: appRoot },
);
