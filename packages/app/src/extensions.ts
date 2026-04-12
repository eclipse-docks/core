/**
 * Explicit imports of workspace extensions so they are included in the bundle.
 * Replaces import.meta.glob('../../extension-XXX/src/index.ts') to avoid .ts paths
 * in module URLs (servers often map .ts to video/mp2t MIME type).
 *
 * PWA is imported first: its entry registers a `beforeinstallprompt` listener as early
 * as possible. Extension registry order does not matter for that—only module load order.
 */
import '@eclipse-docks/extension-pwa';
import '@eclipse-docks/extension-ai-system';
import '@eclipse-docks/extension-command-palette';
import '@eclipse-docks/extension-command-shell';
import '@eclipse-docks/extension-catalog';
import '@eclipse-docks/extension-dataviewer';
import '@eclipse-docks/extension-duckdb';
import '@eclipse-docks/extension-github-service';
import '@eclipse-docks/extension-howto-system';
import '@eclipse-docks/extension-in-browser-ml';
import '@eclipse-docks/extension-linuxterminal';
import '@eclipse-docks/extension-md-editor';
import '@eclipse-docks/extension-media-viewer';
import '@eclipse-docks/extension-memory-usage';
import '@eclipse-docks/extension-monaco-editor';
import '@eclipse-docks/extension-notebook';
import '@eclipse-docks/extension-pglite';
import '@eclipse-docks/extension-plain-editor';
import '@eclipse-docks/extension-python-runtime';
import '@eclipse-docks/extension-rag-system';
import '@eclipse-docks/extension-settings-tree';
import '@eclipse-docks/extension-sqleditor';
import '@eclipse-docks/extension-utils';
import '@eclipse-docks/extension-webdav';
import '@eclipse-docks/extension-webllm';
import '@eclipse-docks/extension-webmcp';
