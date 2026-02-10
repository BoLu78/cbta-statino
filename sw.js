/* =========================================================
   CBTA Statino — Service Worker (OFFLINE + GITHUB PAGES)
   VERSION: v12feb26-v6
   ========================================================= */

const CACHE_NAME = "cbta-statino-v12feb26-v6";
const STATIC_CACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./sw.js",
  "./logo.png",
  "./manifest.json",
  "./manifest.webmanifest",
  "./icon-152.png",
  "./icon-192.png",
  "./apple-touch-icon.png",
  "./ob-data.js",
  "/cbta-statino/",
  "/cbta-statino/index.html",
  "/cbta-statino/styles.css",
  "/cbta-statino/app.js",
  "/cbta-statino/sw.js",
  "/cbta-statino/logo.png",
  "/cbta-statino/manifest.json",
  "/cbta-statino/manifest.webmanifest",
  "/cbta-statino/icon-152.png",
  "/cbta-statino/icon-192.png",
  "/cbta-statino/apple-touch-icon.png",
  "/cbta-statino/ob-data.js"
];

const PRECACHE_URLS = [...new Set(STATIC_CACHE_URLS)];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(
      PRECACHE_URLS.map((url) =>
        cache.add(new Request(url, { cache: "reload" })).catch(() => null)
      )
    );
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((key) =>
        key.startsWith("cbta-statino-") && key !== CACHE_NAME
          ? caches.delete(key)
          : Promise.resolve()
      )
    );
    await self.clients.claim();
  })());
});

function isStaticAsset(pathname) {
  return (
    pathname.endsWith("/") ||
    pathname.endsWith(".html") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".webmanifest") ||
    pathname.endsWith(".ico")
  );
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match("./index.html")) ||
      (await caches.match("/cbta-statino/index.html")) ||
      (await caches.match("./")) ||
      (await caches.match("/cbta-statino/")) ||
      Response.error()
    );
  }
}

async function cacheFirstStatic(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const fresh = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    return (
      (await caches.match("./index.html")) ||
      (await caches.match("/cbta-statino/index.html")) ||
      Response.error()
    );
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstStatic(request));
    return;
  }

  event.respondWith(cacheFirstStatic(request));
});
