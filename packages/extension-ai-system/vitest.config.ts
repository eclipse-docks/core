import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['test/setup-dom.ts'],
    include: ['test/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
});
