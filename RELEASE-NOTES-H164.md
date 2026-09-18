# H164 Shared Diamonds Production Release

Publishes the validated H164 runtime with Pendant and Single ring as the only
bundled models. The Crown, heavy-ring and round-ring test assets and selector
options are excluded. Local file import remains available.

- Settings panel and all settings toggles are hidden on desktop and mobile.
- Existing published pendant camera view, per-model zoom limits, material
  defaults, quick presets, quality selector, Stats and Reset view are retained.
- Prepared model data and startup camera handling are included.
- H164 resource sharing, same-frame optical reuse, memory reductions, AO reuse,
  import load limits, normal-orientation handling and metal SSR fallback remain.
- Resource sharing is the H164 default. Optional instancing experiments are not
  promoted to the default rendering path.
- H165 green-volume shader experiments are not included. No new FPS or memory
  guarantee is made by this packaging release.

The production packager refreshes the runtime hash, service-worker cache and
SHA256 manifest. The saved published view is embedded rather than read from
visitor local storage. Historical SOURCE/src files are not the current runtime.

Validated in Chrome: both models render on desktop and mobile; only the two
requested models appear in the selector; the panel and toggles remain hidden;
orbit, Reset view, reload, stale-local-storage isolation and per-model zoom limits
pass. The runtime asset SHA256 manifest verifies successfully.
