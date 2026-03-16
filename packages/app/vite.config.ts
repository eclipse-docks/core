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
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
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
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
  worker: {
    format: 'es',
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('monaco-editor')) return 'monaco';
          if (id.includes('@electric-sql/pglite') || id.includes('pglite')) return 'pglite';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
