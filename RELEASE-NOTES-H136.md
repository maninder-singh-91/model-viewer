# H136 Model Views Release

Publishes the tested H136 static viewer, including the cumulative stone, diamond,
metal-normal, and model-selection updates since H94.

- Pendant and single-diamond ring are bundled and selectable in the viewport.
- Model-specific settings and closest-zoom limits are retained.
- Save default view and Clear default view remain available in the local editor.
- Saved camera views restore on model load and Reset view, independently per
  model. The view includes position, target, up vector, FOV, and zoom.
- The saved pendant view is embedded for all visitors. The ring retains its
  existing framing; no custom ring view was saved. Published defaults do not
  depend on visitor browser storage.
- Material editing controls remain in the editor, including original geometry
  normals, normal repair, flat shading, smoothness, and stone optics controls.

The deployed settings panel and its toggle are always hidden on desktop and
mobile. Model selection, orbit, zoom, presets, Stats, and Reset view remain.
Use SOURCE/releases/package-production.mjs instead of copying preview files
directly into a release.

Validation includes both models, save/reset/reload, changed FOV restoration,
independent clearing, unchanged zoom limits, mobile control layout, corrupt
storage, and unavailable-storage feedback. Checksums cover the runtime assets.

The root index.html and its content-hashed module are the current runtime.
SOURCE/src is historical, not a rebuildable source tree for this release.
