// Actual shader-patch logic used by the V2.10 revised production bundle.
export function patchJewelleryMetalUnderside(material) {
  if (!material || material.userData.viewerJewelleryUndersidePatch) return;
  const previous = material.onBeforeCompile;
  const previousKey = material.customProgramCacheKey;
  material.onBeforeCompile = (shader, renderer) => {
    previous?.call(material, shader, renderer);
    shader.uniforms.viewerUndersideStrength = { value: 0.72 };
    shader.uniforms.viewerUndersideFloor = { value: 0.22 };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vViewerWorldNormal;')
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nvViewerWorldNormal = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vViewerWorldNormal;\nuniform float viewerUndersideStrength;\nuniform float viewerUndersideFloor;')
      .replace('#include <opaque_fragment>', `float viewerDown = smoothstep(0.10, -0.72, normalize(vViewerWorldNormal).y);\nfloat viewerUnder = mix(1.0, viewerUndersideFloor, viewerDown * viewerUndersideStrength);\noutgoingLight *= viewerUnder;\n#include <opaque_fragment>`);
  };
  material.customProgramCacheKey = () => `${previousKey ? previousKey.call(material) : ''}|viewer-jewellery-underside-v210r1`;
  material.userData.viewerJewelleryUndersidePatch = true;
  material.needsUpdate = true;
}
