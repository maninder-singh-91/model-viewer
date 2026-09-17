# Deployment

The repository root is the static H136 release. Serve `index.html` over HTTP or HTTPS with its `assets` directory beside it. No Node build step is required on the host. Model and environment URLs support a repository subpath such as `/model-viewer/`.

## Defaults

- The pendant loads automatically. The top-left model selector switches between Pendant and Single ring (`ring02.glb`). Direct links can use `?model=verdant` or `?model=ring`.
- Pendant scene and material settings are recorded in `viewer-settings.json` and `SOURCE/releases/h136-pendant-settings.json`. Ring defaults are embedded in the viewer module.
- High diamond quality is selected initially; the floating selector retains Medium, High, and Ultra. It adjusts only diamond optical sampling. The viewport and metal remain native-resolution at every preset.
- Always hide the settings panel and its toggle in deployed builds, on desktop and mobile. The local editor preview retains its editing controls.
- The pendant uses Rose Gold for the gold parts and Platinum for the silver parts. Its green stone uses #00db9a and clarity 1.
- Camera FOV is 20, smooth navigation is enabled, rotation inertia is 0, and zoom acceleration is 2.5.
- The ring closest-zoom ratio is 1.0601555395234405; the pendant ratio is 0.6798879125813274. They are active from startup and preserve zoom-out. The minimum distance scales with model bounds and the responsive camera fit.
- Small pendant diamonds use three internal ray bounces. Adaptive interaction quality is disabled.
- The pendant camera view saved in the local editor is embedded in the deployed build. Loading the pendant or clicking Reset view restores it for every visitor. The ring retains its existing default framing because no custom ring view was saved.
- Published views are recorded by model SHA-256 in `SOURCE/releases/h136-default-views.json`. Production uses these embedded values, not visitor local storage. Existing zoom limits remain active.
- The model-name overlay is hidden. Quick materials, quality, Stats, Reset view, and Open model remain available.

`Adaptive-GLB-Viewer-V2.19.html` redirects to the current entry point. Historical `SOURCE/src` files are retained for reference and are not the H136 entry point. See `RELEASE-NOTES-H136.md` for this release.

## Packaging Policy

Use `node SOURCE/releases/package-production.mjs /absolute/path/to/validated/H136-preview` to package the editor preview for deployment. Do not copy the preview directly over the repository root. The packager always hides settings and embeds the published views, then regenerates the content hash, service-worker cache, and checksums. After using Save default view in the local editor, update `h136-default-views.json` with the saved view before packaging. Browser-local saves alone do not update the hosted build.

## Hosting

For GitHub Pages, select the repository root as the publishing directory. Other static hosts can also serve the root directly. Keep all files listed in `SHA256.txt`; verify them with `shasum -a 256 -c SHA256.txt`.

Serve HTML and `service-worker.js` with revalidation. The content-hashed viewer module can be cached immutably. The service worker is scoped to the deployment path and caches the bundled model, environments, and quick-control images. Imported local files are not uploaded or included in this cache.

Use HTTP for local testing rather than opening `index.html` as a file. Offline reload is available after the first successful service-worker installation. A Git push updates repository contents; the configured hosting provider determines when those contents become public.
