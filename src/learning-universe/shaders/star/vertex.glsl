varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vDist;

uniform float uTime;

void main() {
  vec3 pos = position;

  // Very subtle surface shimmer (barely visible, just adds life)
  float wave = sin(pos.x * 5.0 + uTime * 1.5) * cos(pos.z * 5.0 + uTime * 1.0) * 0.005;
  pos += normal * wave;

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPos.xyz;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vNormal = normalize(normalMatrix * normal);
  vPosition = pos;
  vDist = length(mvPosition.xyz);
}
