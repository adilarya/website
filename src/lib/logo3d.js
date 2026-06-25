// Generic 3D logo engine. Drives multiple marks (Grit "G" from an SVG, the
// Divertica wordmark from a font) with one shared render loop. Orthographic
// (flat, no perspective tilt), continuous Y-spin, drag-to-spin with momentum,
// deferred studio environment, fixed-resolution canvas (CSS scales it so the
// open/close morph never reallocates the WebGL buffer).
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json'
import columbiaRaw from './columbia.svg?raw'

// ── Grit: extruded "G" symbol ────────────────────────────────────────────────
const GRIT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225">
<defs></defs>
<g>
<path d="M176.09,97.33 C176.26,97.48 176.79,97.73 177.00,98.20 C177.22,98.66 177.35,96.41 177.38,100.13 C177.42,103.84 177.31,116.60 177.23,120.50 C177.15,124.40 177.28,121.56 176.91,123.50 C176.54,125.44 175.72,129.54 175.01,132.13 C174.31,134.71 173.63,136.63 172.69,139.00 C171.74,141.37 170.70,143.90 169.33,146.33 C167.96,148.77 165.87,151.68 164.47,153.62 C163.07,155.55 161.96,156.76 160.93,157.95 C159.90,159.13 159.70,159.42 158.31,160.73 C156.92,162.04 154.61,164.22 152.60,165.82 C150.59,167.41 148.08,169.14 146.25,170.30 C144.42,171.46 143.06,172.06 141.63,172.78 C140.19,173.50 139.75,173.80 137.63,174.61 C135.50,175.41 131.67,176.85 128.88,177.62 C126.08,178.38 123.49,178.87 120.83,179.18 C118.16,179.48 115.69,179.47 112.88,179.46 C110.06,179.45 107.00,179.53 103.92,179.10 C100.83,178.68 97.28,177.76 94.38,176.91 C91.47,176.06 88.87,175.01 86.50,173.99 C84.13,172.96 81.62,171.58 80.13,170.78 C78.63,169.99 78.88,170.16 77.54,169.23 C76.21,168.30 73.57,166.33 72.14,165.19 C70.71,164.06 70.11,163.52 68.95,162.42 C67.78,161.32 66.45,160.02 65.16,158.61 C63.86,157.19 62.73,156.09 61.20,153.93 C59.67,151.77 57.26,147.86 55.98,145.64 C54.70,143.43 54.21,142.19 53.52,140.62 C52.83,139.06 52.45,138.12 51.83,136.25 C51.22,134.38 50.34,131.38 49.84,129.38 C49.34,127.38 49.09,126.35 48.82,124.25 C48.56,122.15 48.32,118.21 48.26,116.77 C48.20,115.33 48.33,115.96 48.45,115.63 C48.57,115.30 48.73,115.04 48.98,114.81 C49.23,114.58 49.53,114.38 49.95,114.25 C50.37,114.11 49.81,114.01 51.50,113.99 C53.20,113.97 57.73,114.13 60.13,114.12 C62.52,114.12 64.33,113.89 65.88,113.95 C67.42,114.00 68.34,114.20 69.37,114.45 C70.41,114.70 71.31,115.02 72.11,115.45 C72.91,115.87 73.59,116.42 74.18,117.01 C74.76,117.61 74.83,117.05 75.62,119.01 C76.41,120.96 78.17,126.68 78.93,128.76 C79.70,130.84 79.72,130.56 80.22,131.50 C80.72,132.44 81.07,133.12 81.93,134.38 C82.78,135.63 84.02,137.56 85.35,139.04 C86.67,140.53 88.69,142.26 89.86,143.29 C91.04,144.31 91.50,144.57 92.39,145.18 C93.29,145.79 94.16,146.42 95.50,147.00 C96.84,147.58 99.06,148.22 100.50,148.50 C101.94,148.78 102.31,148.69 103.75,148.74 C105.19,148.79 107.13,148.85 108.75,148.74 C110.37,148.62 111.94,148.40 113.50,148.05 C115.06,147.71 116.66,147.27 118.13,146.66 C119.59,146.05 121.03,145.30 122.38,144.43 C123.72,143.55 125.07,142.55 126.25,141.50 C127.43,140.45 128.49,139.40 129.50,138.13 C130.51,136.85 131.55,135.39 132.38,133.88 C133.20,132.36 133.85,130.86 134.38,129.25 C134.90,127.64 135.28,126.06 135.50,124.38 C135.72,122.69 135.74,121.06 135.63,119.38 C135.51,117.69 135.20,115.96 134.75,114.38 C134.30,112.79 133.69,111.25 132.88,109.75 C132.06,108.25 131.05,106.74 129.88,105.38 C128.70,104.01 127.31,102.66 125.88,101.50 C124.44,100.34 122.88,99.31 121.25,98.50 C121.10,98.43 122.00,98.39 123.50,98.38 C125.00,98.36 128.13,98.39 131.25,98.38 C134.37,98.36 137.50,98.32 140.63,98.31 C143.75,98.31 146.88,98.31 150.00,98.31 C153.13,98.31 156.25,98.31 159.38,98.31 C162.50,98.31 165.63,98.32 168.13,98.31 C170.63,98.31 172.50,98.30 173.75,98.27 C175.00,98.24 175.63,98.20 175.94,98.16 C176.09,98.14 176.09,97.33 176.09,97.33 Z"></path>
<path d="M89.89,46.78 C91.65,46.75 98.32,46.64 100.37,46.65 C102.43,46.66 101.64,46.71 102.23,46.82 C102.83,46.92 103.30,47.01 103.93,47.27 C104.57,47.52 105.42,47.93 106.05,48.35 C106.68,48.78 107.26,49.29 107.73,49.82 C108.20,50.34 108.48,50.77 108.86,51.51 C109.24,52.24 109.82,48.22 110.01,54.22 C110.20,60.22 110.04,81.41 110.00,87.50 C109.96,93.59 109.96,89.77 109.77,90.75 C109.59,91.73 109.32,92.54 108.89,93.37 C108.46,94.20 107.86,95.04 107.19,95.71 C106.52,96.38 105.69,96.98 104.87,97.39 C104.04,97.81 104.46,98.04 102.25,98.20 C100.04,98.35 93.75,98.32 91.63,98.31 C89.50,98.31 90.12,98.25 89.50,98.16 C88.88,98.07 88.48,98.02 87.88,97.79 C87.28,97.56 86.51,97.21 85.90,96.79 C85.29,96.38 84.73,95.87 84.23,95.30 C83.73,94.73 83.26,94.05 82.91,93.37 C82.55,92.70 82.29,92.27 82.09,91.25 C81.90,90.23 81.81,92.79 81.75,87.25 C81.69,81.71 81.72,63.40 81.75,58.00 C81.79,52.60 81.78,55.89 81.98,54.88 C82.17,53.86 82.48,52.79 82.92,51.89 C83.35,50.98 83.92,50.15 84.58,49.46 C85.24,48.77 86.02,48.18 86.88,47.73 C87.75,47.29 89.26,46.96 89.76,46.80 C90.26,46.64 88.12,46.80 89.89,46.78 Z"></path>
<path d="M126.13,44.44 C127.60,44.43 133.13,44.39 134.88,44.43 C136.63,44.46 136.08,44.52 136.63,44.63 C137.17,44.74 137.55,44.83 138.12,45.10 C138.70,45.37 139.49,45.81 140.07,46.25 C140.66,46.69 141.18,47.18 141.63,47.75 C142.07,48.31 142.46,48.97 142.75,49.63 C143.04,50.30 143.21,50.44 143.37,51.75 C143.54,53.06 143.68,53.19 143.74,57.50 C143.80,61.81 143.76,73.44 143.73,77.63 C143.70,81.81 143.65,81.46 143.58,82.63 C143.51,83.79 143.54,83.84 143.33,84.62 C143.11,85.41 142.76,86.53 142.27,87.33 C141.79,88.13 141.17,88.83 140.42,89.43 C139.66,90.04 138.67,90.63 137.75,90.97 C136.83,91.31 136.94,91.38 134.88,91.48 C132.81,91.57 127.33,91.58 125.38,91.55 C123.42,91.53 123.79,91.44 123.13,91.32 C122.46,91.20 121.99,91.09 121.38,90.84 C120.76,90.58 120.03,90.22 119.42,89.77 C118.82,89.33 118.21,88.76 117.74,88.17 C117.26,87.58 116.89,86.94 116.57,86.25 C116.26,85.55 116.02,84.90 115.86,84.00 C115.70,83.10 115.67,85.58 115.63,80.88 C115.59,76.17 115.61,60.38 115.63,55.75 C115.64,51.13 115.65,53.87 115.72,53.13 C115.78,52.38 115.89,51.83 116.03,51.25 C116.18,50.67 116.36,50.14 116.59,49.63 C116.82,49.12 117.11,48.60 117.40,48.17 C117.69,47.75 117.96,47.42 118.32,47.07 C118.67,46.72 118.88,46.44 119.54,46.07 C120.20,45.69 121.17,45.11 122.25,44.83 C123.33,44.56 125.35,44.51 126.00,44.44 C126.65,44.38 124.65,44.44 126.13,44.44 Z"></path>
<path d="M60.25,65.31 C61.44,65.33 65.73,65.35 67.25,65.43 C68.77,65.50 68.73,65.60 69.37,65.76 C70.02,65.92 70.55,66.10 71.12,66.38 C71.69,66.66 72.26,67.01 72.79,67.46 C73.31,67.90 73.86,68.49 74.29,69.06 C74.71,69.63 75.06,70.24 75.34,70.88 C75.62,71.51 75.80,70.98 75.95,72.88 C76.10,74.77 76.19,78.40 76.24,82.25 C76.29,86.10 76.26,93.19 76.25,96.00 C76.24,98.81 76.23,98.27 76.17,99.13 C76.11,99.98 76.11,100.34 75.88,101.12 C75.66,101.91 75.30,103.03 74.82,103.85 C74.34,104.66 73.77,105.37 73.01,106.02 C72.24,106.68 71.15,107.39 70.25,107.78 C69.35,108.16 70.91,108.27 67.63,108.35 C64.34,108.43 53.54,108.30 50.52,108.24 C47.50,108.17 49.80,108.10 49.51,107.99 C49.21,107.87 48.98,107.72 48.77,107.53 C48.57,107.34 48.40,107.10 48.27,106.83 C48.14,106.57 48.07,110.37 48.01,105.96 C47.94,101.55 47.88,85.68 47.88,80.38 C47.89,75.07 47.95,75.54 48.04,74.13 C48.13,72.71 48.25,72.52 48.42,71.88 C48.60,71.23 48.82,70.77 49.10,70.27 C49.37,69.76 49.67,69.32 50.05,68.85 C50.43,68.39 50.91,67.91 51.39,67.50 C51.86,67.10 52.22,66.76 52.91,66.43 C53.59,66.10 54.30,65.71 55.50,65.53 C56.70,65.34 59.33,65.35 60.13,65.31 C60.92,65.28 59.06,65.29 60.25,65.31 Z"></path>
<path d="M159.88,57.94 C161.23,57.94 166.23,57.89 167.88,57.93 C169.52,57.98 169.11,58.06 169.75,58.21 C170.39,58.36 171.09,58.57 171.74,58.85 C172.40,59.12 173.10,59.48 173.66,59.85 C174.22,60.23 174.67,60.62 175.09,61.11 C175.52,61.59 175.88,62.13 176.20,62.76 C176.52,63.39 176.82,63.80 177.02,64.90 C177.22,66.01 177.34,66.57 177.41,69.38 C177.49,72.18 177.48,79.35 177.46,81.75 C177.45,84.15 177.42,83.15 177.34,83.75 C177.26,84.35 177.25,84.68 176.97,85.37 C176.69,86.06 176.23,87.12 175.66,87.87 C175.10,88.61 174.35,89.31 173.59,89.85 C172.83,90.39 172.01,90.82 171.12,91.11 C170.23,91.40 170.31,91.49 168.25,91.57 C166.19,91.64 160.89,91.67 158.75,91.57 C156.61,91.46 156.26,91.22 155.38,90.95 C154.50,90.69 154.06,90.40 153.45,89.99 C152.84,89.59 152.22,89.06 151.72,88.53 C151.22,88.01 150.80,87.43 150.47,86.84 C150.14,86.25 149.92,85.87 149.74,85.00 C149.56,84.13 149.44,84.42 149.37,81.63 C149.31,78.83 149.33,70.90 149.35,68.25 C149.38,65.60 149.42,66.48 149.53,65.75 C149.63,65.02 149.66,64.61 149.99,63.88 C150.32,63.15 150.82,62.15 151.49,61.37 C152.16,60.59 153.21,59.73 154.00,59.22 C154.80,58.71 155.31,58.52 156.26,58.31 C157.22,58.10 159.15,58.01 159.75,57.95 C160.35,57.88 158.52,57.94 159.88,57.94 Z"></path>
</g></svg>`

function buildGrit() {
  const loader = new SVGLoader()
  const data = loader.parse(GRIT_SVG)
  const shapes = []
  data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)))
  const settings = { depth: 30, bevelEnabled: true, bevelThickness: 3.4, bevelSize: 2.6, bevelSegments: 5, curveSegments: 28 }
  const geos = shapes.map(s => new THREE.ExtrudeGeometry(s, settings))
  return centerGeos(geos)
}

// ── Divertica: "DIVERTICA" wordmark plaque from a font ───────────────────────
const FONT = new FontLoader().parse(helvetikerBold)

function buildDivertica() {
  const ITALIC = Math.tan(13 * Math.PI / 180) // letter slant
  const SKEW   = Math.tan(20 * Math.PI / 180) // plaque shear (brand banner)
  const size = 100, curveSeg = 12
  const shear = (p) => new THREE.Vector2(p.x + ITALIC * p.y, p.y)

  const glyphShapes = FONT.generateShapes('DIVERTICA', size)
  const letterOuters = [], counters = []
  let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity
  for (const g of glyphShapes) {
    const ep = g.extractPoints(curveSeg)
    const outer = ep.shape.map(shear)
    letterOuters.push(outer)
    for (const h of ep.holes) counters.push(h.map(shear))
    for (const p of outer) {
      if (p.x < minx) minx = p.x; if (p.x > maxx) maxx = p.x
      if (p.y < miny) miny = p.y; if (p.y > maxy) maxy = p.y
    }
  }
  const cx = (minx + maxx) / 2, cy = (miny + maxy) / 2
  const wordW = maxx - minx, wordH = maxy - miny
  const padX = 86, padY = 80
  const hw = wordW / 2 + padX, hh = wordH / 2 + padY
  const sk = SKEW * (2 * hh)

  const plaque = new THREE.Shape()
  plaque.moveTo(cx - hw - sk / 2, cy - hh)
  plaque.lineTo(cx + hw - sk / 2, cy - hh)
  plaque.lineTo(cx + hw + sk / 2, cy + hh)
  plaque.lineTo(cx - hw + sk / 2, cy + hh)
  plaque.closePath()
  for (const outer of letterOuters) {
    const path = new THREE.Path()
    path.setFromPoints(outer)
    plaque.holes.push(path)
  }

  const ex = { depth: 96, bevelEnabled: true, bevelThickness: 4, bevelSize: 3.2, bevelSegments: 3, curveSegments: 1 }
  const geos = [new THREE.ExtrudeGeometry(plaque, ex)]
  for (const c of counters) {
    const sh = new THREE.Shape()
    sh.setFromPoints(c)
    geos.push(new THREE.ExtrudeGeometry(sh, ex))
  }
  return centerGeos(geos)
}

// ── University of Minnesota: extruded mark (traced SVG) ──────────────────────
const UMN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1193 1014">
<g transform="translate(0,1014) scale(0.1,-0.1)" fill="#000000" stroke="none">
<path d="M3790 6525 l0 -515 130 0 130 0 0 -24 c0 -14 -6 -31 -13 -38 -7 -7 -19 -29 -27 -48 -8 -19 -33 -63 -57 -98 -24 -35 -43 -65 -43 -68 0 -4 -72 -118 -112 -176 -10 -15 -18 -31 -18 -35 -1 -4 -27 -51 -60 -103 -33 -52 -79 -126 -102 -165 -23 -38 -45 -72 -48 -75 -11 -11 -30 -50 -30 -63 0 -8 -9 -22 -21 -33 -12 -10 -30 -37 -41 -59 -12 -22 -52 -88 -89 -147 -38 -59 -74 -119 -79 -133 -5 -14 -18 -38 -28 -53 -59 -86 -174 -271 -230 -372 -14 -25 -42 -71 -64 -103 -21 -32 -38 -61 -38 -63 0 -3 -12 -21 -26 -40 l-26 -34 -187 0 c-102 0 -192 -4 -199 -8 -10 -7 -12 -115 -10 -508 l3 -499 1003 -3 1002 -2 0 504 c0 450 -2 505 -16 510 -9 3 -83 6 -165 6 -89 0 -149 4 -149 10 0 5 14 31 30 57 17 26 30 51 30 56 0 5 9 21 21 35 34 45 144 214 174 267 15 28 60 100 99 160 40 61 86 132 102 158 58 96 67 112 78 132 25 45 49 75 60 75 11 0 56 -63 56 -79 0 -5 4 -11 8 -13 11 -4 82 -105 82 -116 0 -5 9 -17 20 -27 11 -10 20 -26 20 -37 0 -16 -9 -18 -90 -18 l-90 0 -1 -62 c-1 -45 0 -780 1 -1001 0 -4 496 -6 1103 -5 l1102 3 0 530 0 530 -97 3 c-60 2 -98 7 -98 13 0 13 159 251 174 261 11 7 56 -28 56 -43 0 -5 11 -25 25 -46 14 -21 30 -45 35 -53 5 -8 35 -53 66 -100 31 -46 60 -96 65 -109 5 -13 23 -41 39 -61 17 -21 30 -41 30 -44 0 -4 37 -64 83 -134 45 -70 87 -138 93 -152 6 -14 28 -46 48 -73 20 -26 36 -51 36 -56 0 -5 7 -14 15 -21 8 -7 15 -19 15 -26 0 -11 -32 -14 -147 -16 l-148 -3 -5 -493 c-3 -271 -1 -500 3 -508 7 -12 151 -14 1003 -14 l994 0 -2 508 -3 507 -197 3 -197 2 -30 46 c-17 25 -31 49 -31 54 0 8 -35 62 -150 235 -26 39 -61 96 -78 128 -17 31 -49 83 -70 115 -22 31 -50 75 -64 97 -14 22 -41 66 -61 97 -21 31 -37 59 -37 63 0 3 -39 66 -87 138 -86 131 -153 236 -153 243 0 2 -12 20 -26 41 -14 21 -30 47 -35 58 -5 11 -31 54 -58 95 -28 41 -67 104 -87 140 -21 36 -54 89 -74 118 -19 29 -44 70 -55 90 -12 20 -38 63 -60 95 -24 36 -35 61 -29 67 5 5 72 11 149 12 l140 3 3 513 2 512 -985 0 -985 0 0 -515 0 -515 135 0 c80 0 135 -4 135 -10 0 -11 -71 -128 -154 -256 -34 -51 -99 -151 -145 -223 -46 -72 -88 -134 -93 -137 -14 -9 -35 13 -72 79 -19 34 -42 71 -50 82 -26 33 -126 188 -126 196 0 3 -7 13 -16 20 -9 8 -25 32 -35 54 -21 44 -29 58 -76 128 -18 26 -33 52 -33 57 0 6 55 10 145 10 l145 0 0 515 0 515 -990 0 -990 0 0 -515z"/>
</g></svg>`

function buildUMN() {
  const loader = new SVGLoader()
  const data = loader.parse(UMN_SVG)
  const shapes = []
  data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)))
  // Depth/bevel proportional to the mark's width, so it works at any SVG scale.
  const box2 = new THREE.Box2()
  shapes.forEach(s => s.getPoints(4).forEach(p => box2.expandByPoint(p)))
  const w = Math.max(1, box2.max.x - box2.min.x)
  const settings = {
    depth: w * 0.16, bevelEnabled: true,
    bevelThickness: w * 0.02, bevelSize: w * 0.016, bevelSegments: 16, curveSegments: 48,
  }
  const geos = shapes.map(s => new THREE.ExtrudeGeometry(s, settings))
  return centerGeos(geos)
}

// ── Columbia: extruded crown, rebuilt from an inverted trace ─────────────────
// The SVG is a filled square with the crown carved out (negative space) plus the
// crown's scrollwork as separate pieces. We drop the square frame, take the
// largest remaining contour as the crown's solid silhouette, and cut the rest
// back in as engraving.
function buildColumbia() {
  const loader = new SVGLoader()
  const data = loader.parse(columbiaRaw)

  const solidContours = [] // crown silhouette + base bar (the square's cut-outs)
  const holeContours = []  // separate scrollwork paths → engraved detail

  data.paths.forEach((p, idx) => {
    const shapes = SVGLoader.createShapes(p)
    if (idx === 0) {
      // The filled square: its holes are the actual solid crown pieces.
      shapes.forEach(s => s.holes.forEach(h => solidContours.push(h.getPoints(64))))
    } else {
      shapes.forEach(s => solidContours.length && holeContours.push(s.getPoints(64)))
    }
  })

  const bbox = (pts) => new THREE.Box2().setFromPoints(pts)
  const area = (pts) => { const b = bbox(pts); return (b.max.x - b.min.x) * (b.max.y - b.min.y) }

  // Fallback if the SVG wasn't structured as expected.
  if (solidContours.length === 0) {
    data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => solidContours.push(s.getPoints(64))))
  }

  solidContours.sort((a, b) => area(b) - area(a))
  const outer = solidContours[0]          // crown silhouette
  const extraSolids = solidContours.slice(1) // base bar, etc.

  // Crown body, with the scrollwork engraved as holes.
  const crown = new THREE.Shape()
  crown.setFromPoints(outer)
  holeContours.forEach(hc => { const h = new THREE.Path(); h.setFromPoints(hc); crown.holes.push(h) })

  const w = Math.max(1, area(outer) ** 0.5)
  const settings = {
    depth: w * 0.14, bevelEnabled: true,
    bevelThickness: w * 0.018, bevelSize: w * 0.014, bevelSegments: 16, curveSegments: 48,
  }
  const shapes = [crown, ...extraSolids.map(c => { const sh = new THREE.Shape(); sh.setFromPoints(c); return sh })]
  return centerGeos(shapes.map(s => new THREE.ExtrudeGeometry(s, settings)))
}

// ── Quorum: extruded logo (traced SVG) ───────────────────────────────────────
const QUORUM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 873 873">
<g transform="translate(0,873) scale(0.1,-0.1)" fill="#000000" stroke="none">
<path d="M4220 6750 c-372 -29 -736 -146 -1032 -333 -432 -273 -765 -709 -922 -1206 -110 -348 -128 -765 -47 -1105 65 -272 164 -491 335 -740 34 -50 66 -103 69 -117 4 -17 -10 -105 -38 -235 -111 -512 -107 -482 -70 -519 34 -35 65 -32 202 21 65 25 215 82 333 127 l215 82 305 6 c266 6 312 9 361 26 208 72 322 235 276 394 -21 70 -46 93 -233 213 -358 228 -535 395 -671 631 -97 170 -143 334 -150 535 -8 219 21 351 122 555 65 132 132 223 240 329 167 163 366 267 609 316 96 20 129 22 290 17 193 -5 278 -20 421 -74 286 -107 543 -350 660 -623 167 -388 124 -822 -113 -1159 -142 -202 -329 -360 -691 -581 -80 -49 -110 -74 -132 -108 -98 -155 7 -350 236 -438 69 -27 75 -27 380 -33 l310 -7 130 -51 c332 -132 527 -203 553 -203 32 0 69 30 77 63 4 12 -3 65 -15 117 -46 206 -120 568 -120 587 0 11 33 69 74 129 194 288 309 569 363 890 25 152 25 505 0 654 -163 963 -891 1684 -1837 1820 -165 23 -350 31 -490 20z"/>
<path d="M4902 4929 c-94 -37 -436 -296 -602 -455 l-95 -91 -145 85 c-170 99 -202 108 -250 65 -45 -41 -45 -91 2 -142 110 -118 163 -178 248 -280 104 -124 134 -146 186 -137 38 8 43 13 158 187 128 195 294 396 494 597 100 102 114 135 70 166 -25 18 -33 19 -66 5z"/>
</g></svg>`

function buildQuorum() {
  const loader = new SVGLoader()
  const data = loader.parse(QUORUM_SVG)
  const shapes = []
  data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)))
  const box2 = new THREE.Box2()
  shapes.forEach(s => s.getPoints(4).forEach(pt => box2.expandByPoint(pt)))
  const w = Math.max(1, box2.max.x - box2.min.x)
  const settings = {
    depth: w * 0.16, bevelEnabled: true,
    bevelThickness: w * 0.02, bevelSize: w * 0.016, bevelSegments: 8, curveSegments: 48,
  }
  const geos = shapes.map(s => new THREE.ExtrudeGeometry(s, settings))
  return centerGeos(geos)
}

// ── Synapse: the ")(" brackets (background path dropped) ─────────────────────
const SYNAPSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 219">
<path transform="translate(148.77734375,36.45703125)" d="M0 0 C3.1926695 0.77993156 4.9866079 2.17140231 7.22265625 4.54296875 C9.43018323 8.24790914 9.66145834 10.91222424 9.078125 15.1328125 C7.67973982 19.07255521 4.80712061 21.26062224 1.76953125 24.02734375 C-8.23292452 33.90707001 -14.93662947 47.18011493 -18.77734375 60.54296875 C-19.00550781 61.32027344 -19.23367187 62.09757812 -19.46875 62.8984375 C-22.64056735 75.78533175 -21.39233885 89.9345712 -17.77734375 102.54296875 C-17.46023437 103.66960937 -17.143125 104.79625 -16.81640625 105.95703125 C-12.83442531 118.46779405 -6.02719351 130.44298743 3.98828125 139.0625 C6.93581137 141.62995387 8.60675802 143.62913283 9.28515625 147.54296875 C9.49985247 151.55318736 8.48568786 154.18743912 6.22265625 157.54296875 C3.46428017 160.50566898 0.38322735 161.38786704 -3.64453125 161.71484375 C-11.3233767 161.09603569 -16.70901357 153.80511017 -21.3984375 148.4140625 C-39.42084259 126.66288394 -47.27950998 99.57339056 -45.77734375 71.54296875 C-42.97907927 43.76020003 -30.18190534 20.36378278 -9.77734375 1.54296875 C-6.01422654 -0.96577605 -4.31737744 -0.5967107 0 0 Z "/>
<path transform="translate(69,36)" d="M0 0 C14.25959496 5.76516957 24.52979108 24.02417125 30.87109375 37.28125 C34.66390315 46.41548993 37.63321964 54.3145805 36 64.25 C33.98363877 78.29251573 34.04145676 94.1985925 38 108 C37.34 108 36.68 108 36 108 C35.9071875 109.36125 35.9071875 109.36125 35.8125 110.75 C33.02318783 129.34541449 17.80496882 149.90128183 3 161 C-0.9232182 162.50005402 -4.33283715 162.22658361 -8.3125 160.875 C-11.95870285 158.33113755 -13.5149527 156.34888644 -14.421875 151.95703125 C-14.73475852 148.46115962 -14.63740145 145.99280104 -12.7109375 142.9921875 C-10.87448292 140.92093507 -8.94800652 138.96645355 -7 137 C10.32818049 117.06582362 16.37055486 96.01516174 15 70 C12.76980784 51.76156409 3.1651681 35.90724418 -9.40698242 22.91943359 C-13.63352835 18.52948833 -14.40372832 15.15858332 -14.35546875 9.22265625 C-13.78349534 5.64625106 -11.78292688 4.13573458 -9 2 C-5.41123098 -0.39251268 -4.23750792 -0.55967086 0 0 Z "/>
</svg>`

function buildSynapse() {
  const loader = new SVGLoader()
  const data = loader.parse(SYNAPSE_SVG)
  const shapes = []
  data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)))
  const box2 = new THREE.Box2()
  shapes.forEach(s => s.getPoints(6).forEach(pt => box2.expandByPoint(pt)))
  const w = Math.max(1, box2.max.x - box2.min.x)
  const settings = {
    depth: w * 0.13, bevelEnabled: true,
    bevelThickness: w * 0.018, bevelSize: w * 0.014, bevelSegments: 8, curveSegments: 48,
  }
  const geos = shapes.map(s => new THREE.ExtrudeGeometry(s, settings))
  return centerGeos(geos)
}

// ── TrialFind: ring + heartbeat (rebuilt from the stroked SVG, green dropped) ──
function buildTrialFind() {
  const settings = { depth: 72, bevelEnabled: true, bevelThickness: 8, bevelSize: 6, bevelSegments: 3, curveSegments: 64 }
  const geos = []

  // Ring (annulus) centered on the SVG's 512,512.
  const R = 272, ringHW = 25
  const ring = new THREE.Shape()
  ring.absarc(512, 512, R + ringHW, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(512, 512, R - ringHW, 0, Math.PI * 2, true)
  ring.holes.push(hole)
  geos.push(new THREE.ExtrudeGeometry(ring, settings))

  // Heartbeat line — segments + round joints, sitting just in front of the ring.
  // Each piece is staggered slightly in z so overlaps don't z-fight.
  const pts = [[286, 512], [398, 512], [440, 414], [500, 640], [548, 512], [738, 512]]
  const HW = 22
  let z = 3
  const pushAt = (shape) => { const g = new THREE.ExtrudeGeometry(shape, settings); g.translate(0, 0, z); z += 1; geos.push(g) }

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1]
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1
    const nx = (-dy / len) * HW, ny = (dx / len) * HW
    const s = new THREE.Shape()
    s.moveTo(a[0] + nx, a[1] + ny)
    s.lineTo(b[0] + nx, b[1] + ny)
    s.lineTo(b[0] - nx, b[1] - ny)
    s.lineTo(a[0] - nx, a[1] - ny)
    s.closePath()
    pushAt(s)
  }
  for (const p of pts) {
    const d = new THREE.Shape()
    d.absarc(p[0], p[1], HW, 0, Math.PI * 2, false)
    pushAt(d)
  }

  return centerGeos(geos)
}

// ── Physical-IDE: "[ o ]" brackets + pin (rebuilt from strokes, orange dropped) ─
function buildPhysicalIDE() {
  const settings = { depth: 9, bevelEnabled: true, bevelThickness: 1.2, bevelSize: 1, bevelSegments: 3, curveSegments: 40 }
  const geos = []
  let z = 0
  const HW = 3.5 // stroke 7

  // Stroke a polyline as overlapping rectangles (extended by HW → square caps/miters).
  const stroke = (pts) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1]
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1
      const ux = dx / len, uy = dy / len
      const nx = -uy * HW, ny = ux * HW
      const ax = a[0] - ux * HW, ay = a[1] - uy * HW, bx = b[0] + ux * HW, by = b[1] + uy * HW
      const s = new THREE.Shape()
      s.moveTo(ax + nx, ay + ny); s.lineTo(bx + nx, by + ny); s.lineTo(bx - nx, by - ny); s.lineTo(ax - nx, ay - ny); s.closePath()
      const g = new THREE.ExtrudeGeometry(s, settings); g.translate(0, 0, z); z += 0.5; geos.push(g)
    }
  }

  stroke([[48, 28], [28, 28], [28, 100], [48, 100]])   // left bracket
  stroke([[80, 28], [100, 28], [100, 100], [80, 100]]) // right bracket

  // center pin (ring): r 7.25, stroke 7.5 → outer 11, inner 3.5
  const ring = new THREE.Shape()
  ring.absarc(64, 64, 11, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(64, 64, 3.5, 0, Math.PI * 2, true)
  ring.holes.push(hole)
  const rg = new THREE.ExtrudeGeometry(ring, settings); rg.translate(0, 0, z); geos.push(rg)

  return centerGeos(geos)
}

// ── AgentFirewall: the shield, solid (background + middle bar ignored) ───────
const AGENTFIREWALL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
<path d="M334,232 H690 Q724,232 724,268 C724,472 690,612 552,742 Q512,780 472,742 C334,612 300,472 300,268 Q300,232 334,232 Z"/>
</svg>`

function buildAgentFirewall() {
  const loader = new SVGLoader()
  const data = loader.parse(AGENTFIREWALL_SVG)
  const shapes = []
  data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)))
  const box2 = new THREE.Box2()
  shapes.forEach(s => s.getPoints(6).forEach(pt => box2.expandByPoint(pt)))
  const w = Math.max(1, box2.max.x - box2.min.x)
  const settings = {
    depth: w * 0.16, bevelEnabled: true,
    bevelThickness: w * 0.02, bevelSize: w * 0.016, bevelSegments: 8, curveSegments: 48,
  }
  const geos = shapes.map(s => new THREE.ExtrudeGeometry(s, settings))
  return centerGeos(geos)
}

// ── Baymax: the face as line art — extrude the black marks, leave white empty ─
// (Outline ring + two eyes + connecting bar are the solids; the disk is hollow.)
function buildBaymax() {
  const settings = {
    depth: 48, bevelEnabled: true,
    bevelThickness: 4, bevelSize: 3, bevelSegments: 4, curveSegments: 64,
  }
  const geos = []

  // Outline ring — the black stroke (width 15) of SVG ellipse cx220 cy180 rx178 ry142.
  const ring = new THREE.Shape()
  ring.absellipse(220, 180, 185.5, 149.5, 0, Math.PI * 2, false, 0)
  const inner = new THREE.Path()
  inner.absellipse(220, 180, 170.5, 134.5, 0, Math.PI * 2, true, 0)
  ring.holes.push(inner)
  geos.push(new THREE.ExtrudeGeometry(ring, settings))

  // Connecting bar (SVG rect x150..290, y173..187, r7) — solid rounded rect.
  const x0 = 150, x1 = 290, y0 = 173, y1 = 187, r = 7
  const bar = new THREE.Shape()
  bar.moveTo(x0 + r, y0)
  bar.lineTo(x1 - r, y0)
  bar.quadraticCurveTo(x1, y0, x1, y0 + r)
  bar.lineTo(x1, y1 - r)
  bar.quadraticCurveTo(x1, y1, x1 - r, y1)
  bar.lineTo(x0 + r, y1)
  bar.quadraticCurveTo(x0, y1, x0, y1 - r)
  bar.lineTo(x0, y0 + r)
  bar.quadraticCurveTo(x0, y0, x0 + r, y0)
  geos.push(new THREE.ExtrudeGeometry(bar, settings))

  // Two eyes (SVG ellipses cx150/290, cy180, rx34 ry36) — solid.
  for (const ex of [150, 290]) {
    const eye = new THREE.Shape()
    eye.absellipse(ex, 180, 34, 36, 0, Math.PI * 2, false, 0)
    geos.push(new THREE.ExtrudeGeometry(eye, settings))
  }

  return centerGeos(geos)
}

// Center a set of geometries on the origin; return measurements for framing.
function centerGeos(geos) {
  const box = new THREE.Box3()
  geos.forEach(g => { g.computeBoundingBox(); box.union(g.boundingBox) })
  const c = box.getCenter(new THREE.Vector3())
  geos.forEach(g => g.translate(-c.x, -c.y, -c.z))
  const s = box.getSize(new THREE.Vector3())
  return { geos, radius: s.length() / 2, halfW: s.x / 2, halfH: s.y / 2 }
}

const MATTE = { metalness: 0.0, roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.45, reflectivity: 0.35, envMapIntensity: 1.05 }

const LOGOS = {
  grit:      { build: buildGrit,      fill: 0.9,  frame: 'radius', flipX: true,  startY: -0.4, autoSpeed: 0.008 },
  divertica: { build: buildDivertica, fill: 1.06, frame: 'box',    flipX: false, startY: -0.3, autoSpeed: 0.006 },
  umn:       { build: buildUMN,       fill: 0.95, frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007 },
  columbia:  { build: buildColumbia,  fill: 1.12, frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007 },
  quorum:    { build: buildQuorum,    fill: 1.09, frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007, color: 0xf4f4f4 },
  synapse:   { build: buildSynapse,   fill: 1.08, frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007, color: 0xf4f4f4 },
  trialfind: { build: buildTrialFind, fill: 1.1,  frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007, color: 0xf0c24a },
  physicalide: { build: buildPhysicalIDE, fill: 1.1, frame: 'box', flipX: true,  startY: -0.3, autoSpeed: 0.007, color: 0xf0c24a },
  agentfirewall: { build: buildAgentFirewall, fill: 1.1, frame: 'box', flipX: true, startY: -0.3, autoSpeed: 0.007, color: 0xf4f4f4 },
  baymax:    { build: buildBaymax,    fill: 1.12, frame: 'box',    flipX: true,  startY: -0.3, autoSpeed: 0.007, color: 0xf4f4f4 },
}

const builtCache = {}
function getBuilt(kind) {
  return builtCache[kind] || (builtCache[kind] = LOGOS[kind].build())
}

let roomScene = null
const getRoomScene = () => roomScene || (roomScene = new RoomEnvironment())

// ── Shared render loop ───────────────────────────────────────────────────────
const instances = []
let rafId = null

function loop() {
  for (const inst of instances) {
    if (!inst.dragging) {
      inst.velY *= 0.95
      const auto = inst.spinOnHover && !inst.hovering ? 0 : inst.autoSpeed
      inst.rotY += auto + inst.velY
    }
    inst.pivot.rotation.y = inst.rotY
    inst.renderer.render(inst.scene, inst.camera)
  }
  rafId = requestAnimationFrame(loop)
}
const ensureLoop   = () => { if (rafId == null) rafId = requestAnimationFrame(loop) }
const maybeStopLoop = () => { if (instances.length === 0 && rafId != null) { cancelAnimationFrame(rafId); rafId = null } }

export function createLogoInstance(container, kind, opts = {}) {
  const cfg = LOGOS[kind]
  if (!cfg) throw new Error(`Unknown 3D logo: ${kind}`)
  const { geos, radius, halfW, halfH } = getBuilt(kind)

  const fill        = opts.fill      ?? cfg.fill
  const startY      = opts.startY    ?? cfg.startY
  const autoSpeed   = opts.autoSpeed ?? cfg.autoSpeed
  const spinOnHover = opts.spinOnHover ?? false

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none'
  container.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-0.6, 1.0, 0.9); scene.add(key)
  const fillL = new THREE.DirectionalLight(0xffffff, 0.9); fillL.position.set(1.0, 0.3, 0.6); scene.add(fillL)
  const rim = new THREE.DirectionalLight(0xbfd0ff, 1.4); rim.position.set(0.2, -0.6, -1.0); scene.add(rim)
  scene.add(new THREE.AmbientLight(0xffffff, 0.18))

  // Orthographic — zero perspective, so the Y-axis spin is perfectly flat.
  const ext = cfg.frame === 'radius' ? radius : Math.max(halfW, halfH)
  const half = ext * fill
  const camera = new THREE.OrthographicCamera(-half, half, half, -half, 1, 8000)

  const pivot = new THREE.Group()
  const logo = new THREE.Group()
  const mat = new THREE.MeshPhysicalMaterial({ color: cfg.color ?? 0x0c0c0e, ...MATTE })
  geos.forEach(g => logo.add(new THREE.Mesh(g, mat)))
  if (cfg.flipX) logo.rotation.x = Math.PI // SVG y-down -> y-up
  pivot.add(logo)
  scene.add(pivot)

  // Fixed-resolution buffer; CSS scales it to the tile (cheap morph). Generous
  // so slanted edges anti-alias cleanly when scaled down to the small tile.
  const RES = 340
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(RES, RES, false)
  camera.position.set(0, 0, 2000)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()

  const inst = { renderer, scene, camera, pivot, autoSpeed, rotY: startY, velY: 0, dragging: false, spinOnHover, hovering: false }

  // Defer the heavy studio environment so it never lands on the open animation.
  let disposed = false
  let pmrem = null
  let env = null
  const envTimer = setTimeout(() => {
    if (disposed) return
    pmrem = new THREE.PMREMGenerator(renderer)
    env = pmrem.fromScene(getRoomScene(), 0.04).texture
    scene.environment = env
  }, 120)

  // ── Drag to spin (Y only, no tilt) ──
  const el = renderer.domElement
  let last = null
  el.addEventListener('pointerdown', (e) => {
    inst.dragging = true; inst.velY = 0; last = { x: e.clientX, y: e.clientY }
    el.style.cursor = 'grabbing'
    try { el.setPointerCapture(e.pointerId) } catch {}
    e.stopPropagation()
  })
  el.addEventListener('pointermove', (e) => {
    if (!inst.dragging || !last) return
    const dx = e.clientX - last.x
    inst.rotY += dx * 0.01
    inst.velY = dx * 0.01
    last = { x: e.clientX, y: e.clientY }
  })
  const endDrag = (e) => {
    inst.dragging = false; last = null; el.style.cursor = 'grab'
    try { el.releasePointerCapture(e.pointerId) } catch {}
  }
  el.addEventListener('pointerup', endDrag)
  el.addEventListener('pointercancel', endDrag)
  el.addEventListener('click', (e) => e.stopPropagation())
  el.addEventListener('pointerenter', () => { inst.hovering = true })
  el.addEventListener('pointerleave', () => { inst.hovering = false })

  instances.push(inst)
  ensureLoop()

  return {
    dispose() {
      disposed = true
      clearTimeout(envTimer)
      const idx = instances.indexOf(inst)
      if (idx >= 0) instances.splice(idx, 1)
      mat.dispose()
      env?.dispose?.()
      pmrem?.dispose?.()
      renderer.dispose()
      const ctx = renderer.getContext()
      const lose = ctx && ctx.getExtension && ctx.getExtension('WEBGL_lose_context')
      lose && lose.loseContext()
      renderer.domElement.remove()
      maybeStopLoop()
    },
  }
}
