console.warn("Service worker from the public folder");

const cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then(async (cache) => {
      try {
        const urlsToCache = [
          "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/favicon.ico",
                "/static/media/giff.e424449bf49b7f12aa5e.gif",
                "/static/media/mee.b37865eba4f029f45094.png",
                "/static/media/signature.f2f18b838ac6ad9302b1.png",
                "/static/media/Huawei.8e43ab9dca76b780518b.png",
                "/static/media/AIClub.38c764b74fc8e30fc06d.png",
                "/assets/images/deep%20blue.jpg",
                "/static/media/p1.c40ab378f9da90caf31c.PNG",
                "/static/media/p3.fd8e0abfd632e46fc348.jfif",
                "/static/media/p4.54680e605f4a1f95e75a.PNG",
                "/static/media/p5.90d2c377a56d0ce0c7fb.jpg",
                "/static/media/p6.b3563c96aa6d65b6345a.jpg",
                "/static/media/p7.e75632b66ceb601d8b6e.png",
                "/static/media/p8.6c58c5811dba6a8d3094.png",
                "/static/media/NETFLIX-homepage-1140x570.9239386d9024605dd3c1.png",
                "/fonts.googleapis.com/css2?family=Bricolage+Grotesque&family=Dancing+Script:wght@500&family=Fasthand&family=Lato&family=Poppins:wght@300;400;600&family=Ubuntu:ital,wght@0,500;1,400&family=Vina+Sans&family=Ysabeau+SC:wght@200&display=swap",
                "/fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap",
                "/fonts.googleapis.com/css2?&family=Secular+One&display=swap",
                "/fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
                "/cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
                "/cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
                "/index.html",
                "/",
            ];

        await cache.addAll(urlsToCache);
        console.log("Cache.addAll succeeded");
      } catch (error) {
        console.error("Cache.addAll failed:", error);
      }
    })
  );
});

this.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
  
    if (url.origin !== location.origin) {
      return;
    }
  
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
        })
      );
      return;
    }
  
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
  
        return fetch(event.request.clone()).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
  
          const responseToCache = response.clone();
          caches.open(cacheData).then((cache) => {
            cache.put(event.request, responseToCache).catch((error) => {
              console.error("Cache.put failed:", error);
            });
          });
  
          return response;
        }).catch((error) => {
          console.error("Fetch failed:", error);
          throw error;
        });
      })
    );
  });
  