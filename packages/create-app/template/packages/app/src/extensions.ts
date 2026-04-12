/**
 * Explicit imports of workspace extensions so they are included in the bundle.
 * Replaces import.meta.glob('../../extension-xxx/src/index.ts') to avoid .ts paths
 * in module URLs (servers often map .ts to video/mp2t MIME type).
 * Add or remove imports when you add or remove extensions from the app config.
 *
 * PWA is imported first so `beforeinstallprompt` can be captured early (see extension-pwa).
 */
import '@eclipse-docks/extension-pwa';
import '@eclipse-docks/extension-ai-system';
import '@eclipse-docks/extension-command-palette';
import '@eclipse-docks/extension-catalog';
import '@eclipse-docks/extension-md-editor';
import '@eclipse-docks/extension-media-viewer';
import '@eclipse-docks/extension-memory-usage';
import '@eclipse-docks/extension-monaco-editor';
import '@eclipse-docks/extension-plain-editor';
import '@eclipse-docks/extension-settings-tree';
import '@eclipse-docks/extension-utils';
import 'example-extension';
