import { contributionRegistry, type HTMLContribution, TOOLBAR_MAIN, TOOLBAR_MAIN_CENTER } from '@eclipse-docks/core';
import './sw-update-indicator';
import './pwa-install-button';

const TOOLBAR_SW_UPDATE = 'toolbar.swUpdate';
const TOOLBAR_PWA_INSTALL = 'toolbar.pwaInstall';

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  name: TOOLBAR_SW_UPDATE,
  label: 'App update',
  slot: 'end',
  component: `<docks-sw-update-indicator></docks-sw-update-indicator>`,
} as HTMLContribution);

contributionRegistry.registerContribution(TOOLBAR_MAIN_CENTER, {
  name: TOOLBAR_PWA_INSTALL,
  label: 'Install app',
  component: `<docks-pwa-install></docks-pwa-install>`,
} as HTMLContribution);
