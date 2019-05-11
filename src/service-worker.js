/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
//evitar WARNINGs y demas
// workbox.precaching.suppressWarnings()
//toma el __precacheManifest que son los archivos js, css, index.html, que son los archivos que sirven para correr el app
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})//y los guarda detras de escena como viene haciendo el ServiceWorker
// precacheManifest El método almacena y responde en forma eficiente a solicitudes de URL en el manifiesto.

// // App Shell
// workbox.routing.registerNavigationRoute('/index.html')
//
// // La API usa Stale While Revalidate para mayor velocidad
// workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(),
//  'GET')
//
// // Last fuentes van con Cache First y vencen al mes
// workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
//   workbox.strategies.cacheFirst({
//     cacheName: 'google-fonts-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 30 * 24 * 60 * 60
//       })
//     ]
//   }),
//   'GET')
//
// // Todo lo demás usa Network First
// workbox.routing.registerRoute(/^https?.*/,
//   workbox.strategies.networkFirst(), 'GET')
