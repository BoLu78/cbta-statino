/* =========================================================
   CBTA Statino — Service Worker (DEFINITIVE)
   Offline safe + UPDATE safe (iPad Safari)
   VERSION: 2026-02-10-sw-definitive

   Strategy:
   - HTML (navigate): network-first (aggiornamenti sempre), fallback cache offline
   - JS/CSS: stale-while-revalidate (veloce, si aggiorna in background)
   - altri assets: cache-first
   ========================================================= */

const CACHE_NAME = "cbta-statino-v2026-02-10";

/* Assets essenziali (precache)
   NB: aggiungi qui SOLO file che esistono davvero in root
*/
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./logo.png",
  "./manifest.json",
  "./ob-data.js",
  "./icon-152.png",
  "./icon-192.png",
  "./apple-touch-icon.png"
];

/* =====================
   INSTALL
   ===================== */
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

/* =====================
   ACTIVATE
   ===================== */
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

/* =====================
   FETCH
   ===================== */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Solo stesso origin
  if (url.origin !== self.location.origin) return;

  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  const isJS = url.pathname.endsWith(".js");
  const isCSS = url.pathname.endsWith(".css");

  // 1) HTML: NETWORK FIRST (così aggiorna sempre)
  if (isHTML) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req) || await caches.match("./index.html");
        return cached;
      }
    })());
    return;
  }

  // 2) JS/CSS: STALE-WHILE-REVALIDATE (veloce + update)
  if (isJS || isCSS) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);

      const fetchPromise = fetch(req)
        .then((fresh) => {
          if (fresh && fresh.status === 200) cache.put(req, fresh.clone());
          return fresh;
        })
        .catch(() => null);

      // se ho cache -> ritorno subito cache, intanto aggiorno in background
      if (cached) return cached;

      // altrimenti provo rete
      const fresh = await fetchPromise;
      return fresh || cached;
    })());
    return;
  }

  // 3) ALTRI ASSET: CACHE FIRST (offline friendly)
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch {
      return cached;
    }
  })());
});

