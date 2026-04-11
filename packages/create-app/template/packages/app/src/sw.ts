/// <reference lib="webworker" />

import {
  addPlugins,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare const self: ServiceWorkerGlobalScope;

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
    fetchDidSucceed: async ({ response }) => withCoopCoep(response),
  },
]);

precacheAndRoute(self.__WB_MANIFEST);

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
