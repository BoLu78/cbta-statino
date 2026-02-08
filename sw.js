/* =========================================================
   CBTA Statino — Service Worker
   Offline safe (iPad Safari / Netlify)
   VERSION: 2026-02-08-sw-stable
   ========================================================= */

const CACHE_NAME = 'cbta-statino-v2026-02-08-stable';

/* Assets essenziali
   NB: SOLO file realmente presenti e necessari
*/
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './logo.png'
];

/* =====================
   INSTALL
   ===================== */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // attiva subito la nuova versione
});

/* =====================
   ACTIVATE
   ===================== */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim(); // prende subito controllo
});

/* =====================
   FETCH
   Cache-first (offline safe)
   ===================== */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // risposta non valida → non cache
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => cached); // offline fallback
    })
  );
});

