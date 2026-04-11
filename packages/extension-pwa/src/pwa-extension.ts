import { contributionRegistry, type HTMLContribution } from '@eclipse-docks/core';
import { TOOLBAR_BOTTOM } from '@eclipse-docks/core';
import './sw-update-indicator';
import './pwa-install-button';

const TOOLBAR_SW_UPDATE = 'toolbar.swUpdate';
const TOOLBAR_PWA_INSTALL = 'toolbar.pwaInstall';

contributionRegistry.registerContribution(TOOLBAR_BOTTOM, {
  name: TOOLBAR_SW_UPDATE,
  label: 'App update',
  component: `<docks-sw-update-indicator></docks-sw-update-indicator>`,
} as HTMLContribution);

contributionRegistry.registerContribution(TOOLBAR_BOTTOM, {
  name: TOOLBAR_PWA_INSTALL,
  label: 'Install app',
  component: `<docks-pwa-install></docks-pwa-install>`,
} as HTMLContribution);
