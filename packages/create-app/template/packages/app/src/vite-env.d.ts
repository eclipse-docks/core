/// <reference types="vite/client" />

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
