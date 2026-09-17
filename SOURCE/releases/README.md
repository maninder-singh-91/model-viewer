# Current Release

`h136-pendant-settings.json` is the current pendant profile, also available as the root `viewer-settings.json`. Ring defaults are embedded in the runtime. `h94-settings.json` and `h88-settings.json` are historical release configurations.

The current runtime is the content-hashed JavaScript module referenced by the root `index.html`. It contains the H136 viewer and its defaults. The older `SOURCE/src` tree remains historical reference; rebuilding from it alone will not reproduce H136.

The pendant profile is matched to its model hash. The local editor stores Save default view values in browser local storage. Published values are explicitly captured in `h136-default-views.json` and embedded by `package-production.mjs`. Production restores these on model load and Reset view without replacing the model's zoom limit or consulting visitor local storage. Always use the production packager so the settings panel and its toggle remain hidden.
