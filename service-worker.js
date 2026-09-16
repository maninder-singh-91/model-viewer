
const PREFIX='j-viewer-'+self.registration.scope+'-';
const CACHE=PREFIX+'release-h94-ce7671bc799b';
const CORE=["./","./index.html","./manifest.webmanifest","./assets/viewer-46ee68e7ecfe.js","./assets/env-gem-4.exr","./assets/env_metal_001_d01c4504e0.hdr","./assets/preset-material-sphere.png","./assets/preset-gem-diamond.png","./assets/models/ring02.glb"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url),base=new URL(self.registration.scope);
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match('./index.html'))));return;
  }
  if(!CORE.some(file=>new URL(file,base).href===url.href))return;
  event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request).then(hit=>hit||fetch(event.request))));
});
