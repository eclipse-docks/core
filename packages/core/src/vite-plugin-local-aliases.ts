import fs from 'node:fs';
import path from 'node:path';
import type { PluginOption, UserConfig } from 'vite';

export interface PackagePattern {
  /**
   * Folder name prefix used to detect packages, e.g. "extension-" or "core".
   */
  folderPrefix: string;

  /**
   * Optional package name prefix filter, e.g. "@eclipse-lyra/".
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
}

const discoverLocalAliases = (
  cfg: Pick<UserConfig, 'root'>,
  mode: string,
  options: LocalAliasesOptions = {},
): Record<string, string> => {
  const useSrcInDev = options.useSrcInDev ?? true;

  const rootDir = cfg.root ?? process.cwd();
  const packagesRoot =
    options.packagesRoot ?? path.resolve(rootDir, '..');

  const entries = fs.readdirSync(packagesRoot, { withFileTypes: true });
  const useSrc = useSrcInDev && mode === 'development';

  const patterns: PackagePattern[] =
    options.patterns && options.patterns.length
      ? options.patterns
      : [{ folderPrefix: 'extension-' }];

  return entries.reduce<Record<string, string>>((aliases, entry) => {
    if (!entry.isDirectory()) {
      return aliases;
    }

    const pattern = patterns.find((p) =>
      entry.name.startsWith(p.folderPrefix),
    );

    if (!pattern) {
      return aliases;
    }

    const pkgDir = path.join(packagesRoot, entry.name);
    const pkgPath = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return aliases;
    }

    const pkgJson = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgJson) as { name?: string };
    if (!pkg.name) {
      return aliases;
    }

    if (
      pattern.packageNamePrefix &&
      !pkg.name.startsWith(pattern.packageNamePrefix)
    ) {
      return aliases;
    }

    const entryPoint = useSrc
      ? path.join(pkgDir, 'src')
      : path.join(pkgDir, 'dist');

    aliases[pkg.name] = entryPoint;
    return aliases;
  }, {});
};

export const localAliasesPlugin = (
  options: LocalAliasesOptions = {},
): PluginOption => {
  return {
    name: 'local-aliases',
    config(config, env) {
      const aliases = discoverLocalAliases(config, env.mode, options);

      config.resolve ??= {};
      const existingAlias = config.resolve.alias ?? {};

      config.resolve.alias = {
        ...(typeof existingAlias === 'object' ? existingAlias : {}),
        ...aliases,
      };

      config.optimizeDeps ??= {};
      const existingExclude = config.optimizeDeps.exclude ?? [];

      config.optimizeDeps.exclude = [
        ...new Set([...existingExclude, ...Object.keys(aliases)]),
      ];
    },
  };
};

