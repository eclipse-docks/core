import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import mkcert from 'vite-plugin-mkcert';
import { appSplashPlugin } from '../core/src/vite-plugin-app-splash';
import { localAliasesPlugin } from '../core/src/vite-plugin-local-aliases';
import { resolveDepVersionsPlugin } from '../core/src/vite-plugin-resolve-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, '..');

const e2eHttpPreview = process.env.E2E_HTTP_PREVIEW === '1';

/** Same COOP/COEP as vite-plugin-cross-origin-isolation (that package only hooks configureServer, not preview). */
function crossOriginIsolationPreviewPlugin() {
    return {
        name: 'cross-origin-isolation-preview',
        configurePreviewServer(server) {
            server.middlewares.use((_req, res, next) => {
                res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
                res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
                next();
            });
        },
    };
}

export default defineConfig({
    root: __dirname,
    base: process.env.VITE_BASE_PATH || '/',
    server: {
        watch: {
            ignored: ['**/node_modules/**', '**/dist/**'],
        },
    },
    plugins: [
        appSplashPlugin({ logo: { src: '/logo.svg' } }),
        resolveDepVersionsPlugin(),
        localAliasesPlugin({
            packagesRoot: packagesDir,
            useSrcInDev: true,
            patterns: [
                { folderPrefix: 'core', packageNamePrefix: '@eclipse-docks/' },
                { folderPrefix: 'extension-' },
            ],
        }),
        ...(e2eHttpPreview ? [] : [mkcert()]),
        crossOriginIsolation(),
        ...(e2eHttpPreview ? [crossOriginIsolationPreviewPlugin()] : []),
        {
            name: 'watch-workspace-packages',
            configureServer(server) {
                server.watcher.add(packagesDir);
            },
        },
    ],
    worker: {
        format: 'es',
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        assetsInlineLimit: 0,
        rolldownOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks(id: string) {
                    const normalized = id.replaceAll('\\', '/');
                    if (!/\/extension-canvas\/(?:src|dist)\/bridges\//.test(normalized)) return undefined;
                    const file = normalized.split('/').pop()?.replace(/\.ts$/, '') ?? 'bridge';
                    return `canvas-bridge-${file}`;
                },
            },
        },
    },
});
