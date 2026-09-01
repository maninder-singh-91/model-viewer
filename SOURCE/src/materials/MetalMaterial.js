// Adaptive GLB Viewer V2.11 — per-material metal controls
export function applyMetalControls(material, { color, roughness = 0.14, reflectionStrength = 1, environment = null, environmentIntensity = 1 } = {}) {
  if (color && material.color) material.color.set(color);
  material.metalness = 1.0;
  material.roughness = Math.min(0.8, Math.max(0.02, roughness));
  material.envMap = environment || material.envMap || null;
  material.envMapIntensity = environmentIntensity * reflectionStrength;
  material.transparent = false;
  material.opacity = 1.0;
  material.transmission = 0.0;
  material.needsUpdate = true;
  return material;
}

export const METAL_PRESETS = {
  polished: { roughness: 0.10, reflectionStrength: 1.10 },
  jewellery: { roughness: 0.14, reflectionStrength: 1.00 },
  satin: { roughness: 0.30, reflectionStrength: 0.90 },
  matte: { roughness: 0.55, reflectionStrength: 0.75 },
};
