const CACHE='adaptive-glb-viewer-v2.19-device-resolution-defaults-r150';
const CORE=['./','./index.html','./assets/env-gem-4.exr','./assets/env_metal_001_d01c4504e0.hdr','./assets/models/ring02.glb'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
