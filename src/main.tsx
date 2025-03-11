
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { addResourceHints } from './utils/performanceOptimizer';

// Add resource hints for faster loading
if (typeof window !== 'undefined') {
  addResourceHints();
}

// Register Service Worker with better error handling and updates
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

// Create root with error boundary
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");
  
  createRoot(rootElement).render(
    <App />
  );
} catch (error) {
  console.error('Error rendering application:', error);
  // Show fallback UI if rendering fails
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    `;
  }
}
