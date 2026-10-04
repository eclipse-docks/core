import { defineConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isCereusDbPackage = (id: string): boolean => id.startsWith('@cereusdb/');

const isExternal = (id: string): boolean => {
  if (id.startsWith('./') || id.startsWith('../')) return false;
  if (path.isAbsolute(id) && id.includes('/src/')) return false;
  if (isCereusDbPackage(id)) return true;
  return true;
};

const outputPath = (id: string): string => {
  if (isCereusDbPackage(id)) return id;
  if (id.endsWith('package.json')) return '../package.json';
  return id;
};

/** Leave wasm URL imports for the app bundler. This library build inlines assets. */
const externalizeCereusWasmUrls = () => ({
  name: 'externalize-cereus-wasm-urls',
  enforce: 'pre' as const,
  resolveId(id: string) {
    const spec = id.split('?')[0];
    if (spec.startsWith('@cereusdb/') && spec.endsWith('/wasm')) {
      return { id, external: true };
    }
    return null;
  },
});

export default defineConfig({
  worker: {
    format: 'es',
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
  plugins: [
    externalizeCereusWasmUrls(),
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
