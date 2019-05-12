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

// App Shell
//registerNavigationRoute, si se tiene algo cacheado en el serviceWorker lo va a respetar, si encuentra una url que no
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html") //conoce, en vez de dar error va a buscar la url indicada (/index.html)
);

// Estrategia Stale While Revalidate:
// Last fuentes van con Cache First y vencen al mes
// ES conveniente ser los mas especificos posible cuando se registra una ruta
workbox.routing.registerRoute(/^https:\/\/www.themealdb.com\/api\/(.*)/, //\/\/ indica que es una url
//mealdb tiene varias carpetas para servir diferentes tipos de assets. Aqui se selecciono la carpeta api
//que retorna un json

// Como las recetas no suelen ser actualizadas con el tiempo, se puede aplicar esta estrategia
new workbox.strategies.StaleWhileRevalidate(),
'GET' //solo para metodos get
);

// Para las fuemtes, puesto que estas no cambian nunca
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, // gstatic es otro de los dominios de google
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60 //24 horas
      }),
    ],
  }),
  'GET'
)

// Esta es por defecto, por lo que va al final de todo
// La API usa Stale While Revalidate para mayor velocidad
//para indicarle que debe lidiar con cosas que estan fuera del dominio
                          //queremos esta regla para todas las urls que empiencen con http o https
workbox.routing.registerRoute(/^https?.*/, new workbox.strategies.NetworkFirst(),'GET'); //metodo que queremos cachear ('get')


// Para que googleAnalytics funcione offline
workbox.googleAnalytics.initialize()


// -- Reto --
// Imagenes con cache First
workbox.routing.registerRoute(/^https:\/\/www.themealdb.com\/images\/(.*)/, //aqui se selecciono la carpeta de imagenes
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60,
        maxEntries: 20
      }),
    ],
  })
)
