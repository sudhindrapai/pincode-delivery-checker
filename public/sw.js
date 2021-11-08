self.addEventListener('install',function (event) {
    console.log("installig service worker...", event);
});

self.addEventListener('activate',function (event) {
    console.log("service worker in activated .....",event);
    // return self.cliens.claim();
});

self.addEventListener('fetch',function (event) {
    console.log("featching something...", event);
    event.respondWith(fetch(event.request));
});

