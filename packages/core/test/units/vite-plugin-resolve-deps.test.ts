import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { IndexHtmlTransformContext, Plugin, ResolvedConfig } from 'vite';
import {
  listExtensionSideEffectPackages,
  resolveDepVersionsPlugin,
  VIRTUAL_EXTENSION_IMPORTS,
} from '../../src/vite-plugin-resolve-deps';

const minimalCtx = {
  path: '/index.html',
  filename: 'index.html',
} as IndexHtmlTransformContext;

const defaultSideEffects = {
  exclude: new Set<string>(),
  priorityFirst: ['@eclipse-docks/extension-pwa'],
  pattern: /^@eclipse-docks\/extension-/,
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

function runHtmlTransform(
  html: string,
  plugin: Plugin,
): string {
  const tih = plugin.transformIndexHtml;
  if (!tih || typeof tih !== 'object' || !('handler' in tih)) {
    throw new Error('missing transformIndexHtml handler');
  }
  const result = (tih.handler as (h: string, c: IndexHtmlTransformContext) => string)(
    html,
    minimalCtx,
  );
  if (typeof result !== 'string') {
    throw new Error('expected synchronous html string');
  }
  return result;
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

describe('resolveDepVersionsPlugin extension side-effects', () => {
  const indexHtml = `<!doctype html><body>
  <div id="app-root"></div>
  <script type="module" src="/src/main.ts"></script>
</body></html>`;

  it('does not inject when extensionSideEffects is disabled', () => {
    withTempPackageJson({ '@eclipse-docks/extension-pwa': '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin({ extensionSideEffects: false }) as Plugin;
      runConfigResolved(plugin, root);
      const out = runHtmlTransform(indexHtml, plugin);
      expect(out).toBe(indexHtml);
    });
  });

  it('injects virtual import before main by default when deps match', () => {
    withTempPackageJson(
      {
        '@eclipse-docks/extension-pwa': '*',
        '@eclipse-docks/extension-z': '*',
      },
      (root) => {
        const plugin = resolveDepVersionsPlugin() as Plugin;
        runConfigResolved(plugin, root);
        const out = runHtmlTransform(indexHtml, plugin);
        expect(out).toContain(VIRTUAL_EXTENSION_IMPORTS);
        expect(out.indexOf(VIRTUAL_EXTENSION_IMPORTS)).toBeLessThan(out.indexOf('/src/main.ts'));
      },
    );
  });

  it('is idempotent when virtual id already present', () => {
    withTempPackageJson({ '@eclipse-docks/extension-pwa': '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin() as Plugin;
      runConfigResolved(plugin, root);
      const once = runHtmlTransform(indexHtml, plugin);
      const twice = runHtmlTransform(once, plugin);
      expect(twice).toBe(once);
    });
  });

  it('does not inject when no matching dependencies', () => {
    withTempPackageJson({ other: '*' }, (root) => {
      const plugin = resolveDepVersionsPlugin() as Plugin;
      runConfigResolved(plugin, root);
      const out = runHtmlTransform(indexHtml, plugin);
      expect(out).toBe(indexHtml);
    });
  });
});
