const CACHE_NAME = "chika_web_app_v1";

const url="https://cdn.jsdelivr.net/gh/meroitachi/chika-donation-alt@main"//"http://localhost:4000"
// URLs to be cached initially
const URLsToCache = [
  `${url}/assets/imgs/icon-192x192.png`,
  `${url}/assets/imgs/icon-512x512.png`,
  `${url}/assets/imgs/7btrrd.mp4`,
];

// File extensions to cache
const CACHE_EXTENSIONS = ['.js', '.css', '.html', '.mp4', '.png'];

// Install event
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching initial files");
      return cache.addAll(URLsToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Removing old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const fileExtension = url.pathname.split('.').pop().toLowerCase();

  // Check if the request is for a file type we want to cache
  if (CACHE_EXTENSIONS.includes(`.${fileExtension}`)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return networkResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            // Optionally, handle failed fetch requests (e.g., return a fallback response)
          });
      })
    );
  } else {
    // For non-cached file types, fetch from network without caching
    event.respondWith(fetch(event.request));
  }
});

// Listen for messages from clients
self.addEventListener("message", (event) => {
  if (event.data.action === "updateCache") {
    clearCacheAndReload();
  }
});

// Function to clear all caches and reload essential resources
function clearCacheAndReload() {
  caches
    .keys()
    .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    })
    .then(() => {
      console.log("Service Worker: All caches cleared");

      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return Promise.allSettled(
            URLsToCache.map((url) => {
              return fetch(url).then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}`);
                }
                return cache.put(url, response);
              });
            })
          );
        })
        .then((results) => {
          const failedRequests = results.filter(
            (result) => result.status === "rejected"
          );
          if (failedRequests.length > 0) {
            console.warn("Some resources failed to cache:", failedRequests);
          } else {
            console.log("Service Worker: re-cached successfully");
          }

          // Notify all clients to reload
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ action: "reloadPage" });
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker: Error during cache update", error);
        });
    });
}