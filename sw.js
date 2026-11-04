// Кэш-форева для статики (иконки/шрифты, S3+CDN) - без этого тот же экран,
// открытый повторно (например вкладка "Мой VPN"), заново бьёт в сеть за уже
// виденными картинками, даже если бы сам CDN отдавал короткий Cache-Control.
// Здесь кэш не смотрит на заголовки вообще: раз файл уже есть в Cache Storage -
// новый сетевой запрос не идёт никогда, пока не сменится CACHE_NAME.
//
// Сайт (index.html, /assets/*.js и *.css) и статика живут на одном origin
// (vexus.my), поэтому фильтр - по ПУТИ, а не по домену: иначе сюда попал бы и
// сам index.html/бандл, и пользователь застревал бы на старой версии сайта
// после деплоя. /assets/* сюда не включён и так уже кэшируется навсегда
// обычным HTTP-кэшем (имя файла меняется по хешу содержимого).
const CACHE_NAME = 'vexus-static-v1'
const STATIC_PATH_PREFIXES = ['/icons/', '/fonts/']
const STATIC_PATH_EXACT = ['/favicon.svg', '/tg-webapp.js']

function isStaticAsset(url) {
  let path
  try {
    path = new URL(url).pathname
  } catch {
    return false
  }
  return STATIC_PATH_EXACT.includes(path) || STATIC_PATH_PREFIXES.some((p) => path.startsWith(p))
}

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || !isStaticAsset(request.url)) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)
      if (cached) return cached
      try {
        const response = await fetch(request)
        cache.put(request, response.clone())
        return response
      } catch (err) {
        return cached || Promise.reject(err)
      }
    })
  )
})
