# Deployment

The repository root is the static H94 production release. Serve `index.html` over HTTP or HTTPS with its `assets` directory beside it. No Node build step is required on the host. Model and environment URLs support a repository subpath such as `/model-viewer/`.

## Defaults

- The single-diamond `ring02.glb` loads automatically on hosted sites and localhost.
- The exact scene and material settings are recorded in `SOURCE/releases/h94-settings.json`.
- High diamond quality is selected initially; the floating selector retains Medium, High, and Ultra. It adjusts only diamond optical sampling. The viewport and metal remain native-resolution at every preset.
- The main settings panel and its toggle are hidden on desktop and mobile. Selecting a mesh does not reveal them.
- Metal bevel is enabled at width 0.18 and strength 0.55.
- Camera FOV is 20, smooth navigation is enabled, rotation inertia is 0, and zoom acceleration is 2.5.
- The captured closest-zoom ratio is 1.0601555395234405. It is active from startup and preserves zoom-out. The minimum distance scales with model bounds and the existing responsive camera fit.
- Diamond ray depth stays at four bounces during rotation and zoom. Adaptive interaction quality is disabled.
- The model-name overlay is hidden. Quick materials, quality, Stats, Reset view, and Open model remain available.

`Adaptive-GLB-Viewer-V2.19.html` redirects to the current entry point. Historical `SOURCE/src` files are retained for reference and are not the H94 production entry point. See `RELEASE-NOTES-H94.md` for the retained optimizations and limitations. H95 experiments are excluded.

## Hosting

For GitHub Pages, select the repository root as the publishing directory. Other static hosts can also serve the root directly. Keep all files listed in `SHA256.txt`; verify them with `shasum -a 256 -c SHA256.txt`.

Serve HTML and `service-worker.js` with revalidation. The content-hashed viewer module can be cached immutably. The service worker is scoped to the deployment path and caches the bundled model, environments, and quick-control images. Imported local files are not uploaded or included in this cache.

Use HTTP for local testing rather than opening `index.html` as a file. Offline reload is available after the first successful service-worker installation. A Git push updates repository contents; the configured hosting provider determines when those contents become public.
