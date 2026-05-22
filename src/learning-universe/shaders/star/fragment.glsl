varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vDist;

uniform vec3 uColor;
uniform float uTime;
uniform float uGlow;
uniform float uMastery;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = 1.0 - abs(dot(viewDir, vNormal));
  fresnel = pow(fresnel, 2.0);

  // Dual pulse: one fast shimmer, one slow breathing
  float fastPulse = sin(uTime * 3.0 + vPosition.x * 8.0 + vPosition.z * 6.0) * 0.15;
  float slowPulse = sin(uTime * 0.8) * 0.1 + 0.9;
  float pulse = (1.0 + fastPulse) * slowPulse;

  // Glow intensity scales with mastery and fresnel
  float glowIntensity = fresnel * uGlow * (0.4 + uMastery * 0.6) * pulse;

  // Core brightness
  float core = 0.6 + uMastery * 0.4 + fresnel * 0.3;

  // Color composition
  vec3 coreColor = uColor * 2.0 * core;
  vec3 glowColor = uColor * 0.8;
  vec3 rimColor = uColor * 1.4;

  vec3 finalColor = mix(glowColor, rimColor, fresnel * 0.6);
  finalColor += glowColor * glowIntensity * 0.6;

  // Add a bright center spot
  float centerDot = 1.0 - length(vPosition) * 0.8;
  centerDot = max(0.0, centerDot);
  finalColor += uColor * centerDot * 1.5 * (0.5 + uMastery * 0.5);

  // Alpha: bright in center, soft glow at edges
  float alpha = 0.7 + fresnel * 0.3 + uMastery * 0.2;
  alpha = clamp(alpha, 0.4, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
