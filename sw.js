/* =========================================================
   CBTA Statino — Service Worker (UPDATE + OFFLINE)
   VERSION: 2026-02-10-sw-update
   ========================================================= */

const CACHE_NAME = "cbta-statino-2026-02-10"; // cambia SOLO questa stringa quando vuoi forzare un reset cache

const PRECACHE = [
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

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

// network-first per HTML e app.js (così aggiorna SEMPRE), cache-first per asset
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  const isHTML = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  const isAppJS = url.pathname.endsWith("/app.js") || url.pathname.endsWith("app.js");

  if (isHTML || isAppJS) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req)) || (isHTML ? caches.match("./index.html") : caches.match("./app.js"));
      }
    })());
    return;
  }

  // default: cache-first
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const fresh = await fetch(req);
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, fresh.clone());
    return fresh;
  })());
});


