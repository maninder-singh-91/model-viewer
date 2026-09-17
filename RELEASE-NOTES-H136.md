# H136 Model Views Release

Publishes the tested H136 static viewer, including the cumulative stone, diamond,
metal-normal, and model-selection updates since H94.

- Pendant and single-diamond ring are bundled and selectable in the viewport.
- Model-specific settings and closest-zoom limits are retained.
- Save default view and Clear default view are available under Camera.
- Saved camera views restore on model load and Reset view, independently per
  model. The view includes position, target, up vector, FOV, and zoom.
- Saved views live in browser local storage on the current origin. Localhost
  views do not automatically transfer to GitHub Pages or another browser.
- Material controls remain available, including original geometry normals,
  normal repair, flat shading, smoothness, and stone optics controls.

Unlike the H94 production package, this build retains the settings panel and
viewport material selection, matching the H136 local preview.

Validation includes both models, save/reset/reload, changed FOV restoration,
independent clearing, unchanged zoom limits, mobile control layout, corrupt
storage, and unavailable-storage feedback. Checksums cover the runtime assets.

The root index.html and its content-hashed module are the current runtime.
SOURCE/src is historical, not a rebuildable source tree for this release.
