// QB Legacy service worker: keeps the game on the device so it opens offline
// and fast. Two caches: the engine (big, rarely changes) and the game (small,
// changes with every update), so an update only downloads the game part.
const ENGINE = "qb-engine-36edfd6629";
const GAME = "qb-game-556e1aeb6f";
const ENGINE_FILES = ["index.js", "engine.gz.wasm", "index.audio.worklet.js", "index.audio.position.worklet.js"];
const GAME_FILES = ["./", "index.html", "game.pck.wasm", "manifest.webmanifest",
  "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(Promise.all([
    caches.open(ENGINE).then(async (c) => {
      // only fetch engine files this device doesn't have yet
      for (const f of ENGINE_FILES) {
        if (!(await c.match(f))) await c.add(f);
      }
    }),
    caches.open(GAME).then((c) => c.addAll(GAME_FILES)),
  ]).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== ENGINE && k !== GAME).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
