/**
 * Explicit imports of workspace extensions so they are included in the bundle.
 * Replaces import.meta.glob('../../extension-*/src/index.ts') to avoid .ts paths
 * in module URLs (servers often map .ts to video/mp2t MIME type).
 * Add or remove imports when you add or remove extensions from the app config.
 */
import '@eclipse-lyra/extension-ai-system';
import '@eclipse-lyra/extension-command-palette';
import '@eclipse-lyra/extension-md-editor';
import '@eclipse-lyra/extension-media-viewer';
import '@eclipse-lyra/extension-memory-usage';
import '@eclipse-lyra/extension-monaco-editor';
import '@eclipse-lyra/extension-settings-tree';
import '@eclipse-lyra/extension-utils';
import 'example-extension';
