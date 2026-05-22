import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

export class ObsidianEdge {
  public line: Line2
  public fromId: string
  public toId: string

  private _baseOpacity = 0.16
  private _highlighted = false
  private _dimmed = false

  constructor(
    fromId: string,
    toId: string,
    startPos: THREE.Vector3,
    endPos: THREE.Vector3,
    color: THREE.Color,
  ) {
    this.fromId = fromId
    this.toId = toId

    const positions = this._curvePoints(startPos, endPos)

    const geo = new LineGeometry()
    geo.setPositions(Array.from(positions))

    const mat = new LineMaterial({
      color: color.getHex(),
      linewidth: 1.4,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      transparent: true,
      opacity: this._baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      worldUnits: false,
    })

    this.line = new Line2(geo, mat)
    this.line.renderOrder = 2
    this.line.frustumCulled = false
    this.line.userData = { isGraphEdge: true, fromId, toId }
  }

  private _curvePoints(
    start: THREE.Vector3,
    end: THREE.Vector3,
    segments = 20,
  ): Float32Array {
    const mid = this._computeMid(start, end)
    const pts = new Float32Array((segments + 1) * 3)
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const mt = 1 - t
      pts[i * 3] = mt * mt * start.x + 2 * mt * t * mid.x + t * t * end.x
      pts[i * 3 + 1] = mt * mt * start.y + 2 * mt * t * mid.y + t * t * end.y
      pts[i * 3 + 2] = mt * mt * start.z + 2 * mt * t * mid.z + t * t * end.z
    }
    return pts
  }

  private _computeMid(start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3 {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const dir = new THREE.Vector3().subVectors(end, start).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    if (Math.abs(dir.dot(up)) > 0.9) up.set(1, 0, 0)
    const perp = new THREE.Vector3().crossVectors(dir, up).normalize()
    const dist = start.distanceTo(end)
    const arcHeight = Math.max(1.5, dist * 0.1)
    const sign = ((this.fromId.charCodeAt(0) + this.toId.charCodeAt(0)) % 2 === 0) ? 1 : -1
    perp.multiplyScalar(sign * arcHeight)
    perp.y += arcHeight * 0.2
    mid.add(perp)
    return mid
  }

  setHighlight(on: boolean) {
    this._highlighted = on
    this._apply()
  }

  setDim(on: boolean) {
    this._dimmed = on
    this._apply()
  }

  private _apply() {
    const m = this.line.material as LineMaterial
    if (this._highlighted) {
      m.opacity = 0.8
    } else if (this._dimmed) {
      m.opacity = 0.025
    } else {
      m.opacity = this._baseOpacity
    }
  }

  setResolution(w: number, h: number) {
    const m = this.line.material as LineMaterial
    m.resolution.set(w, h)
  }

  update(_time: number) {
    // Static bezier line; no per-frame geometry update needed.
  }

  dispose() {
    this.line.geometry.dispose()
    this.line.material.dispose()
  }
}
