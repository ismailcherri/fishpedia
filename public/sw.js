/* Fishpedia service worker: offline support via runtime caching.
 * Pages and assets are cached as they are visited (stale-while-revalidate),
 * so the app keeps working at the water without reception. */
const CACHE = 'fishpedia-v1'
const BASE = new URL(self.registration.scope).pathname

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([BASE, `${BASE}kalender/`, `${BASE}info/`, `${BASE}manifest.webmanifest`, `${BASE}icon.svg`]),
      )
      .catch(() => {})
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => cached ?? caches.match(BASE))
      return cached ?? network
    }),
  )
})
