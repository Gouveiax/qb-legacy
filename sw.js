// QB Legacy service worker: caches the game so it opens offline and loads
// instantly after the first visit. CACHE changes on every build (make_site.sh),
// which drops the old copy and fetches the new version.
const CACHE = "qb-legacy-468f105b6e";
const FILES = ["./", "index.html", "index.js", "engine.gz.wasm", "game.pck.wasm",
  "index.audio.worklet.js", "index.audio.position.worklet.js",
  "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
