
const CACHE_NAME = 'dev-mentor-hub-v2';
const OFFLINE_URL = '/offline.html';
const OFFLINE_IMG = 'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp';
const ALBATO_IMG = 'https://d2gdx5nv84sdx2.cloudfront.net/uploads/k8rbl7fp/marketing_asset/banner/13697/7_Albato_vs._Zapier_-_purple.png';

// Enhanced cache strategy with versioning
const STATIC_CACHE = `${CACHE_NAME}-static-v2`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic-v2`;
const API_CACHE = `${CACHE_NAME}-api-v2`;
const IMG_CACHE = `${CACHE_NAME}-images-v2`;

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  OFFLINE_URL,
  OFFLINE_IMG,
  // CSS and JS files
  '/src/index.css',
  '/src/main.tsx',
  // Static assets
  'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap'
];

// Optimized install event with separate caches for different content types
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE)
        .then(cache => {
          console.log('Pre-caching static assets');
          return cache.addAll(urlsToCache);
        }),
      caches.open(IMG_CACHE)
        .then(cache => {
          console.log('Pre-caching image assets');
          return cache.addAll([OFFLINE_IMG, ALBATO_IMG]);
        })
    ])
    .then(() => {
      console.log('All caches initialized');
      return self.skipWaiting();
    })
    .catch(error => {
      console.error('Pre-caching failed:', error);
    })
  );
});

// Enhanced activate event with smarter cache cleanup
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete any cache that doesn't match our current versioning
            if (
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== API_CACHE && 
              cacheName !== IMG_CACHE
            ) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service worker activated and caches cleaned');
        return self.clients.claim();
      })
  );
});

// Advanced fetch event with different strategies for different content types
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle navigation requests - Network First with Offline Fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone and cache the navigation response
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // For API requests - Network First with Cache Fallback + Custom Error
  if (url.pathname.includes('/api/') || url.pathname.includes('/functions/v1/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Only cache successful API responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(API_CACHE).then(cache => {
              // Set expiry to 5 minutes for API responses
              const headers = new Headers(responseClone.headers);
              headers.append('sw-cache-timestamp', Date.now().toString());
              headers.append('sw-cache-expiry', (Date.now() + 5 * 60 * 1000).toString());
              
              const cachedResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });
              
              cache.put(event.request, cachedResponse);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          
          if (cachedResponse) {
            // Check if the cached response is still valid
            const timestamp = cachedResponse.headers.get('sw-cache-timestamp');
            const expiry = cachedResponse.headers.get('sw-cache-expiry');
            
            if (timestamp && expiry && parseInt(expiry) > Date.now()) {
              return cachedResponse;
            }
          }
          
          // Return custom offline response for API
          return new Response(
            JSON.stringify({ 
              error: 'You are offline', 
              offline: true,
              timestamp: Date.now() 
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }
  
  // For images - Cache First with Network Fallback
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(IMG_CACHE).then(cache => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => {
              // If the image is not found and offline, return default image
              return caches.match(OFFLINE_IMG);
            });
        })
    );
    return;
  }
  
  // For static assets (CSS, JS) - Cache First with Network Update
  if (
    event.request.destination === 'style' || 
    event.request.destination === 'script' || 
    event.request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response immediately
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update cache in the background
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });
              return networkResponse;
            })
            .catch(() => {
              console.log('Failed to update cache for:', event.request.url);
            });
          
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // Default strategy - Network First with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Enhanced push notification handling for Dev Mentor Hub
self.addEventListener('push', event => {
  let notificationData = {
    title: 'Dev Mentor Hub',
    body: 'You have a new notification',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'notification',
    data: { url: '/' }
  };

  // Parse push data if available
  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = {
        title: pushData.title || notificationData.title,
        body: pushData.body || notificationData.body,
        icon: pushData.icon || notificationData.icon,
        badge: pushData.badge || notificationData.badge,
        tag: pushData.tag || pushData.data?.tag || notificationData.tag,
        data: {
          url: pushData.data?.url || pushData.url || '/',
          ...pushData.data
        }
      };
    } catch (e) {
      // If not JSON, use as text
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      ...notificationData.data
    },
    actions: [
      {
        action: 'open',
        title: 'View',
        icon: '/logo.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/logo.png'
      }
    ],
    tag: notificationData.tag,
    requireInteraction: false,
    renotify: true
  };

  // Track notification analytics
  console.log('Push notification received:', {
    event: 'notification_displayed',
    timestamp: Date.now(),
    title: notificationData.title,
    tag: notificationData.tag
  });

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Enhanced notification click handling
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  notification.close();

  // Track notification interaction
  console.log('Notification interaction:', {
    event: 'notification_clicked',
    timestamp: Date.now(),
    action: event.action || 'default',
    tag: notification.tag,
    url: notification.data?.url
  });

  // Handle actions
  if (event.action === 'close') {
    return; // Just close the notification
  }

  // Default action or 'open' action - open the URL
  const urlToOpen = notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        // Check if there's already a window open
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // If no window is open, open a new one
        return clients.openWindow(urlToOpen);
      })
  );
});

// Improved sync event handling with error recovery
self.addEventListener('sync', event => {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      syncFormData()
        .catch(error => {
          console.error('Form sync failed, will retry later:', error);
          // Store the error for diagnostics
          localStorage.setItem('lastSyncError', JSON.stringify({
            message: error.message,
            timestamp: Date.now()
          }));
          return Promise.reject(error); // Ensure sync will be retried
        })
    );
  }
});

// Mock function for form data sync
async function syncFormData() {
  // In a real implementation, this would send cached form data to the server
  console.log('Syncing stored form data with server');
  const formDataList = JSON.parse(localStorage.getItem('offlineFormData') || '[]');
  
  if (formDataList.length === 0) {
    console.log('No offline form data to sync');
    return;
  }
  
  console.log(`Found ${formDataList.length} forms to sync`);
  
  // Process in batches for efficiency
  const batchSize = 5;
  for (let i = 0; i < formDataList.length; i += batchSize) {
    const batch = formDataList.slice(i, i + batchSize);
    
    // Process each form in the batch
    await Promise.all(batch.map(async (formData) => {
      try {
        // Mock server submission
        console.log('Syncing form:', formData.id);
        // Success - remove from storage
        return formData.id;
      } catch (error) {
        console.error('Failed to sync form:', formData.id, error);
        throw error;
      }
    }));
  }
  
  console.log('Form sync completed successfully');
  localStorage.removeItem('offlineFormData');
}

// Improved periodic sync with better handling
self.addEventListener('periodicsync', event => {
  console.log('Periodic sync event:', event.tag);
  
  if (event.tag === 'update-content') {
    event.waitUntil(
      updateContent()
        .catch(error => {
          console.error('Periodic content update failed:', error);
        })
    );
  }
});

// Mock function for content updates
async function updateContent() {
  console.log('Performing periodic content update');
  
  try {
    // Update caches based on content changes
    const response = await fetch('/api/content-manifest.json', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content manifest');
    }
    
    console.log('Content update completed successfully');
    return true;
  } catch (error) {
    console.error('Content update error:', error);
    return false;
  }
}

// New: Implement a message handler for cache control
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'clearCache') {
    console.log('Received cache clear command');
    
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.filter(name => name.startsWith(CACHE_NAME))
              .map(name => caches.delete(name))
          );
        })
        .then(() => {
          console.log('Caches cleared successfully');
          // Notify client that cache was cleared
          event.source.postMessage({
            action: 'cacheCleared',
            status: 'success',
            timestamp: Date.now()
          });
        })
        .catch(error => {
          console.error('Cache clear failed:', error);
          // Notify client of the error
          event.source.postMessage({
            action: 'cacheCleared',
            status: 'error',
            error: error.message,
            timestamp: Date.now()
          });
        })
    );
  }
});
