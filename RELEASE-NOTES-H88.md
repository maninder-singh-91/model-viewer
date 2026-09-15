# H88 Deployment

This release packages the current quick-controls viewer with the user-exported scene and material defaults, rather than the older V2.19 root bundle.

- Persist the selected closest zoom in production defaults.
- Keep the main settings panel hidden on desktop and mobile, including after mesh selection.
- Default to High viewport resolution; preserve named Medium and Ultra options.
- Match the floating controls' fonts, backgrounds, borders, and alignment.
- Enable metal bevel and retain four diamond ray bounces during navigation.
- Keep the model-name overlay hidden.
- Load the bundled single-diamond model on hosted origins using deployment-relative URLs.
- Cache the release's model, environments, and material swatches for offline reload.

Validation covered exact scene/material equality against the exported JSON, zoom-in clamping and zoom-out, rotation with unchanged bounces, quick material controls, desktop and mobile canvases, hidden settings after selection, non-local hosted-origin/subpath loading, and real service-worker offline reload. These checks are not a new performance benchmark or a promise of a particular frame rate.
