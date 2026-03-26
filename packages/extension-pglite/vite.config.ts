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

/** Emit portable specifiers: pglite → package name, package.json → relative path. */
const outputPath = (id: string): string => {
  if (isPgliteEntry(id)) return id;
  if (id.includes('@electric-sql/pglite')) return PGLITE_PKG;
  if (id.endsWith('package.json')) return '../package.json';
  return id;
};

export default defineConfig({
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

