import path from 'node:path';
import { defineConfig } from 'vitest/config';

const root = import.meta.dirname;

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(root, '../extension-ai-system/test/setup-dom.ts')],
    include: ['test/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
  resolve: {
    alias: [
      {
        find: /^@eclipse-docks\/core$/,
        replacement: path.resolve(root, '../core/src/api/index.ts'),
      },
    ],
  },
});
