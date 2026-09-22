# H176 Optical Memory Production Release

Publishes the validated H176 runtime with Pendant and Single ring as the only
bundled models. Test models are excluded; local file import remains available.
Production settings and their toggles remain hidden on desktop and mobile.
The previously published camera view and model zoom limits are retained.

## Rendering and Memory

- Read optical beauty/fire/outer images from existing render attachments instead
  of allocating and copying a duplicate three-image atlas.
- Store identical reflection-material records once per triangle, retaining full
  Float32 bevel and stone IDs. Incompatible records retain their original layout.
- Allocate the built-in decor HDRI only when selected, and release it when unused.
- Retain full Ultra gem resolution, bloom, depth precision and optical detail.
- Include validated post-H164 startup, stone-switch, background, AO-depth,
  stone-energy, edge, reflection, surface-consistency and per-model settings work.

Matched local Ultra pendant tests at a 1600 x 1102 drawing buffer measured tracked
GPU allocations of 620 -> 572 MB at normal distance and 653 -> 572 MB at extreme
close range. Frame times improved about 3%. Ring allocations fell from 508/537 MB
at normal/close range to 468 MB. These are allocation estimates, not physical VRAM
measurements or guarantees across devices. Neither 150 MB nor 60 FPS is achieved.

The first selection of the previously unused decor environment now incurs its
load/conversion delay. No intentional gemstone-quality reduction was introduced.

The preview passed ring/pendant rendering, desktop/mobile, orbit, presets,
environment lifecycle, reflection fallback and saved-settings regression tests.
The packaged production build also passed desktop/mobile rendering, hidden
settings, model switching, published camera view, Reset view, reload and stale
camera-storage isolation checks. All files in SHA256.txt verified successfully.
The production packager regenerates the runtime hash, service-worker cache and
SHA256 manifest. Browser-local editor saves do not publish themselves to GitHub.
Historical SOURCE/src files are not the current runtime.
