// Advanced Service Worker for Algorithm Visualizer Pro
// Features: Caching, Offline Support, Background Sync, Push Notifications

const CACHE_NAME = 'algoviz-v1.0.0';
const RUNTIME_CACHE = 'algoviz-runtime';
const STATIC_CACHE = 'algoviz-static';
const API_CACHE = 'algoviz-api';

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/placeholder.svg',
  '/offline.html' // Offline fallback page
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/.*\.supabase\.co\/rest\/v1\//,
  /^https:\/\/api\.github\.com\//,
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_ASSETS);
        console.log('[SW] Static assets cached successfully');
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('[SW] Failed to cache static assets:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    (async () => {
      try {
        // Take control of all clients immediately
        await self.clients.claim();
        
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name !== CACHE_NAME && 
          name !== RUNTIME_CACHE && 
          name !== STATIC_CACHE && 
          name !== API_CACHE
        );
        
        await Promise.all(
          oldCaches.map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
        );
        
        console.log('[SW] Service worker activated successfully');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - implement advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Network First for API calls
    if (isAPIRequest(url)) {
      return await networkFirstStrategy(request, API_CACHE);
    }
    
    // Strategy 2: Cache First for static assets
    if (isStaticAsset(url)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }
    
    // Strategy 3: Stale While Revalidate for pages and dynamic content
    return await staleWhileRevalidateStrategy(request, RUNTIME_CACHE);
    
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return await cache.match('/offline.html') || 
             new Response('Offline - Please check your internet connection', {
               status: 503,
               statusText: 'Service Unavailable'
             });
    }
    
    // Return generic offline response
    return new Response('Resource unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First Strategy - for API calls
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    // Try network first
    const networkResponse = await fetch(request.clone());
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache if network fails
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving API response from cache:', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, fetch from network and cache
  const networkResponse = await fetch(request);
  if (networkResponse.status === 200) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Stale While Revalidate Strategy - for pages
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  // Get from cache immediately
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);
  
  // Return cached version immediately, or wait for network
  return cachedResponse || await fetchPromise;
}

// Helper functions
function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/);
}

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'progress-sync') {
    event.waitUntil(syncProgressData());
  } else if (event.tag === 'submission-sync') {
    event.waitUntil(syncSubmissionData());
  }
});

async function syncProgressData() {
  try {
    // Get stored progress data from IndexedDB
    const progressData = await getStoredProgressData();
    
    if (progressData && progressData.length > 0) {
      // Send to server
      const response = await fetch('/api/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      
      if (response.ok) {
        // Clear stored data after successful sync
        await clearStoredProgressData();
        console.log('[SW] Progress data synced successfully');
        
        // Notify clients
        notifyClients({ type: 'PROGRESS_SYNCED' });
      }
    }
  } catch (error) {
    console.error('[SW] Progress sync failed:', error);
  }
}

async function syncSubmissionData() {
  try {
    const submissionData = await getStoredSubmissionData();
    
    if (submissionData && submissionData.length > 0) {
      const response = await fetch('/api/sync-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (response.ok) {
        await clearStoredSubmissionData();
        console.log('[SW] Submission data synced successfully');
        
        notifyClients({ type: 'SUBMISSIONS_SYNCED' });
      }
    }
  } catch (error) {
    console.error('[SW] Submission sync failed:', error);
  }
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    title: 'Algorithm Visualizer Pro',
    body: 'You have new learning content available!',
    icon: '/placeholder.svg',
    badge: '/placeholder.svg',
    tag: 'algoviz-notification',
    data: {
      url: '/dashboard'
    },
    actions: [
      {
        action: 'view',
        title: 'View Dashboard',
        icon: '/placeholder.svg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    requireInteraction: false,
    silent: false
  };
  
  if (event.data) {
    try {
      const payload = event.data.json();
      Object.assign(options, payload);
    } catch (error) {
      console.error('[SW] Invalid push payload:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.notification.tag);
  
  event.notification.close();
  
  const { action, data } = event;
  const targetUrl = data?.url || '/dashboard';
  
  if (action === 'dismiss') {
    return;
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window if not already open
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Message handling for client communication
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
      
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload.urls));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearCache(payload.cacheName));
      break;
      
    default:
      console.warn('[SW] Unknown message type:', type);
  }
});

// Utility functions for message handling
async function cacheUrls(urls) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.addAll(urls);
    notifyClients({ type: 'URLS_CACHED', urls });
  } catch (error) {
    console.error('[SW] Failed to cache URLs:', error);
  }
}

async function clearCache(cacheName) {
  try {
    await caches.delete(cacheName);
    notifyClients({ type: 'CACHE_CLEARED', cacheName });
  } catch (error) {
    console.error('[SW] Failed to clear cache:', error);
  }
}

// Notify all clients
function notifyClients(message) {
  clients.matchAll().then(clientList => {
    clientList.forEach(client => {
      client.postMessage(message);
    });
  });
}

// IndexedDB helper functions (simplified)
async function getStoredProgressData() {
  // Implementation would use IndexedDB to retrieve stored progress data
  return [];
}

async function clearStoredProgressData() {
  // Implementation would clear progress data from IndexedDB
}

async function getStoredSubmissionData() {
  // Implementation would use IndexedDB to retrieve stored submission data
  return [];
}

async function clearStoredSubmissionData() {
  // Implementation would clear submission data from IndexedDB
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker script loaded successfully');