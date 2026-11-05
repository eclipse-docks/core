// 0. Context seed (lit, constants, toast) – di only provides empty contexts
import { rootContext, uiContext } from './di';
import { html, render } from 'lit';
import * as constants from './constants';
import { toastInfo, toastError, toastWarning } from './toast';
import { publish, subscribe } from './events';

rootContext.put('constants', constants);
uiContext.put('html', html);
uiContext.put('render', render);
uiContext.put('toastInfo', toastInfo);
uiContext.put('toastError', toastError);
uiContext.put('toastWarning', toastWarning);
uiContext.put('publish', publish);
uiContext.put('subscribe', subscribe);

// 1. Foundation: logging, persistence, settings
import './logger';
import './persistenceservice';
import './settingsservice';

// 2. Registries and task service (contribution first – others depend on it)
import './contributionregistry';
import './taskservice';

// 3. i18n and ESM
import './i18n';
import './esmsh-service';

// 4. Command and extension registries
import './commandregistry';
import './extensionregistry';

// 5. UI and workspace services
import './keybindings';
import './dialogservice';
import './floatingpanelservice';
import './editorregistry';
import './filesys';

// 6. App loader and marketplace
import './apploader';
import './marketplaceregistry';

// 7. Language bundles and dialogs (use contributionRegistry / dialogService)
import '../i18n';
import '../dialogs';

// 8. Parts, components, widgets, contributions, commands (extensions registered by app host)
import '../parts';
import '../components';
import '../widgets';
import '../contributions';
import '../commands';
