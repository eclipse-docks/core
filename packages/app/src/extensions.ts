/**
 * Explicit imports of workspace extensions so they are included in the bundle.
 * Replaces import.meta.glob('../../extension-XXX/src/index.ts') to avoid .ts paths
 * in module URLs (servers often map .ts to video/mp2t MIME type).
 */
import '@eclipse-lyra/extension-ai-system';
import '@eclipse-lyra/extension-command-palette';
import '@eclipse-lyra/extension-command-shell';
import '@eclipse-lyra/extension-dataviewer';
import '@eclipse-lyra/extension-duckdb';
import '@eclipse-lyra/extension-github-service';
import '@eclipse-lyra/extension-howto-system';
import '@eclipse-lyra/extension-in-browser-ml';
import '@eclipse-lyra/extension-linuxterminal';
import '@eclipse-lyra/extension-md-editor';
import '@eclipse-lyra/extension-media-viewer';
import '@eclipse-lyra/extension-memory-usage';
import '@eclipse-lyra/extension-monaco-editor';
import '@eclipse-lyra/extension-notebook';
import '@eclipse-lyra/extension-pglite';
import '@eclipse-lyra/extension-python-runtime';
import '@eclipse-lyra/extension-rag-system';
import '@eclipse-lyra/extension-settings-tree';
import '@eclipse-lyra/extension-sqleditor';
import '@eclipse-lyra/extension-utils';
import '@eclipse-lyra/extension-webdav';
import '@eclipse-lyra/extension-webllm';
import '@eclipse-lyra/extension-webmcp';
