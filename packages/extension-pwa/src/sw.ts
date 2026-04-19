/// <reference lib="webworker" />

import {
  addPlugins,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare const self: ServiceWorkerGlobalScope;

type SwUpdateProgressMessage = {
  type: 'SW_UPDATE_PROGRESS';
  completed: number;
  total: number;
  done: boolean;
  currentFile?: string;
};

const PRECACHE_MANIFEST = self.__WB_MANIFEST;
const PRECACHE_TOTAL = PRECACHE_MANIFEST.length;
let updateProgressStarted = false;
/** URLs finished during this waiting-SW install (cache hit or network fetch). */
const precacheInstallDoneUrls = new Set<string>();

async function broadcastUpdateProgress(
  completed: number,
  total: number,
  currentFile?: string,
  done = false,
): Promise<void> {
  if (total <= 0) {
    return;
  }
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  const message: SwUpdateProgressMessage = { type: 'SW_UPDATE_PROGRESS', completed, total, done, currentFile };
  clients.forEach((client) => client.postMessage(message));
}

function pathnameForProgress(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function shouldReportPrecacheInstallProgress(event: ExtendableEvent | undefined): boolean {
  return Boolean(event?.type === 'install' && self.registration.active && PRECACHE_TOTAL > 0);
}

function ensureUpdateProgressStarted(): void {
  if (updateProgressStarted || !self.registration.active || PRECACHE_TOTAL <= 0) {
    return;
  }
  updateProgressStarted = true;
  void broadcastUpdateProgress(0, PRECACHE_TOTAL);
}

function markPrecacheUrlDone(requestUrl: string): void {
  if (precacheInstallDoneUrls.has(requestUrl)) {
    return;
  }
  precacheInstallDoneUrls.add(requestUrl);
  void broadcastUpdateProgress(
    precacheInstallDoneUrls.size,
    PRECACHE_TOTAL,
    pathnameForProgress(requestUrl),
  );
}

function withCoopCoep(response: Response): Response {
  if (response.status === 0 || response.type === 'opaque' || response.type === 'opaqueredirect') {
    return response;
  }
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

cleanupOutdatedCaches();

addPlugins([
  {
    handlerWillStart: async ({ event, request }) => {
      if (!shouldReportPrecacheInstallProgress(event)) {
        return;
      }
      ensureUpdateProgressStarted();
      void broadcastUpdateProgress(
        precacheInstallDoneUrls.size,
        PRECACHE_TOTAL,
        pathnameForProgress(request.url),
      );
    },
    cachedResponseWillBeUsed: async ({ cachedResponse, request, event }) => {
      if (cachedResponse) {
        const response = withCoopCoep(cachedResponse);
        if (shouldReportPrecacheInstallProgress(event)) {
          ensureUpdateProgressStarted();
          markPrecacheUrlDone(request.url);
        }
        return response;
      }
      return cachedResponse;
    },
    fetchDidSucceed: async ({ request, response, event }) => {
      if (shouldReportPrecacheInstallProgress(event)) {
        ensureUpdateProgressStarted();
        markPrecacheUrlDone(request.url);
      }
      return withCoopCoep(response);
    },
  },
]);

precacheAndRoute(PRECACHE_MANIFEST);

/** Injected by `createDocksPwaPlugin` for the SW build only (JSON: `DocksPwaServiceWorkerConfig`). */
declare const __DOCKS_SW_INJECTED_CONFIG__: Readonly<Record<string, unknown>>;

function recordOrEmpty(value: unknown, path: string): Record<string, unknown> {
  if (value === undefined) {
    return {};
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Docks PWA SW: "${path}" must be a plain object`);
  }
  return value as Record<string, unknown>;
}

function regexpSourcesFromNavConfig(config: Readonly<Record<string, unknown>>, key: string): RegExp[] {
  const raw = config[key];
  if (raw === undefined) {
    return [];
  }
  if (!Array.isArray(raw) || !raw.every((x): x is string => typeof x === 'string')) {
    throw new Error(`Docks PWA SW: navigationRoute.${key} must be string[]`);
  }
  return raw.map((s) => new RegExp(s));
}

const swCfg = __DOCKS_SW_INJECTED_CONFIG__;
const indexUrl = new URL('index.html', self.registration.scope).href;
const navCfg = recordOrEmpty(swCfg.navigationRoute, 'navigationRoute');
const denylist = regexpSourcesFromNavConfig(navCfg, 'denylist');
const allowlist = regexpSourcesFromNavConfig(navCfg, 'allowlist');
registerRoute(
  new NavigationRoute(createHandlerBoundToURL(indexUrl), {
    ...(allowlist.length > 0 ? { allowlist } : {}),
    denylist,
  }),
);

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
