// V2.13 contact receiver: strictly dark/subtractive output.
float alpha = clamp(core * coreStrength + soft * falloffStrength, 0.0, 0.88) * border;
vec3 safeShadow = min(shadowColor, vec3(0.18));
gl_FragColor = vec4(safeShadow, alpha);
