import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful:', registration.scope);
        
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                if (confirm('New content is available! Click OK to update.')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });

  // Handle offline/online status changes
  window.addEventListener('online', () => {
    console.log('Application is online');
  });
  
  window.addEventListener('offline', () => {
    console.log('Application is offline');
  });
}

// Ensure Clerk key is available
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById("root")!).render(
  <App />
);