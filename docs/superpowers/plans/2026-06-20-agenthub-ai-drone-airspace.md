# AgentHub AI Drone Airspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the toy-like airplane and remaining ball visuals in AgentHub with a black-titanium AI data drone, short node-colored flight trails, and a coherent AI hub airspace.

**Architecture:** Keep the existing static Three.js scene in `public/agenthub/index.html`. Replace the procedural plane builder and its animation helpers in place, hide or remove old capsule/packet visuals, and verify through Vite plus browser screenshots.

**Tech Stack:** Vue 3 homepage iframe, static HTML module, Three.js, Vite dev server, Node/Playwright screenshot verification.

---

## File Structure

- Modify: `public/agenthub/index.html`
  - Owns the Three.js AgentHub scene, drone geometry, node animation, trails, and visual effects.
- Modify: `src/components/homepage/AgentHub.vue`
  - Optional copy cleanup for iframe title and heading if current text is garbled.
- Create: `output/agenthub-ai-drone-after.png`
  - Verification screenshot of `/agenthub/index.html`.
- Create: `output/home-agenthub-ai-drone-after.png`
  - Verification screenshot of the embedded homepage section.

## Task 1: Capture And Confirm Baseline

**Files:**
- Read: `public/agenthub/index.html`
- Create: `output/agenthub-ai-drone-before.png`

- [ ] **Step 1: Confirm Vite serves the local page**

Run:

```powershell
try { (Invoke-WebRequest -UseBasicParsing http://localhost:5175/agenthub/index.html -TimeoutSec 5).StatusCode } catch { $_.Exception.Message }
```

Expected: `200`. If the page is not served, run:

```powershell
npm run dev -- --host 127.0.0.1 --port 5175
```

- [ ] **Step 2: Capture the current AgentHub scene**

Run:

```powershell
@'
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5175/agenthub/index.html', { waitUntil: 'domcontentloaded', timeout: 30000 })
await page.waitForTimeout(8000)
await page.screenshot({ path: 'D:/ZYY_Project/1/v4-main/output/agenthub-ai-drone-before.png', fullPage: false })
await browser.close()
'@ | node --input-type=module
```

Expected: `output/agenthub-ai-drone-before.png` shows the red/white airplane and long hard flight line.

## Task 2: Replace Toy Plane With AI Data Drone

**Files:**
- Modify: `public/agenthub/index.html`

- [ ] **Step 1: Rename the scene variables around the aircraft**

In `public/agenthub/index.html`, replace the aircraft state block with clear drone names:

```js
const droneGroup = new THREE.Group();
droneGroup.scale.setScalar(1.0);
droneGroup.visible = false;
scene.add(droneGroup);
let droneT = 0;
let leftEngineGlow = null;
let rightEngineGlow = null;
let noseLight = null;
```

Expected: later animation code uses `droneGroup` and `droneT`, not `carGroup` and `carT`.

- [ ] **Step 2: Replace `buildProceduralPlane()` with `buildDataDrone()`**

Replace the existing red/white plane builder with:

```js
function buildDataDrone() {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x121823,
    metalness: 0.68,
    roughness: 0.34,
    emissive: 0x07111f,
    emissiveIntensity: 0.35,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x173a4d,
    metalness: 0.2,
    roughness: 0.12,
    emissive: 0x0b5f78,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.78,
  });
  const cyanMat = new THREE.MeshBasicMaterial({
    color: 0x9cf5ff,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.18, 0.26), bodyMat);
  fuselage.castShadow = true;
  g.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.36, 16), bodyMat);
  nose.rotation.z = -Math.PI / 2;
  nose.position.set(0.84, 0, 0);
  nose.castShadow = true;
  g.add(nose);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 10), glassMat);
  canopy.scale.set(1.25, 0.45, 0.82);
  canopy.position.set(0.18, 0.12, 0);
  g.add(canopy);

  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.035, 1.58), bodyMat);
  wing.position.set(0.03, -0.015, 0);
  wing.castShadow = true;
  g.add(wing);

  const leftTip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.026, 0.32), cyanMat);
  leftTip.position.set(0.05, 0.005, 0.92);
  g.add(leftTip);

  const rightTip = leftTip.clone();
  rightTip.position.z = -0.92;
  g.add(rightTip);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 0.64), bodyMat);
  tail.position.set(-0.58, 0.02, 0);
  g.add(tail);

  const vTail = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.04), bodyMat);
  vTail.position.set(-0.66, 0.16, 0);
  g.add(vTail);

  noseLight = glowSprite('rgba(170,245,255,0.9)', 0.62);
  noseLight.position.set(1.05, 0.02, 0);
  g.add(noseLight);

  leftEngineGlow = glowSprite('rgba(110,235,255,0.72)', 0.5);
  leftEngineGlow.position.set(-0.34, -0.06, 0.52);
  g.add(leftEngineGlow);

  rightEngineGlow = glowSprite('rgba(110,235,255,0.72)', 0.5);
  rightEngineGlow.position.set(-0.34, -0.06, -0.52);
  g.add(rightEngineGlow);

  return g;
}
```

- [ ] **Step 3: Mount the drone**

Replace:

```js
const plane = buildProceduralPlane();
carGroup.add(plane);
window.__hubCar = { loaded: true, procedural: true };
async function loadCar() { carGroup.visible = true; }
loadCar();
```

With:

```js
const drone = buildDataDrone();
droneGroup.add(drone);
window.__hubDrone = { loaded: true, procedural: true };
async function loadDrone() { droneGroup.visible = true; }
loadDrone();
```

Expected: no red/white plane parts remain.

## Task 3: Remove Old Ball And Capsule Visuals

**Files:**
- Modify: `public/agenthub/index.html`

- [ ] **Step 1: Hide the old write-back capsule**

After creating `capsule`, `capGlow`, and `capHalo`, set them permanently hidden:

```js
capsule.visible = false;
capGlow.visible = false;
capHalo.visible = false;
```

Expected: the old large glowing ball never appears in normal beats or loop beats.

- [ ] **Step 2: Hide the old task packet**

After creating `packet` and `packetGlow`, set:

```js
packet.visible = false;
packetGlow.visible = false;
```

Then remove or guard all later visibility assignments:

```js
packet.visible = false;
packetGlow.material.opacity = 0;
```

Expected: the drone is the only moving task carrier.

- [ ] **Step 3: Keep center tower effects**

Keep `coreBall`, `coreGlow`, `coreRing`, node glows, and labels. These are part of the hub, not the old task carrier.

Expected: A1, 01-05, and center tower remain readable.

## Task 4: Replace Full Hard Line With Short Drone Trail

**Files:**
- Modify: `public/agenthub/index.html`

- [ ] **Step 1: Make the full link line invisible**

Replace the full line material opacity:

```js
const linkMat = new THREE.LineDashedMaterial({
  color: 0x9fd6ff,
  dashSize: 0.35,
  gapSize: 0.22,
  transparent: true,
  opacity: 0,
  depthWrite: false,
});
```

Expected: no full white or colored line spans the scene.

- [ ] **Step 2: Add short trail geometry**

After `linkLine` setup, create:

```js
const droneTrailGeom = new THREE.BufferGeometry();
const droneTrailMat = new THREE.LineBasicMaterial({
  color: 0x9fd6ff,
  transparent: true,
  opacity: 0.62,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const droneTrail = new THREE.Line(droneTrailGeom, droneTrailMat);
scene.add(droneTrail);
```

- [ ] **Step 3: Add a helper to update short trail points**

Add:

```js
function updateDroneTrail(curve, t, col) {
  if (!curve) {
    droneTrail.visible = false;
    return;
  }
  const pts = [];
  const start = Math.max(0, t - 0.14);
  const end = Math.min(1, t + 0.04);
  for (let i = 0; i <= 10; i++) {
    const k = start + (end - start) * (i / 10);
    pts.push(curve.getPoint(k));
  }
  droneTrail.geometry.dispose();
  droneTrail.geometry = new THREE.BufferGeometry().setFromPoints(pts);
  droneTrail.material.color.setHex(col || 0x9fd6ff);
  droneTrail.visible = true;
}
```

Expected: the trail only covers the drone's local path segment.

## Task 5: Smooth Drone Flight Path And Orientation

**Files:**
- Modify: `public/agenthub/index.html`

- [ ] **Step 1: Replace `carT` update with `droneT` update**

Use:

```js
droneT += 0.0023;
if (droneT > 1) droneT -= 1;
const tPhase = droneT;
```

- [ ] **Step 2: Use one phase-consistent curve**

Build one curve per frame:

```js
const hoverY = 2.0;
const start = new THREE.Vector3(aPos.x, aPos.y + hoverY, aPos.z);
const end = new THREE.Vector3(bPos.x, bPos.y + hoverY, bPos.z);
const mid = start.clone().add(end).multiplyScalar(0.5);
mid.y += 3.2;
const flightCurve = new THREE.QuadraticBezierCurve3(start, mid, end);
```

- [ ] **Step 3: Map hover, takeoff, cruise, and landing**

Replace the flight segment logic with:

```js
let curveT = 0;
if (tPhase < 0.28) {
  const tt = tPhase / 0.28;
  const float = Math.sin(tt * Math.PI * 2) * 0.12;
  dronePos.copy(start);
  dronePos.y += float;
  curveT = 0;
} else if (tPhase < 0.48) {
  const tt = (tPhase - 0.28) / 0.2;
  curveT = 0.18 * (1 - Math.cos(tt * Math.PI / 2));
  dronePos.copy(flightCurve.getPoint(curveT));
} else if (tPhase < 0.82) {
  const tt = (tPhase - 0.48) / 0.34;
  curveT = 0.18 + 0.64 * (0.5 - Math.cos(tt * Math.PI) * 0.5);
  dronePos.copy(flightCurve.getPoint(curveT));
} else {
  const tt = (tPhase - 0.82) / 0.18;
  curveT = 0.82 + 0.18 * Math.sin(tt * Math.PI / 2);
  dronePos.copy(flightCurve.getPoint(curveT));
}
```

- [ ] **Step 4: Orient the drone with the curve tangent**

Use:

```js
const tangent = flightCurve.getTangent(Math.min(0.98, Math.max(0.02, curveT))).normalize();
const yaw = Math.atan2(-tangent.z, tangent.x);
const pitch = -Math.atan2(tangent.y, Math.hypot(tangent.x, tangent.z)) * 0.72;
droneGroup.position.copy(dronePos);
droneGroup.rotation.set(pitch, yaw, 0);
```

- [ ] **Step 5: Update the short trail**

Call:

```js
const trailColor = aNode?.col || 0x9fd6ff;
updateDroneTrail(flightCurve, curveT, trailColor);
```

Expected: the drone flies through a natural arc, and the trail stays close to the drone.

## Task 6: Add Airspace Detail Without Clutter

**Files:**
- Modify: `public/agenthub/index.html`

- [ ] **Step 1: Add subtle ground grid rings**

After terrain setup, add two low-opacity rings:

```js
scene.add(strip(17.2, plazaY - 0.47, 0x2f7f62, 0.012, 0.18));
scene.add(strip(27.8, plazaY - 0.46, 0x5fcf9a, 0.01, 0.12));
```

- [ ] **Step 2: Add low air haze**

Create a transparent low cylinder:

```js
const haze = new THREE.Mesh(
  new THREE.CylinderGeometry(30, 30, 0.02, 96, 1, true),
  new THREE.MeshBasicMaterial({
    color: 0x58d8b0,
    transparent: true,
    opacity: 0.055,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
);
haze.position.y = plazaY + 0.22;
scene.add(haze);
```

Expected: the background reads as airspace over a learning continent, not a plain grass disk.

## Task 7: Verify Build And Screenshots

**Files:**
- Create: `output/agenthub-ai-drone-after.png`
- Create: `output/home-agenthub-ai-drone-after.png`

- [ ] **Step 1: Run the build**

Run:

```powershell
npm run build
```

Expected: build exits `0`. Existing CSS minify or chunk-size warnings may appear, but no TypeScript or Vite error should block the build.

- [ ] **Step 2: Capture direct AgentHub screenshot**

Run:

```powershell
@'
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5175/agenthub/index.html', { waitUntil: 'domcontentloaded', timeout: 30000 })
await page.waitForTimeout(8000)
await page.screenshot({ path: 'D:/ZYY_Project/1/v4-main/output/agenthub-ai-drone-after.png', fullPage: false })
await browser.close()
'@ | node --input-type=module
```

Expected: screenshot shows a black-titanium drone, no old ball carrier, and only a short trail near the drone.

- [ ] **Step 3: Capture homepage embedded screenshot**

Run:

```powershell
@'
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
await page.goto('http://localhost:5175/', { waitUntil: 'domcontentloaded', timeout: 30000 })
await page.evaluate(() => localStorage.setItem('edumind-new-user-pet-guide-dismissed', 'true'))
await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 })
await page.locator('.hub-workbench').scrollIntoViewIfNeeded()
await page.waitForTimeout(8000)
await page.screenshot({ path: 'D:/ZYY_Project/1/v4-main/output/home-agenthub-ai-drone-after.png', fullPage: false })
await browser.close()
'@ | node --input-type=module
```

Expected: embedded scene keeps A1, 01-05 labels, and bottom HUD readable.

## Self-Review

Spec coverage: Tasks 2 and 3 replace the toy plane and remove old ball visuals. Tasks 4 and 5 replace the hard full-scene line with a short, smooth drone trail. Task 6 aligns the background with AI hub airspace. Task 7 verifies build and visual output.

Placeholder scan: The plan contains no TBD, TODO, or unspecified test step.

Type consistency: The plan consistently uses `droneGroup`, `droneT`, `droneTrail`, `flightCurve`, `dronePos`, `aNode`, and `bNode` after replacing the old `carGroup` naming.
