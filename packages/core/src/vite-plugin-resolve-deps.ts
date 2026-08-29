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

function packageJsonPath(appRoot: string, packageName: string): string | null {
  const segments = packageName.startsWith('@')
    ? packageName.split('/')
    : [packageName];
  const relativePath = path.join('node_modules', ...segments, 'package.json');
  let dir = path.resolve(appRoot);
  const root = path.parse(dir).root;

  while (true) {
    const pkgPath = path.join(dir, relativePath);
    if (existsSync(pkgPath)) {
      return pkgPath;
    }
    if (dir === root) break;
    dir = path.dirname(dir);
  }
  return null;
}

function readPackageJson(appRoot: string, packageName: string): PackageJson | null {
  const pkgPath = packageJsonPath(appRoot, packageName);
  if (!pkgPath) return null;
  try {
    return JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageJson;
  } catch {
    return null;
  }
}

function findPackageVersion(appRoot: string, depName: string): string | null {
  const pkg = readPackageJson(appRoot, depName);
  if (typeof pkg?.version === 'string') return pkg.version;
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

/** Virtual module id; prepended to `src/main.ts` when extension side-effects are enabled. */
export const VIRTUAL_EXTENSION_IMPORTS = 'virtual:eclipse-docks-extension-imports';

const RESOLVED_VIRTUAL_EXTENSION_IMPORTS = `\0${VIRTUAL_EXTENSION_IMPORTS}`;

/** App entry module transformed by {@link resolveDepVersionsPlugin}. */
const MAIN_TS_MODULE_RE = /[/\\]src[/\\]main\.ts$/;

const EXTENSION_IMPORT_STATEMENT = `import ${JSON.stringify(VIRTUAL_EXTENSION_IMPORTS)};\n`;

/** Prepends the virtual extension side-effect import when not already present. */
export function prependExtensionSideEffectImport(code: string): string {
  if (code.includes(VIRTUAL_EXTENSION_IMPORTS)) {
    return code;
  }
  return EXTENSION_IMPORT_STATEMENT + code;
}

/** Unscoped `extension-*` or scoped `@namespace/extension-*` (any npm scope). */
const DEFAULT_EXTENSION_PATTERN = /^(?:@[^/]+\/)?extension-/;

const DEFAULT_PRIORITY_FIRST = ['@eclipse-docks/extension-pwa', 'extension-pwa'];

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
   * Which direct `dependencies` keys qualify as Docks-style extensions (`extension-*`, with an optional npm scope).
   * @default /^(?:@[^/]+\/)?extension-/
   */
  packageNamePattern?: RegExp;
}

export type ResolveDepVersionsPluginOptions = {
  includeDevDependencies?: boolean;
  /**
   * By default, registers a virtual module that side-effect-imports every matching direct
   * `dependencies` entry (see `ExtensionSideEffectsOptions`), and prepends
   * `import 'virtual:eclipse-docks-extension-imports'` to `src/main.ts` so extension
   * registration completes before `registerApp({ autoStart: true })`.
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

/**
 * Walks extension package.json `dependencies` to collect transitive extension-* packages
 * (e.g. extension-utils → extension-python-runtime → extension-terminal).
 */
export function collectTransitiveExtensionPackages(
  appRoot: string,
  seeds: string[],
  sideEffects: ExtensionSideEffectsListOptions,
): string[] {
  const found = new Set<string>();
  const queue = [...seeds];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (visited.has(name)) continue;
    visited.add(name);

    const pkg = readPackageJson(appRoot, name);
    if (!pkg?.dependencies) continue;

    for (const dep of Object.keys(pkg.dependencies)) {
      if (!sideEffects.pattern.test(dep) || sideEffects.exclude.has(dep)) continue;
      found.add(dep);
      queue.push(dep);
    }
  }

  return [...found];
}

export function resolveExtensionSideEffectPackages(
  appRoot: string,
  dependencies: Record<string, string>,
  sideEffects: ExtensionSideEffectsListOptions,
): string[] {
  const direct = listExtensionSideEffectPackages(dependencies, sideEffects);
  const transitive = collectTransitiveExtensionPackages(appRoot, direct, sideEffects);
  const allNames = [...new Set([...direct, ...transitive])];
  return listExtensionSideEffectPackages(
    Object.fromEntries(allNames.map((name) => [name, '*'])),
    sideEffects,
  );
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
      extensionImportPackages = resolveExtensionSideEffectPackages(
        appRoot,
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
    transform(code, id) {
      if (!extensionSideEffectsActive || extensionImportPackages.length === 0) {
        return null;
      }
      if (!MAIN_TS_MODULE_RE.test(id)) {
        return null;
      }
      const next = prependExtensionSideEffectImport(code);
      if (next === code) {
        return null;
      }
      return next;
    },
  };
}
