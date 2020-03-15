const urlsToCache = [
    'https://res.cloudinary.com/dkb1nvu7q/image/upload/v1582885486/grid.png',
    'http://127.0.0.1:5500/index.html',
    'http://127.0.0.1:5500/index.js'
];

self.addEventListener('install', event => {
    console.log("Installing....");
    for (let i = 0; i < urlsToCache.length; i += 1) {
        event.waitUntil(
            caches.open('static-v2').then(cache => cache.add(urlsToCache[i]))
        );
    }
    console.log("Installing Finished");
});

self.addEventListener('activate', event => {
    console.log('Activating....');

    console.log('Service worker now active');
});

self.addEventListener('fetch', event => {
    console.log("Received fetch request");
    console.log(event);
    const url = new URL(event.request.url);
    const index = urlsToCache.indexOf(url.href);
    if (index !== -1) {
        console.log("Found the URL in cache!!!")
        console.log(caches.match(url.href));
        event.respondWith(caches.match(url.href));
    }
});