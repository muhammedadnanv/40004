const CACHE_NAME = 'dev-mentor-hub-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - handle offline scenarios
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try network first
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then(response => {
            // If we have a cached response, return it
            if (response) {
              return response;
            }
            
            // If it's a navigation request, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // For image requests, return a default image
            if (event.request.destination === 'image') {
              return caches.match('https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp');
            }
            
            // Return offline page as last resort
            return caches.match('/offline.html');
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});