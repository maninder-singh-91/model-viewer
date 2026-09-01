// Fragment contribution used by MetalUndersidePatch.js
float viewerDown = smoothstep(0.10, -0.72, normalize(vViewerWorldNormal).y);
float viewerUnder = mix(1.0, viewerUndersideFloor, viewerDown * viewerUndersideStrength);
outgoingLight *= viewerUnder;
