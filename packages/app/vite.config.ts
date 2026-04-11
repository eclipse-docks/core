import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
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
    resolveDepVersionsPlugin(),
    localAliasesPlugin({
      packagesRoot: packagesDir,
      useSrcInDev: true,
      patterns: [
        { folderPrefix: 'core', packageNamePrefix: '@eclipse-docks/' },
        { folderPrefix: 'extension-' },
      ],
    }),
    mkcert(),
    crossOriginIsolation(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: 'Eclipse Docks',
        short_name: 'Docks',
        description:
          'A modular, extensible web application framework for IDE-like applications built on Eclipse Docks.',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        start_url: basePath,
        scope: basePath,
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'monochrome',
          },
        ],
      },
      includeAssets: ['favicon.svg', 'logo.svg', 'logo-loading.svg'],
      injectManifest: {
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2,woff,ttf,wasm}'],
      },
      devOptions: {
        enabled: false,
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
