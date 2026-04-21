import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { createDocksPwaPlugin } from '@eclipse-docks/extension-pwa/vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';
import { appSplashPlugin } from '../core/src/vite-plugin-app-splash';
import { localAliasesPlugin } from '../core/src/vite-plugin-local-aliases';
import { resolveDepVersionsPlugin } from '../core/src/vite-plugin-resolve-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, '..');
const basePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  root: __dirname,
  base: basePath,
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  plugins: [
    appSplashPlugin(),
    resolveDepVersionsPlugin(),
    localAliasesPlugin({
      packagesRoot: packagesDir,
      useSrcInDev: true,
      alwaysUseSrc: true,
      patterns: [
        { folderPrefix: 'core', packageNamePrefix: '@eclipse-docks/' },
        { folderPrefix: 'extension-' },
      ],
    }),
    mkcert(),
    crossOriginIsolation(),
    createDocksPwaPlugin({
      basePath,
      appName: 'Eclipse Docks',
      shortName: 'Docks',
      appDescription:
        'A modular, extensible web application framework for IDE-like applications.',
      // CereusDB full worker can exceed 139 MiB in prod builds.
      maximumFileSizeToCacheInBytes: 200 * 1024 * 1024,
      serviceWorkerConfig: {
        navigationRoute: {
          // Same-origin VitePress docs (e.g. gh-pages `/docs/`); keep out of SPA navigation fallback.
          denylist: ['^/docs'],
        },
      },
    }),
    {
      name: 'watch-workspace-packages',
      configureServer(server) {
        server.watcher.add(packagesDir);
      },
    },
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
