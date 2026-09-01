uniform sampler2D coreTexture;
uniform sampler2D softTexture;
uniform float coreStrength;
uniform float falloffStrength;
uniform float edgeFade;
uniform vec3 shadowColor;
// Production bundle mirrors U for the upward capture camera, combines a dense contact core
// with a wide blurred studio layer, and tints the result from the ground/background colour.
