// V2.11 uses the existing height-aware contact-shadow capture as a two-layer studio shadow:
// dense contact core + low-resolution broad soft falloff. The production implementation is in app.bundle.js.
export const studioShadowControls = { strength:'contactShadowDensity', contact:'contactShadowCoreStrength', softness:'contactShadowCoreBlur', softLayer:'contactShadowFalloffStrength', spread:'contactShadowFalloff' };
