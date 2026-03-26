import { defineConfig } from 'vite';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isExternal = (id: string): boolean =>
  !id.startsWith('./') && !id.startsWith('../') && !(path.isAbsolute(id) && id.includes('/src/'));

export default defineConfig({
  build: {
    lib: { entry: path.resolve(__dirname, 'src/index.ts'), formats: ['es'], fileName: 'index' },
    rolldownOptions: { external: isExternal, output: { format: 'es' } },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
  },
});
