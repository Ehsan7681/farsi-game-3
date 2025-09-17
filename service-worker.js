const CACHE_NAME = 'alfaba-v1.0'; // نسخه کش - با هر تغییر در فایل‌ها افزایش دهید
// لیست فایل‌هایی که باید کش شوند (فقط فایل‌های استاتیک اولیه)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // CSS & JS (اگر جدا کرده باشید)
  // '/styles.css',
  // '/app.js',
  // تصاویر
  '/images/water.png',
  '/images/father.png',
  '/images/sun.png',
  '/images/back_arrow.png',
  '/images/star.png',
  '/images/hat.png',
  '/images/speaker.png',
  '/images/build_word.png',
  '/images/find_word.png',
  '/images/read_aloud.png',
  '/images/play.png',
  '/images/lock.png',
  // آیکون‌ها
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // فونت (اگر محلی ذخیره کرده باشید - در غیر این صورت حذف کنید)
  // 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap',
  // 'https://fonts.gstatic.com/s/vazirmatn/v18/nwihuxZLVrN25dK5bw59s7g7A60.woff2'
  // فایل‌های صوتی دمو (فقط 5 درس اول - در صورت تمایل می‌توانید همه را اضافه کنید)
  // '/sounds/آب.mp3',
  // '/sounds/بابا.mp3',
  // ... سایر فایل‌های صوتی دمو
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});