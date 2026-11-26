// CancerCare service worker: keeps visited pages available offline.
// Pages: network first (fresh content), saved copy when offline.
// Built assets, images and fonts: served from the saved copy, fetched once.
// The chat and contact APIs are never cached.
const VERSION = 'cancercare-v1';
const PAGES = ['/', '/learn/', '/resources/', '/caregivers/', '/find-care/', '/how-it-works/', '/about/', '/get-involved/', '/privacy/'];
const CORE = ['/offline.html', '/favicon.svg', '/manifest.webmanifest', '/icon-192.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    await Promise.allSettled(PAGES.map(page => cache.add(page)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name !== VERSION) await caches.delete(name);
    await self.clients.claim();
  })());
});

// The page sends the files it loaded, so they work offline from the first visit.
self.addEventListener('message', event => {
  if (event.data?.type !== 'cache-urls' || !Array.isArray(event.data.urls)) return;
  event.waitUntil(caches.open(VERSION).then(cache => Promise.allSettled(
    event.data.urls.filter(url => typeof url === 'string' && new URL(url).origin === self.location.origin && !url.includes('/api/')).slice(0, 80).map(url => cache.add(url)),
  )));
});

async function networkFirst(request) {
  const cache = await caches.open(VERSION);
  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
    ]);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request, { ignoreSearch: true, ignoreVary: true })) ?? (await cache.match('/offline.html'));
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(VERSION);
  const saved = await cache.match(request, { ignoreVary: true });
  if (saved) return saved;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (request.mode === 'navigate') event.respondWith(networkFirst(request));
  else if (/^\/assets\/|\.(?:png|jpe?g|webp|svg|woff2?|webmanifest)$/.test(url.pathname)) event.respondWith(cacheFirst(request));
});
