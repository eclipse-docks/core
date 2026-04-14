import { fileURLToPath } from 'url';
import path from 'path';
import type { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

type CreateDocksPwaPluginOptions = {
  basePath: string;
  appName: string;
  appDescription: string;
  maximumFileSizeToCacheInBytes: number;
  shortName?: string;
};

const DEFAULT_GLOB_PATTERNS = ['**/*.{js,css,html,ico,png,svg,webp,woff2,woff,ttf,wasm}'];
const DEFAULT_ASSETS = ['favicon.svg', 'logo.svg', 'logo-loading.svg'];
const pwaSwPath = fileURLToPath(new URL('./sw.ts', import.meta.url));
const pwaSwDir = path.dirname(pwaSwPath);
const pwaSwFilename = path.basename(pwaSwPath);

export function createDocksPwaPlugin({
  basePath,
  appName,
  appDescription,
  maximumFileSizeToCacheInBytes,
  shortName = appName,
}: CreateDocksPwaPluginOptions): PluginOption {
  return VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'inline',
    strategies: 'injectManifest',
    srcDir: pwaSwDir,
    filename: pwaSwFilename,
    manifest: {
      name: appName,
      short_name: shortName,
      description: appDescription,
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
    includeAssets: DEFAULT_ASSETS,
    injectManifest: {
      maximumFileSizeToCacheInBytes,
      globPatterns: DEFAULT_GLOB_PATTERNS,
    },
    devOptions: {
      enabled: false,
    },
  });
}
