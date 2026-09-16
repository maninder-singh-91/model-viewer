# Current Release

`h94-settings.json` is the configuration used for the production defaults, including the closest-zoom ratio. It contains no camera position: startup retains the viewer's normal framing, with the selected maximum zoom-in already enforced. `h88-settings.json` is retained as the previous release's configuration.

The current runtime is the content-hashed JavaScript module referenced by the root `index.html`. It contains the H94 viewer and its deployment defaults. The older `SOURCE/src` tree remains historical reference; rebuilding from it alone will not reproduce H94.

Material-slot defaults are applied only when the loaded material names and their mesh assignments match the exported model layout. Other imported models retain their normal material assignment logic and share the release's scene defaults.
