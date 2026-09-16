# H94 Production Release

Based on the validated Diamond Traversal H94 preview. The production shader is
byte-identical to that preview; deployment hides the main settings panel and its
toggle on desktop and mobile, including after mesh selection.

- H90 constant-width BVH/triangle texture addressing.
- H92 same-facet internal diamond edge antialiasing and zero rotation inertia.
- H93 diamond-only Medium/High/Ultra sampling, with High default. The viewport,
  metal and main postprocessing remain native-resolution at every preset.
- H94 guarded small-diamond traversal allocation and deferred hit-normal work.
  Large combined-stone BVHs retain the established shader path.
- Existing saved zoom cap, metal bevel, material presets and four diamond
  bounces are preserved. Rotation and zoom do not lower the selected bounces.
- Quality, quick materials, Stats, Reset view and Open model remain available.

No H95 experiments, aggressive H91 lab modes, larger BVH leaves or split-pass
experiments are included. This release does not promise 120 Hz, measured energy
savings or universal performance gains. Native metal makes Medium/High more
expensive than the former whole-viewport-downscaled presets in some scenes.
Diamond antialiasing may soften small highlights; fallback conditions preserve
native tracing, and not every jagged or shimmering optical edge is eliminated.

The export schema stores native resolution separately from diamond quality.
Legacy settings map their resolution to diamond quality; older releases may
reject settings exported with the new diamondQuality field.
