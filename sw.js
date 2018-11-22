// on install add assets to cache
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
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
        // how to add map tiles?
    ];

    evt.waitUntil(
       
        caches.open('assets').then(function(cache) {
            cache.addAll(urlsToCache);
        })
        
    );

});

// capture fetch events
self.addEventListener('fetch', function(evt) {
    
    //call respond with and return cached assets if they match
    evt.respondWith(
        caches.match(evt.request).then(function(response) {
            if(response) {
                return response;
            }

            // if they dont match we want to try and fetch the live asset and capture and cache the response
            // in both the request a response we need to clone it as they can only be consumed once and we dont want to stop the browswer getting the response. 
            var fetchRequest = evt.request.clone();
  
            return fetch(fetchRequest).then(function(response) {

                // Check if we received a valid response and if not just return the response becuase there is nothing to cache
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
  
                // if we get a valid response, clone it, cache it and return it
                var responseToCache = response.clone();
  
                caches.open('assets').then(function(cache) {
                    cache.put(evt.request, responseToCache);
                });
  
                return response;
            });

        })
    );

});