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
  self.skipWaiting();
});

// Fetch event - handle offline scenarios with network-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before using it
        const responseClone = response.clone();
        
        // Open cache and store the new response
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          });

        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then(response => {
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
  // Immediately claim any new clients
  self.clients.claim();
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: 'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp',
    badge: 'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp',
    vibrate: [100, 50, 100]
  };

  event.waitUntil(
    self.registration.showNotification('Dev Mentor Hub', options)
  );
});