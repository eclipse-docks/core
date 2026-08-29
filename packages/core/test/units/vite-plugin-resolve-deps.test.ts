import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  collectTransitiveExtensionPackages,
  listExtensionSideEffectPackages,
  prependExtensionSideEffectImport,
  resolveDepVersionsPlugin,
  resolveExtensionSideEffectPackages,
  VIRTUAL_EXTENSION_IMPORTS,
} from '../../src/vite-plugin-resolve-deps';

const defaultSideEffects = {
  exclude: new Set<string>(),
  priorityFirst: ['@eclipse-docks/extension-pwa', 'extension-pwa'],
  pattern: /^(?:@[^/]+\/)?extension-/,
};

describe('listExtensionSideEffectPackages', () => {
  it('puts PWA first then sorts the rest alphabetically', () => {
    const deps = {
      '@eclipse-docks/extension-m': '*',
      '@eclipse-docks/extension-pwa': '*',
      '@eclipse-docks/extension-a': '*',
    };
    expect(listExtensionSideEffectPackages(deps, defaultSideEffects)).toEqual([
      '@eclipse-docks/extension-pwa',
      '@eclipse-docks/extension-a',
      '@eclipse-docks/extension-m',
    ]);
  });

  it('respects exclude', () => {
    const deps = {
      '@eclipse-docks/extension-pwa': '*',
      '@eclipse-docks/extension-x': '*',
    };
    expect(
      listExtensionSideEffectPackages(deps, {
        ...defaultSideEffects,
        exclude: new Set(['@eclipse-docks/extension-pwa']),
      }),
    ).toEqual(['@eclipse-docks/extension-x']);
  });

  it('respects custom priorityFirst order', () => {
    const deps = {
      '@eclipse-docks/extension-a': '*',
      '@eclipse-docks/extension-b': '*',
    };
    expect(
      listExtensionSideEffectPackages(deps, {
        ...defaultSideEffects,
        priorityFirst: ['@eclipse-docks/extension-b', '@eclipse-docks/extension-a'],
      }),
    ).toEqual(['@eclipse-docks/extension-b', '@eclipse-docks/extension-a']);
  });

  it('matches unscoped extension-* and sorts with scoped packages', () => {
    const deps = {
      'extension-zebra': '*',
      '@eclipse-docks/extension-a': '*',
      'extension-mine': '*',
      'not-extension': '*',
    };
    expect(listExtensionSideEffectPackages(deps, defaultSideEffects)).toEqual([
      '@eclipse-docks/extension-a',
      'extension-mine',
      'extension-zebra',
    ]);
  });
});

describe('collectTransitiveExtensionPackages', () => {
  it('collects extension dependencies from package.json files', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-utils': '*',
      },
      (root) => {
        const utilsDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-utils');
        const runtimeDir = path.join(
          root,
          'node_modules',
          '@eclipse-docks',
          'extension-python-runtime',
        );
        mkdirSync(utilsDir, { recursive: true });
        mkdirSync(runtimeDir, { recursive: true });
        writeFileSync(
          path.join(utilsDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-utils',
            dependencies: {
              '@eclipse-docks/extension-python-runtime': '*',
            },
          }),
        );
        writeFileSync(
          path.join(runtimeDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-python-runtime',
            dependencies: {
              '@eclipse-docks/extension-terminal': '*',
            },
          }),
        );

        expect(
          collectTransitiveExtensionPackages(
            root,
            ['@eclipse-docks/extension-utils'],
            defaultSideEffects,
          ),
        ).toEqual([
          '@eclipse-docks/extension-python-runtime',
          '@eclipse-docks/extension-terminal',
        ]);
      },
    );
  });
});

describe('resolveExtensionSideEffectPackages', () => {
  it('merges direct and transitive extension packages', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-utils': '*',
      },
      (root) => {
        const utilsDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-utils');
        const runtimeDir = path.join(
          root,
          'node_modules',
          '@eclipse-docks',
          'extension-python-runtime',
        );
        mkdirSync(utilsDir, { recursive: true });
        mkdirSync(runtimeDir, { recursive: true });
        writeFileSync(
          path.join(utilsDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-utils',
            dependencies: {
              '@eclipse-docks/extension-python-runtime': '*',
            },
          }),
        );
        writeFileSync(
          path.join(runtimeDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-python-runtime',
            dependencies: {
              '@eclipse-docks/extension-terminal': '*',
            },
          }),
        );

        expect(
          resolveExtensionSideEffectPackages(
            root,
            { '@eclipse-docks/extension-utils': '*' },
            defaultSideEffects,
          ),
        ).toEqual([
          '@eclipse-docks/extension-python-runtime',
          '@eclipse-docks/extension-terminal',
          '@eclipse-docks/extension-utils',
        ]);
      },
    );
  });
});

function runConfigResolved(plugin: Plugin, root: string) {
  const cr = plugin.configResolved;
  if (typeof cr === 'function') {
    cr.call({} as never, { root } as ResolvedConfig);
    return;
  }
  if (cr && typeof cr === 'object' && 'handler' in cr && typeof cr.handler === 'function') {
    cr.handler.call({} as never, { root } as ResolvedConfig);
  }
}

function withTempPackageJson(
  dependencies: Record<string, string>,
  fn: (root: string) => void,
) {
  const root = mkdtempSync(path.join(tmpdir(), 'resolve-deps-test-'));
  try {
    writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify({ name: 't', version: '1.0.0', dependencies }),
    );
    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function runMainTsTransform(
  code: string,
  plugin: Plugin,
  id = '/app/packages/app/src/main.ts',
): string | null {
  const transform = plugin.transform;
  if (!transform) {
    throw new Error('missing transform');
  }
  const handler = typeof transform === 'function' ? transform : transform.handler;
  const result = handler.call({} as never, code, id);
  if (result && typeof result === 'object' && 'then' in result) {
    throw new Error('expected synchronous transform result');
  }
  if (typeof result === 'string') {
    return result;
  }
  if (result && typeof result === 'object' && 'code' in result) {
    const { code } = result;
    return typeof code === 'string' ? code : null;
  }
  return null;
}

describe('prependExtensionSideEffectImport', () => {
  it('prepends virtual import when missing', () => {
    const input = `import { appLoaderService } from '@eclipse-docks/core';\n`;
    expect(prependExtensionSideEffectImport(input)).toBe(
      `import ${JSON.stringify(VIRTUAL_EXTENSION_IMPORTS)};\n` + input,
    );
  });

  it('is idempotent when virtual import already present', () => {
    const input = `import ${JSON.stringify(VIRTUAL_EXTENSION_IMPORTS)};\nimport './app';\n`;
    expect(prependExtensionSideEffectImport(input)).toBe(input);
  });
});

describe('resolveDepVersionsPlugin extension side-effects', () => {
  const mainTs = `import { appLoaderService } from '@eclipse-docks/core';\n`;

  it('does not transform main.ts when extensionSideEffects is disabled', () => {
    withTempPackageJson({ '@eclipse-docks/extension-pwa': '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin({ extensionSideEffects: false }) as Plugin;
      runConfigResolved(plugin, root);
      expect(runMainTsTransform(mainTs, plugin)).toBeNull();
    });
  });

  it('prepends virtual import to main.ts when deps match', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-pwa': '*',
        '@kispace-io/extension-openneuro': '*',
      },
      (root) => {
        const plugin = resolveDepVersionsPlugin() as Plugin;
        runConfigResolved(plugin, root);
        const out = runMainTsTransform(mainTs, plugin);
        expect(out).toContain(VIRTUAL_EXTENSION_IMPORTS);
        expect(out?.indexOf(VIRTUAL_EXTENSION_IMPORTS)).toBeLessThan(
          out?.indexOf('@eclipse-docks/core') ?? -1,
        );
      },
    );
  });

  it('is idempotent when virtual id already present in main.ts', () => {
    withTempPackageJson({ '@eclipse-docks/extension-pwa': '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin() as Plugin;
      runConfigResolved(plugin, root);
      const withImport = prependExtensionSideEffectImport(mainTs);
      expect(runMainTsTransform(withImport, plugin)).toBeNull();
    });
  });

  it('does not transform main.ts when no matching dependencies', () => {
    withTempPackageJson({ other: '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin() as Plugin;
      runConfigResolved(plugin, root);
      expect(runMainTsTransform(mainTs, plugin)).toBeNull();
    });
  });
});
