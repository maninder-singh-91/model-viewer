# Adaptive GLB Viewer V2.17

## Viewport resolution UI fix
- Resolution selector is now visibly inserted next to the Rendering & camera controls.
- Added Auto, 50%, 75%, 100%, 150%, and 200% modes.
- Shows the current internal drawing-buffer dimensions.
- Fixed modes resize the WebGL drawing buffer while preserving CSS viewport framing.
- Auto remains suitable for adaptive/mobile interaction.
- 150% and 200% are intended for high-quality/final viewport inspection.

## Preserved
- V2.13/V2.16 diamond renderer and locked bounce quality.
- Metal HDRI controls, metal material controls, studio/contact shadows, collapsible settings and performance advisor.
- index.html deployment entry point and startup error reporting.
