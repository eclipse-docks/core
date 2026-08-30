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
  dependencies: Record<
    string,
    {
      license?: string;
      homepage?: string;
      repository?: string;
      description?: string;
    }
  >;
  directDependencies: string[];
  nestedDependencies: Record<string, string[]>;
  marketplaceCatalogUrls?: string[];
} | undefined;
