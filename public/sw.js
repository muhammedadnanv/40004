const CACHE_NAME = 'dev-mentor-hub-v1';
const OFFLINE_URL = '/offline.html';
const OFFLINE_IMG = 'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  OFFLINE_URL,
  OFFLINE_IMG,
  // Add CSS and JS files
  '/src/index.css',
  '/src/main.tsx',
  // Add other static assets
  'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Pre-caching failed:', error);
      })
  );
  self.skipWaiting();
});

// Fetch event - handle offline scenarios with network-first strategy
self.addEventListener('fetch', event => {
  // Handle navigation requests differently
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Handle other requests with network-first strategy
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
            
            // For image requests, return a default image
            if (event.request.destination === 'image') {
              return caches.match(OFFLINE_IMG);
            }
            
            // For API requests, return a custom response
            if (event.request.url.includes('/api/')) {
              return new Response(
                JSON.stringify({ error: 'You are offline' }),
                {
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            }
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
              console.log('Deleting old cache:', cacheName);
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
    icon: OFFLINE_IMG,
    badge: OFFLINE_IMG,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Programs',
        icon: OFFLINE_IMG
      },
      {
        action: 'close',
        title: 'Close',
        icon: OFFLINE_IMG
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Dev Mentor Hub', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#programs-section')
    );
  }
});

// Handle background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Implement form data sync when online
      Promise.resolve()
    );
  }
});

// Handle periodic sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-content') {
    event.waitUntil(
      // Implement periodic content updates
      Promise.resolve()
    );
  }
});