import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@eclipse-docks\/core$/,
        replacement: path.resolve(import.meta.dirname, '../core/src/api/index.ts'),
      },
    ],
  },
  test: {
    environment: 'node',
    setupFiles: ['test/setup-dom.ts'],
    include: ['test/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
});
