import fs from 'node:fs';
import path from 'node:path';
import type { PluginOption, UserConfig } from 'vite';

export interface PackagePattern {
  /**
   * Folder name prefix used to detect packages, e.g. "extension-" or "core".
   */
  folderPrefix: string;

  /**
   * Optional package name prefix filter, e.g. "@eclipse-docks/".
   */
  packageNamePrefix?: string;
}

export interface LocalAliasesOptions {
  /**
   * Root directory that contains the local packages.
   * Defaults to the parent of the Vite `root` directory.
   */
  packagesRoot?: string;

  /**
   * Package patterns to scan for. By default looks for "extension-*"
   * folders with any package name.
   */
  patterns?: PackagePattern[];

  /**
   * If true, aliases will point to `src` in dev mode and `dist` otherwise.
   * Defaults to `true`.
   */
  useSrcInDev?: boolean;
  /**
   * If true, always point aliases at `src` regardless of mode.
   */
  alwaysUseSrc?: boolean;
}

interface EclipseDocksPackageJson {
  name?: string;
  /**
   * Optional: extra `optimizeDeps.exclude` entries for this workspace package
   * (e.g. heavy WASM npm deps that must not be pre-bundled in dev).
   */
  eclipseDocks?: {
    viteOptimizeDepsExclude?: string[];
  };
}

function discoverLocalAliasesAndExtraExcludes(
  cfg: Pick<UserConfig, 'root'>,
  mode: string,
  options: LocalAliasesOptions = {},
): { aliases: Record<string, string>; extraOptimizeDepsExclude: string[] } {
  const useSrcInDev = options.useSrcInDev ?? true;
  const alwaysUseSrc = options.alwaysUseSrc ?? false;

  const rootDir = cfg.root ?? process.cwd();
  const packagesRoot =
    options.packagesRoot ?? path.resolve(rootDir, '..');

  const entries = fs.readdirSync(packagesRoot, { withFileTypes: true });
  const useSrc = alwaysUseSrc || (useSrcInDev && mode === 'development');

  const patterns: PackagePattern[] =
    options.patterns && options.patterns.length
      ? options.patterns
      : [{ folderPrefix: 'extension-' }];

  const aliases: Record<string, string> = {};
  const extraOptimizeDepsExclude: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const pattern = patterns.find((p) =>
      entry.name.startsWith(p.folderPrefix),
    );

    if (!pattern) {
      continue;
    }

    const pkgDir = path.join(packagesRoot, entry.name);
    const pkgPath = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      continue;
    }

    const pkgJson = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgJson) as EclipseDocksPackageJson;
    if (!pkg.name) {
      continue;
    }

    if (
      pattern.packageNamePrefix &&
      !pkg.name.startsWith(pattern.packageNamePrefix)
    ) {
      continue;
    }

    const entryPoint = useSrc
      ? path.join(pkgDir, 'src')
      : path.join(pkgDir, 'dist');

    aliases[pkg.name] = entryPoint;

    const more = pkg.eclipseDocks?.viteOptimizeDepsExclude;
    if (Array.isArray(more)) {
      for (const id of more) {
        if (typeof id === 'string' && id.length > 0) {
          extraOptimizeDepsExclude.push(id);
        }
      }
    }
  }

  return { aliases, extraOptimizeDepsExclude };
}

export const localAliasesPlugin = (
  options: LocalAliasesOptions = {},
): PluginOption => {
  return {
    name: 'local-aliases',
    config(config, env) {
      const { aliases, extraOptimizeDepsExclude } =
        discoverLocalAliasesAndExtraExcludes(config, env.mode, options);

      config.resolve ??= {};
      const existingAlias = config.resolve.alias ?? {};

      config.resolve.alias = {
        ...(typeof existingAlias === 'object' ? existingAlias : {}),
        ...aliases,
      };

      config.optimizeDeps ??= {};
      const existingExclude = config.optimizeDeps.exclude ?? [];

      config.optimizeDeps.exclude = [
        ...new Set([
          ...existingExclude,
          ...Object.keys(aliases),
          ...extraOptimizeDepsExclude,
        ]),
      ];
    },
  };
};

