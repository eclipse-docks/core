import { defineConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DUCKDB_PKG = '@duckdb/duckdb-wasm';

const isDuckdbMainEntry = (id: string): boolean =>
  id === DUCKDB_PKG || id.includes(DUCKDB_PKG);

const isExternal = (id: string): boolean => {
  if (id.startsWith('./') || id.startsWith('../')) return false;
  if (path.isAbsolute(id) && id.includes('/src/')) return false;
  if (isDuckdbMainEntry(id)) return true;
  return true;
};

/** Emit portable specifiers: duckdb main → package name, our package.json → relative path. */
const outputPath = (id: string): string => {
  if (isDuckdbMainEntry(id)) return DUCKDB_PKG;
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
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        api: path.resolve(__dirname, 'src/api.ts'),
      },
      formats: ['es'],
      fileName: (_, name) => `${name}.js`,
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
