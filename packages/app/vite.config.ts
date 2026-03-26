import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';
import { localAliasesPlugin } from '../core/src/vite-plugin-local-aliases';
import { resolveDepVersionsPlugin } from '../core/src/vite-plugin-resolve-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  base: process.env.VITE_BASE_PATH || '/',
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
        { folderPrefix: 'core', packageNamePrefix: '@eclipse-lyra/' },
        { folderPrefix: 'extension-' },
      ],
    }),
    mkcert(),
    crossOriginIsolation(),
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
