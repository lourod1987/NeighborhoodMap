console.log('Service Worker');

const cachedFiles = [
    '/',
    '../public/index.html',
    '/index.js',
    '/App.css',
    '/App.js',
    '/Components/Header.js',
    '/Components/Map.js',
    '/Components/Sidebar.js',
    '/Utilities/MapStyle.js',
    '/Utilities/Utils.js',
    '/menu.svg'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('v1.0').then( cache => cache.addAll(cachedFiles))
    );
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then( response => {
            if (response) {
                console.log(`${evt.request} is already in cache`);
                return response;
            } else {
                console.log(`${evt.request} is not found in cache. Fetching now.`);
                return fetch(evt.request)
                    .then( response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        let responseCopy = response.clone();
                        caches.open('v1.0').then( cache => {
                            cache.put(evt.request, responseCopy);
                        });
                        return response;
                    })
                    .catch( error => console.log(error));
            }
        })
    );
});