/// <reference types="vite-plugin-pwa/client" />

declare module 'vite-plugin-mkcert' {
  import type { Plugin } from 'vite';
  const plugin: () => Plugin;
  export default plugin;
}

declare module 'vite-plugin-cross-origin-isolation' {
  import type { Plugin } from 'vite';
  const plugin: () => Plugin;
  export default plugin;
}

declare module '@eclipse-docks/core/vite-plugin-resolve-deps' {
  import type { Plugin } from 'vite';
  export function resolveDepVersionsPlugin(options?: { includeDevDependencies?: boolean }): Plugin;
}
