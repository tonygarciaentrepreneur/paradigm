/* Paradigm service worker: offline app shell. Bump VERSION when you change files. */
const VERSION = 'paradigm-v1.4.2';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192-v2.png', 'icon-512-v2.png', 'icon-maskable-v2.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Never cache Google APIs or sign-in.
  if (/googleapis\.com$|accounts\.google\.com$/.test(url.hostname) && url.hostname !== 'fonts.googleapis.com') return;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return;
  // Network first (so updates arrive), cache fallback (so it works offline).
  // Same-origin files always revalidate with GitHub instead of trusting the 10-minute browser cache.
  const net = url.origin === location.origin ? fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(e.request);
  e.respondWith(
    net.then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
