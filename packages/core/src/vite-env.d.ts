/// <reference types="vite/client" />

declare module '*?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module '*?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}

/** Injected by resolveDepVersionsPlugin when hostConfig is true. */
declare const __RESOLVED_PACKAGE_INFO__: {
  name: string;
  version: string;
  description?: string;
  dependencies: Record<string, string>;
  marketplaceCatalogUrls?: string[];
} | undefined;

declare module 'toastify-js' {
  interface ToastifyOptions {
    text?: string;
    duration?: number;
    gravity?: 'top' | 'bottom';
    position?: 'left' | 'center' | 'right';
    close?: boolean;
    style?: { background?: string };
    className?: string;
  }
  function Toastify(options: ToastifyOptions): { showToast(): void };
  export default Toastify;
}

