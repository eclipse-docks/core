import { readFileSync, existsSync } from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

export interface ResolvedPackageInfo {
  name: string;
  version: string;
  description?: string;
  dependencies: Record<string, string>;
  marketplaceCatalogUrls?: string[];
}

interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

function findPackageVersion(appRoot: string, depName: string): string | null {
  const segments = depName.startsWith('@')
    ? depName.split('/')
    : [depName];
  const relativePath = path.join('node_modules', ...segments, 'package.json');
  let dir = path.resolve(appRoot);
  const root = path.parse(dir).root;

  while (true) {
    const pkgPath = path.join(dir, relativePath);
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageJson;
        if (typeof pkg.version === 'string') return pkg.version;
      } catch {
        // ignore parse errors
      }
      return null;
    }
    if (dir === root) break;
    dir = path.dirname(dir);
  }
  return null;
}

function resolveDepVersionsFromPkg(
  appRoot: string,
  pkg: PackageJson,
  options?: { includeDevDependencies?: boolean }
): Record<string, string> {
  const deps = { ...pkg.dependencies };
  if (options?.includeDevDependencies && pkg.devDependencies) {
    Object.assign(deps, pkg.devDependencies);
  }
  const result: Record<string, string> = {};
  for (const [name, specifier] of Object.entries(deps)) {
    const version = findPackageVersion(appRoot, name);
    result[name] = version ?? specifier;
  }
  return result;
}

export function resolvePackageInfo(
  appRoot: string,
  options?: { includeDevDependencies?: boolean }
): ResolvedPackageInfo | null {
  const pkgPath = path.join(appRoot, 'package.json');
  if (!existsSync(pkgPath)) return null;

  let pkg: PackageJson;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageJson;
  } catch {
    return null;
  }

  const name = typeof pkg.name === 'string' ? pkg.name : '';
  const version = typeof pkg.version === 'string' ? pkg.version : '0.0.0';
  const description = typeof pkg.description === 'string' ? pkg.description : undefined;
  const dependencies = resolveDepVersionsFromPkg(appRoot, pkg, options);
  const marketplaceCatalogUrls = (pkg as { marketplace?: { catalogUrls?: string[] } }).marketplace?.catalogUrls;

  return { name, version, description, dependencies, marketplaceCatalogUrls };
}

export function resolveDepVersions(
  appRoot: string,
  options?: { includeDevDependencies?: boolean }
): Record<string, string> {
  const info = resolvePackageInfo(appRoot, options);
  return info?.dependencies ?? {};
}

const RESOLVED_PACKAGE_INFO_KEY = '__RESOLVED_PACKAGE_INFO__';

/** Virtual module id; injected into `index.html` before `main.ts` when extension side-effects are enabled. */
export const VIRTUAL_EXTENSION_IMPORTS = 'virtual:eclipse-docks-extension-imports';

const RESOLVED_VIRTUAL_EXTENSION_IMPORTS = `\0${VIRTUAL_EXTENSION_IMPORTS}`;

const DEFAULT_EXTENSION_PATTERN = /^@eclipse-docks\/extension-/;

const DEFAULT_PRIORITY_FIRST = ['@eclipse-docks/extension-pwa'];

/** Matches Vite’s default app entry in index.html. */
const MAIN_TS_SCRIPT_RE =
  /<script\b[^>]*\btype\s*=\s*["']module["'][^>]*\bsrc\s*=\s*["'][^"']*\/src\/main\.ts["'][^>]*>\s*<\/script>/i;

export interface ExtensionSideEffectsOptions {
  /**
   * When false, disables automatic extension side-effect imports. Omitted or true keeps them on.
   */
  enabled?: boolean;
  /** Dependency names to skip (even if they match `packageNamePattern`). */
  exclude?: string[];
  /**
   * Packages to load first, in order (only those present in dependencies are imported).
   * Default includes PWA so `beforeinstallprompt` can register early.
   */
  priorityFirst?: string[];
  /**
   * Which direct `dependencies` keys qualify as Eclipse Docks extensions.
   * @default /^@eclipse-docks\/extension-/
   */
  packageNamePattern?: RegExp;
}

export type ResolveDepVersionsPluginOptions = {
  includeDevDependencies?: boolean;
  /**
   * By default, registers a virtual module that side-effect-imports every matching direct
   * `dependencies` entry (see `ExtensionSideEffectsOptions`), and injects
   * `import 'virtual:eclipse-docks-extension-imports'` into `index.html` **before** `/src/main.ts`.
   * Pass `false` or `{ enabled: false }` to disable.
   */
  extensionSideEffects?: boolean | ExtensionSideEffectsOptions;
};

/** Normalized match options for {@link listExtensionSideEffectPackages}. */
export type ExtensionSideEffectsListOptions = {
  exclude: Set<string>;
  priorityFirst: string[];
  pattern: RegExp;
};

function normalizeExtensionSideEffects(
  opt: boolean | ExtensionSideEffectsOptions | undefined,
): ExtensionSideEffectsListOptions | null {
  if (opt === false) return null;
  if (opt === undefined || opt === true) {
    return {
      exclude: new Set(),
      priorityFirst: [...DEFAULT_PRIORITY_FIRST],
      pattern: DEFAULT_EXTENSION_PATTERN,
    };
  }
  if (opt.enabled === false) return null;
  return {
    exclude: new Set(opt.exclude ?? []),
    priorityFirst: opt.priorityFirst ?? [...DEFAULT_PRIORITY_FIRST],
    pattern: opt.packageNamePattern ?? DEFAULT_EXTENSION_PATTERN,
  };
}

export function listExtensionSideEffectPackages(
  dependencies: Record<string, string>,
  sideEffects: ExtensionSideEffectsListOptions,
): string[] {
  const names = Object.keys(dependencies).filter(
    (name) => sideEffects.pattern.test(name) && !sideEffects.exclude.has(name),
  );
  const prioritySet = new Set(sideEffects.priorityFirst);
  const first = sideEffects.priorityFirst.filter((p) => names.includes(p));
  const rest = names.filter((n) => !prioritySet.has(n)).sort((a, b) => a.localeCompare(b));
  return [...first, ...rest];
}

export function resolveDepVersionsPlugin(
  options?: ResolveDepVersionsPluginOptions,
): Plugin {
  let appRoot = process.cwd();
  let extensionSideEffectsActive = false;
  let extensionImportPackages: string[] = [];

  return {
    name: 'resolve-dep-versions',
    config(config) {
      const root = config.root ? path.resolve(config.root) : process.cwd();
      const info = resolvePackageInfo(root, options);
      const value =
        info ?? {
          name: '',
          version: '0.0.0',
          description: undefined,
          dependencies: {},
          marketplaceCatalogUrls: undefined,
        };
      return {
        define: {
          [RESOLVED_PACKAGE_INFO_KEY]: JSON.stringify(value),
        },
      };
    },
    configResolved(config) {
      appRoot = path.resolve(config.root ?? process.cwd());
      const normalized = normalizeExtensionSideEffects(options?.extensionSideEffects);
      extensionSideEffectsActive = normalized !== null;
      if (!normalized) {
        extensionImportPackages = [];
        return;
      }
      const info = resolvePackageInfo(appRoot, options);
      extensionImportPackages = listExtensionSideEffectPackages(
        info?.dependencies ?? {},
        normalized,
      );
    },
    resolveId(id) {
      if (id === VIRTUAL_EXTENSION_IMPORTS) {
        return RESOLVED_VIRTUAL_EXTENSION_IMPORTS;
      }
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_EXTENSION_IMPORTS) {
        return null;
      }
      if (extensionImportPackages.length === 0) {
        return 'export {};\n';
      }
      return extensionImportPackages.map((pkg) => `import ${JSON.stringify(pkg)};\n`).join('');
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!extensionSideEffectsActive) {
          return html;
        }
        if (extensionImportPackages.length === 0) {
          return html;
        }
        if (html.includes(VIRTUAL_EXTENSION_IMPORTS)) {
          return html;
        }
        if (!MAIN_TS_SCRIPT_RE.test(html)) {
          return html;
        }
        const inject = `<script type="module">import ${JSON.stringify(VIRTUAL_EXTENSION_IMPORTS)};</script>\n`;
        return html.replace(MAIN_TS_SCRIPT_RE, (match) => `${inject}${match}`);
      },
    },
  };
}
