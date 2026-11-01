import { defineConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isExternal = (id: string): boolean => {
  if (id.startsWith('./') || id.startsWith('../')) return false;
  if (path.isAbsolute(id) && id.includes('/src/')) return false;
  return true;
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
      output: { format: 'es' },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
  },
});
