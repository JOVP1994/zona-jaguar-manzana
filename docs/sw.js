/* Service worker de la versión web (iPhone/PWA).
   Primero intenta la red (para recibir actualizaciones al momento) y, sin internet,
   usa la copia guardada. Los datos del club en GitHub no pasan por aquí. */
const CACHE = 'zona-jaguar-v1';
const SHELL = [
  './', 'index.html', 'config.js', 'manifest.webmanifest', 'logo.png', 'logo-sm.png',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'fonts/russo-one.woff2', 'fonts/barlow-400.woff2', 'fonts/barlow-500.woff2', 'fonts/barlow-600.woff2', 'fonts/barlow-700.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
