# Deployment

Upload the contents of this folder to your web host and serve `index.html` over HTTP/HTTPS. Keep the `assets` folder beside `index.html`; it contains the default Metal HDRI and the `ring02.glb` development model. The original Diamond HDRI is embedded in the viewer.

The Jewellery preset starts with the settings captured from the live `ring02.glb` development viewport.

For local testing, `index.html` can be opened directly with `file://`; PWA/service-worker registration is intentionally skipped in that mode.

For GitHub Pages, keep `index.html`, `manifest.webmanifest`, and `service-worker.js` at the repository root (or configure the Pages root accordingly).
