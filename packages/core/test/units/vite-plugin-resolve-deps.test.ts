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
  resolvePackageInfo,
  resolveDependencyInfo,
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

describe('resolvePackageInfo dependency metadata', () => {
  it('collects license and links from installed package.json files', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-example': '*',
      },
      (root) => {
        const extDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-example');
        mkdirSync(extDir, { recursive: true });
        writeFileSync(
          path.join(extDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-example',
            version: '2.0.0',
            license: 'EPL-2.0',
            homepage: 'https://example.com/ext',
            dependencies: {
              'example-lib': '*',
            },
          }),
        );

        const libDir = path.join(root, 'node_modules', 'example-lib');
        mkdirSync(libDir, { recursive: true });
        writeFileSync(
          path.join(libDir, 'package.json'),
          JSON.stringify({
            name: 'example-lib',
            version: '3.1.4',
            license: 'MIT',
            repository: 'git+https://github.com/example/example-lib.git',
            description: 'Example runtime library',
          }),
        );

        const info = resolvePackageInfo(root);
        expect(info?.directDependencies).toEqual(['@eclipse-docks/extension-example']);
        expect(info?.dependencies['@eclipse-docks/extension-example']).toMatchObject({
          license: 'EPL-2.0',
          homepage: 'https://example.com/ext',
        });
        expect(info?.nestedDependencies['@eclipse-docks/extension-example']).toEqual(['example-lib']);
        expect(info?.dependencies['example-lib']).toMatchObject({
          license: 'MIT',
          repository: 'https://github.com/example/example-lib',
          description: 'Example runtime library',
        });
        expect(info?.dependencies['example-lib']).not.toHaveProperty('version');
      },
    );
  });

  it('normalizes compound and object license fields', () => {
    withTempPackageJson({ 'compound-lib': '*' }, (root) => {
      const libDir = path.join(root, 'node_modules', 'compound-lib');
      mkdirSync(libDir, { recursive: true });
      writeFileSync(
        path.join(libDir, 'package.json'),
        JSON.stringify({
          name: 'compound-lib',
          version: '1.0.0',
          license: ['MIT', { type: 'Apache-2.0' }],
        }),
      );

      expect(resolveDependencyInfo(root, 'compound-lib').license).toBe('MIT AND Apache-2.0');
    });
  });

  it('does not pull third-party deps through other extension packages', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-cereusdb': '*',
        '@eclipse-docks/extension-monaco-editor': '*',
      },
      (root) => {
        const cereusdbDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-cereusdb');
        const sqleditorDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-sqleditor');
        const monacoExtDir = path.join(
          root,
          'node_modules',
          '@eclipse-docks',
          'extension-monaco-editor',
        );
        mkdirSync(cereusdbDir, { recursive: true });
        mkdirSync(sqleditorDir, { recursive: true });
        mkdirSync(monacoExtDir, { recursive: true });

        writeFileSync(
          path.join(cereusdbDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-cereusdb',
            version: '0.0.0',
            license: 'EPL-2.0',
            dependencies: {
              '@cereusdb/full': '*',
              '@eclipse-docks/extension-sqleditor': '*',
            },
          }),
        );
        writeFileSync(
          path.join(sqleditorDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-sqleditor',
            version: '0.0.0',
            dependencies: {
              '@eclipse-docks/extension-monaco-editor': '*',
            },
          }),
        );
        writeFileSync(
          path.join(monacoExtDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-monaco-editor',
            version: '0.0.0',
            license: 'EPL-2.0',
            dependencies: {
              'monaco-editor': '*',
            },
          }),
        );

        const monacoDir = path.join(root, 'node_modules', 'monaco-editor');
        mkdirSync(monacoDir, { recursive: true });
        writeFileSync(
          path.join(monacoDir, 'package.json'),
          JSON.stringify({
            name: 'monaco-editor',
            version: '0.55.1',
            license: 'MIT',
          }),
        );

        const cereusdbDir2 = path.join(root, 'node_modules', '@cereusdb', 'full');
        mkdirSync(cereusdbDir2, { recursive: true });
        writeFileSync(
          path.join(cereusdbDir2, 'package.json'),
          JSON.stringify({
            name: '@cereusdb/full',
            version: '0.1.2',
            license: 'Apache-2.0',
          }),
        );

        const info = resolvePackageInfo(root);
        expect(info?.nestedDependencies['@eclipse-docks/extension-cereusdb']).toEqual([
          '@cereusdb/full',
        ]);
        expect(info?.nestedDependencies['@eclipse-docks/extension-monaco-editor']).toEqual([
          'monaco-editor',
        ]);
      },
    );
  });

  it('lists only direct third-party dependencies, not transitive ones', () => {
    withTempPackageJson({ '@eclipse-docks/extension-monaco-editor': '*' }, (root) => {
      const monacoExtDir = path.join(
        root,
        'node_modules',
        '@eclipse-docks',
        'extension-monaco-editor',
      );
      mkdirSync(monacoExtDir, { recursive: true });
      writeFileSync(
        path.join(monacoExtDir, 'package.json'),
        JSON.stringify({
          name: '@eclipse-docks/extension-monaco-editor',
          version: '0.0.0',
          license: 'EPL-2.0',
          dependencies: {
            'monaco-editor': '*',
          },
        }),
      );

      const monacoDir = path.join(root, 'node_modules', 'monaco-editor');
      mkdirSync(monacoDir, { recursive: true });
      writeFileSync(
        path.join(monacoDir, 'package.json'),
        JSON.stringify({
          name: 'monaco-editor',
          version: '0.55.1',
          license: 'MIT',
          dependencies: {
            marked: '*',
            dompurify: '*',
          },
        }),
      );

      const info = resolvePackageInfo(root);
      expect(info?.nestedDependencies['@eclipse-docks/extension-monaco-editor']).toEqual([
        'monaco-editor',
      ]);
      expect(info?.dependencies.marked).toBeUndefined();
      expect(info?.dependencies.dompurify).toBeUndefined();
    });
  });

  it('allows the same third-party package under multiple direct parents', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-a': '*',
        '@eclipse-docks/extension-b': '*',
      },
      (root) => {
        const extADir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-a');
        const extBDir = path.join(root, 'node_modules', '@eclipse-docks', 'extension-b');
        mkdirSync(extADir, { recursive: true });
        mkdirSync(extBDir, { recursive: true });
        writeFileSync(
          path.join(extADir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-a',
            version: '0.0.0',
            dependencies: { marked: '*' },
          }),
        );
        writeFileSync(
          path.join(extBDir, 'package.json'),
          JSON.stringify({
            name: '@eclipse-docks/extension-b',
            version: '0.0.0',
            dependencies: { marked: '*' },
          }),
        );

        const markedDir = path.join(root, 'node_modules', 'marked');
        mkdirSync(markedDir, { recursive: true });
        writeFileSync(
          path.join(markedDir, 'package.json'),
          JSON.stringify({
            name: 'marked',
            version: '18.0.0',
            license: 'MIT',
          }),
        );

        const info = resolvePackageInfo(root);
        expect(info?.nestedDependencies['@eclipse-docks/extension-a']).toEqual(['marked']);
        expect(info?.nestedDependencies['@eclipse-docks/extension-b']).toEqual(['marked']);
      },
    );
  });

  it('skips build-time packages when nesting runtime dependencies', () => {
    withTempPackageJson({ '@eclipse-docks/core': '*' }, (root) => {
      const coreDir = path.join(root, 'node_modules', '@eclipse-docks', 'core');
      mkdirSync(coreDir, { recursive: true });
      writeFileSync(
        path.join(coreDir, 'package.json'),
        JSON.stringify({
          name: '@eclipse-docks/core',
          version: '0.0.0',
          license: 'EPL-2.0',
          dependencies: {
            lit: '*',
            typescript: '*',
            '@types/node': '*',
          },
        }),
      );

      const litDir = path.join(root, 'node_modules', 'lit');
      mkdirSync(litDir, { recursive: true });
      writeFileSync(
        path.join(litDir, 'package.json'),
        JSON.stringify({
          name: 'lit',
          version: '3.3.3',
          license: 'BSD-3-Clause',
        }),
      );

      const info = resolvePackageInfo(root);
      expect(info?.nestedDependencies['@eclipse-docks/core']).toEqual(['lit']);
      expect(info?.dependencies['lit']?.license).toBe('BSD-3-Clause');
    });
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
