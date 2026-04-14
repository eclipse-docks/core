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
const updateProgressSeen = new Set<string>();
const updateProgressFetched = new Set<string>();

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
    cachedResponseWillBeUsed: async ({ cachedResponse }) =>
      cachedResponse ? withCoopCoep(cachedResponse) : cachedResponse,
    requestWillFetch: async ({ request }) => {
      if (!updateProgressStarted && self.registration.active && PRECACHE_TOTAL > 0) {
        updateProgressStarted = true;
        void broadcastUpdateProgress(0, PRECACHE_TOTAL);
      }
      updateProgressSeen.add(request.url);
      return request;
    },
    fetchDidSucceed: async ({ request, response }) => {
      if (
        updateProgressStarted &&
        updateProgressSeen.has(request.url) &&
        !updateProgressFetched.has(request.url)
      ) {
        updateProgressFetched.add(request.url);
        const currentFile = new URL(request.url).pathname;
        void broadcastUpdateProgress(updateProgressFetched.size, PRECACHE_TOTAL, currentFile);
      }
      return withCoopCoep(response);
    },
  },
]);

precacheAndRoute(PRECACHE_MANIFEST);

const indexUrl = new URL('index.html', self.registration.scope).href;
registerRoute(new NavigationRoute(createHandlerBoundToURL(indexUrl)));

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
