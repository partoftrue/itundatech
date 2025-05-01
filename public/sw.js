// This is the service worker with the combined offline experience and push notifications

const CACHE = "itundatech-offline-v1"

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["/offline", "/logo.png", "/favicon.ico"])))
})

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If request was successful, add result to cache
        event.waitUntil(updateCache(event.request, response.clone()))
        return response
      })
      .catch((error) => {
        // If network request failed, try to get it from cache
        return fromCache(event.request).then(
          (response) => {
            // Return cached response
            return response
          },
          () => {
            // If there is no cache, redirect to offline page
            if (event.request.headers.get("Accept").includes("text/html")) {
              return caches.match("/offline")
            }
          },
        )
      }),
  )
})

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) => {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match")
      }
      return matching
    }),
  )
}

function updateCache(request, response) {
  return caches.open(CACHE).then((cache) => cache.put(request, response))
}

// Store received notifications
let notifications = []

// Listen to push events for push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    // Parse the notification data
    const data = event.data.json()

    // Store the notification
    notifications.push({
      ...data,
      timestamp: data.timestamp || Date.now(),
    })

    // Limit stored notifications to prevent memory issues
    if (notifications.length > 50) {
      notifications = notifications.slice(-50)
    }

    // Create notification options
    const options = {
      body: data.body,
      icon: data.icon || "/app-icon-light-192.png",
      badge: data.badge || "/favicon-32x32.png",
      vibrate: [100, 50, 100],
      data: {
        url: data.url || "/",
        timestamp: data.timestamp || Date.now(),
        category: data.category || "general",
      },
      tag: data.tag || "default", // Use tag to group similar notifications
      actions: [
        {
          action: "view",
          title: "View",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    }

    // Show the notification
    event.waitUntil(
      self.registration.showNotification(data.title, options).then(() => {
        // Notify any open clients about the new notification
        return self.clients.matchAll({ type: "window" }).then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: "PUSH_NOTIFICATION",
              notification: data,
            })
          })
        })
      }),
    )
  }
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  const notification = event.notification
  const action = event.action
  const url = notification.data.url || "/"

  notification.close()

  if (action === "close") {
    return
  }

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus()
        }
      }

      // If no open client found, open a new window/tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(url)
      }
    }),
  )
})

// Handle notification close
self.addEventListener("notificationclose", (event) => {
  // You could log analytics data here if needed
  console.log("Notification closed", event.notification.data)
})

// Listen for messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "GET_NOTIFICATIONS") {
    // Send stored notifications to the client
    event.ports[0].postMessage({
      notifications,
    })
  }
})
