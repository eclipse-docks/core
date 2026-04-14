import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { createDocksPwaPlugin } from '@eclipse-docks/extension-pwa/vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';
import { appSplashPlugin } from '@eclipse-docks/core/vite-plugin-app-splash';
import { resolveDepVersionsPlugin } from '@eclipse-docks/core/vite-plugin-resolve-deps';
import { localAliasesPlugin } from '@eclipse-docks/core/vite-plugin-local-aliases';

const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  root: __dirname,
  base: basePath,
  resolve: {},
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  plugins: [
    appSplashPlugin(),
    /** Side-effect-imports every `extension-*` / `@scope/extension-*` direct dependency from package.json (virtual module before main). */
    resolveDepVersionsPlugin(),
    localAliasesPlugin({
      useSrcInDev: true,
      patterns: [{ folderPrefix: 'extension-' }],
    }),
    mkcert(),
    crossOriginIsolation(),
    createDocksPwaPlugin({
      basePath,
      appName: '{{APP_NAME}}',
      appDescription: '{{APP_DESCRIPTION}}',
      maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
    }),
  ],
  worker: {
    format: 'es',
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
