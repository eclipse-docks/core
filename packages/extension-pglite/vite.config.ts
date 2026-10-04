import { defineConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PGLITE_PKG = '@electric-sql/pglite';

const isPgliteEntry = (id: string): boolean =>
  id === PGLITE_PKG || id.startsWith(`${PGLITE_PKG}/`);

const isExternal = (id: string): boolean => {
  if (id.startsWith('./') || id.startsWith('../')) return false;
  if (path.isAbsolute(id) && id.includes('/src/')) return false;
  if (isPgliteEntry(id)) return true;
  return true;
};

/** Keep package specifiers intact, including sibling @electric-sql/pglite-* packages. */
const outputPath = (id: string): string => {
  if (isPgliteEntry(id)) return id;
  if (id.endsWith('package.json')) return '../package.json';
  return id;
};

const keepPgliteAssetsExternal = () => ({
  name: 'keep-pglite-assets-external',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (!id.includes('@electric-sql/pglite')) return null;
    if (!code.includes('.wasm') && !code.includes('.tar.gz') && !code.includes('.data')) return null;
    const next = code.replace(
      /new URL\((["'])([^"'?]+?\.(?:wasm|tar\.gz|data))\1/g,
      (_match, quote: string, file: string) => `new URL(${quote}${file}?no-inline${quote}`,
    );
    return next === code ? null : { code: next, map: null };
  },
});

export default defineConfig({
  base: './',
  worker: {
    format: 'es' as const,
    plugins: () => [keepPgliteAssetsExternal()],
    rolldownOptions: {
      external: (id: string) => id.startsWith('@eclipse-docks/'),
    },
  },
  plugins: [
    dts({
      outDir: 'dist',
      entryRoot: 'src',
      rollupTypes: false,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.build.json'),
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        format: 'es',
        paths: outputPath,
      },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
  },
});

