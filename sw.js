self.addEventListener('install', function(evt) {
    var urlsToCache = [
        '/',
        '/index.html',
        '/restaurant.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
    ];

    evt.waitUntil(
       
        caches.open('urls').then(function(cache) {
            cache.addAll(urlsToCache);
        })
        
    );

});

self.addEventListener('fetch', function(evt) {
    
    evt.respondWith(
        caches.match(evt.request).then(function(response) {
            if(response) return response;
            return fetch(evt.request);
        })
    );

});