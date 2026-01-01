<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { makeNoise2D, rand } from './utils'

/**
 * Blurred Floating Circles Background
 * - Circles spawn with blue-noise-ish spacing
 * - Movement = Perlin/Simplex flow field + soft separation
 * - Coverage control: low-occupancy attraction prevents big empty holes
 * - Constrained to bottom band (e.g. 55%–100% height)
 */
const props = defineProps({
  count: {
    type: Number,
    default: 6,
  },
  colors: {
    type: Array,
    default: () => ['#ffffff', '#fff1c1', '#ffd27a', '#f28b6b'],
  },
  minRadius: {
    type: Number,
    default: 250,
  },
  maxRadius: {
    type: Number,
    default: 400,
  },
  bottomBandStart: {
    type: Number,
    default: 0.8,
  },
  speed: {
    type: Number,
    default: 0.12,
  },
  noiseScale: {
    type: Number,
    default: 0.0008,
  },
  noiseTimeScale: {
    type: Number,
    default: 0.00015,
  },
  targetFps: {
    type: Number,
    default: 6,
  },
  debugFps: {
    type: Boolean,
    default: false,
  },
  startDelayMs: {
    type: Number,
    default: 1500,
  },
  regenerateKey: {
    type: Number,
    default: 0,
  },
})

const canvasRef = ref(null)
const animRef = ref(0)
const noise = ref(makeNoise2D())

// Canvas state
let width = 0
let height = 0
let ctx = null
const DPR = Math.min(2, window.devicePixelRatio || 1)

// Occupancy grid
const gridCell = 80
const OCCUPANCY_WEIGHT = 0.5
const OCCUPANCY_DECAY = 0.98 // Decay factor per frame to prevent infinite accumulation
let gridCols = 0
let gridRows = 0
let grid = null

// Bubbles
let bubbles = []

// Cleanup references
let ro = null
let resizeTimer = null

function allocateGrid() {
  gridCols = Math.max(1, Math.ceil(width / gridCell))
  gridRows = Math.max(1, Math.ceil(height / gridCell))
  grid = new Float32Array(gridCols * gridRows)
}

function stampOccupancy(x, y, r) {
  // Add a small amount to nearby cells so paths get balanced over time
  const c0 = Math.floor((x - r) / gridCell)
  const c1 = Math.floor((x + r) / gridCell)
  const r0 = Math.floor((y - r) / gridCell)
  const r1 = Math.floor((y + r) / gridCell)
  for (let cy = r0; cy <= r1; cy++) {
    for (let cx = c0; cx <= c1; cx++) {
      if (cx < 0 || cy < 0 || cx >= gridCols || cy >= gridRows)
        continue
      const idx = cy * gridCols + cx
      grid[idx] += OCCUPANCY_WEIGHT
    }
  }
}

function decayGrid() {
  // Apply decay to prevent infinite accumulation
  if (!grid)
    return
  for (let i = 0; i < grid.length; i++) {
    grid[i] *= OCCUPANCY_DECAY
  }
}

function lowestOccupancyTarget() {
  // Find the lowest occupancy cell inside the bottom band
  const startRow = Math.floor(gridRows * props.bottomBandStart)
  let bestIdx = startRow * gridCols
  let bestVal = Infinity
  for (let cy = startRow; cy < gridRows; cy++) {
    for (let cx = 0; cx < gridCols; cx++) {
      const idx = cy * gridCols + cx
      const v = grid[idx]
      if (v < bestVal) {
        bestVal = v
        bestIdx = idx
      }
    }
  }
  const ty = (Math.floor(bestIdx / gridCols) + 0.5) * gridCell
  const tx = ((bestIdx % gridCols) + 0.5) * gridCell
  return { tx, ty }
}

// Poisson-ish initial placement to avoid clusters
function initBubbles() {
  bubbles = []
  const actualCount = Math.max(0, Math.floor(props.count))
  if (actualCount === 0)
    return

  const minDist = Math.max(props.minRadius * 0.2, 80)
  const maxTries = 5000
  let tries = 0
  const colorsLength = props.colors.length || 1
  while (bubbles.length < actualCount && tries < maxTries) {
    tries++
    const r = rand(props.minRadius, props.maxRadius)
    const x = rand(-r / 2, width + r / 2)
    const y = rand(height * props.bottomBandStart, height * 1.2)
    let ok = true
    for (const b of bubbles) {
      const dx = b.x - x
      const dy = b.y - y
      if (Math.hypot(dx, dy) < (b.r + r) * 0.6 || Math.hypot(dx, dy) < minDist) {
        ok = false
        break
      }
    }
    if (ok) {
      bubbles.push({
        x,
        y,
        r,
        color: props.colors[bubbles.length % colorsLength],
        vx: rand(-0.2, 0.2),
        vy: rand(-0.2, 0.2),
        jitter: rand(0.6, 1.2),
        blur: rand(200, 400),
      })
    }
  }
}

function updatePhysics(t) {
  if (bubbles.length === 0)
    return

  // Decay grid occupancy to prevent infinite accumulation
  decayGrid()

  const { tx, ty } = lowestOccupancyTarget()

  // Constants for physics calculations
  const SEPARATION_MIN_DIST_FACTOR = 0.4
  const SEPARATION_STRENGTH = 0.8
  const COVERAGE_BIAS_STRENGTH = 0.05
  const BAND_CONSTRAINT_STRENGTH = 0.01
  const DAMPING = 0.95
  const MAX_VELOCITY = 2
  const EPSILON = 1e-3

  // Update physics
  for (let i = 0; i < bubbles.length; i++) {
    const b = bubbles[i]

    // 1) Flow field (smooth wandering)
    const n = noise.value(b.x * props.noiseScale, b.y * props.noiseScale + t * props.noiseTimeScale)
    const angle = n * Math.PI * 2
    const fx = Math.cos(angle) * props.speed * b.jitter
    const fy = Math.sin(angle) * props.speed * b.jitter

    // 2) Separation (avoid clumping)
    let sx = 0
    let sy = 0
    for (let j = 0; j < bubbles.length; j++) {
      if (j !== i) {
        const o = bubbles[j]
        const dx = b.x - o.x
        const dy = b.y - o.y
        const d2 = dx * dx + dy * dy
        const minD = (b.r + o.r) * SEPARATION_MIN_DIST_FACTOR
        if (d2 < minD * minD && d2 > EPSILON) {
          const d = Math.sqrt(d2)
          const push = (minD - d) / minD // 0..1
          sx += (dx / d) * push * SEPARATION_STRENGTH
          sy += (dy / d) * push * SEPARATION_STRENGTH
        }
      }
    }

    // 3) Coverage bias (drift toward emptier cells)
    const dxT = tx - b.x
    const dyT = ty - b.y
    const dT = Math.hypot(dxT, dyT) + EPSILON
    const cx = (dxT / dT) * COVERAGE_BIAS_STRENGTH
    const cy = (dyT / dT) * COVERAGE_BIAS_STRENGTH

    // 4) Vertical band constraint
    const bandMin = height * props.bottomBandStart
    const bandMax = height * 1.5
    const bx = 0 // Horizontal band constraint (currently unused)
    let by = 0
    if (b.y < bandMin)
      by += (bandMin - b.y) * BAND_CONSTRAINT_STRENGTH
    if (b.y > bandMax)
      by -= (b.y - bandMax) * BAND_CONSTRAINT_STRENGTH

    // Combine forces
    b.vx += fx + sx + cx + bx
    b.vy += fy + sy + cy + by

    // Apply damping to prevent velocity accumulation
    b.vx *= DAMPING
    b.vy *= DAMPING

    // Velocity limits to prevent runaway motion
    const vel = Math.hypot(b.vx, b.vy)
    if (vel > MAX_VELOCITY) {
      b.vx = (b.vx / vel) * MAX_VELOCITY
      b.vy = (b.vy / vel) * MAX_VELOCITY
    }

    // Integrate
    b.x += b.vx
    b.y += b.vy

    // Soft wrap horizontally to avoid bunching at edges
    const horizontalPadding = b.r + b.blur / 3
    if (b.x < -horizontalPadding)
      b.x = width + horizontalPadding
    if (b.x > width + horizontalPadding)
      b.x = -horizontalPadding

    // Keep a little padding from exact edge vertically
    const verticalPadding = b.r * 0.25
    b.y = Math.min(Math.max(b.y, bandMin - verticalPadding), bandMax + verticalPadding)

    // Occupancy stamp
    stampOccupancy(b.x, b.y, b.r * 0.6)
  }
}

function draw() {
  if (!ctx)
    return
  for (const b of bubbles) {
    ctx.save()
    ctx.filter = `blur(${b.blur}px)`
    ctx.globalAlpha = 0.8
    ctx.beginPath()
    ctx.fillStyle = b.color
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return
  ctx = canvas.getContext('2d')
  if (!ctx)
    return

  width = canvas.clientWidth
  height = canvas.clientHeight
  if (width === 0 || height === 0)
    return

  canvas.width = Math.floor(width * DPR)
  canvas.height = Math.floor(height * DPR)
  ctx.scale(DPR, DPR)

  const effectiveFps = Math.max(1, props.targetFps)

  // 1s debounce for resize observer
  const handleResize = () => {
    if (!canvas || !ctx)
      return
    const nextWidth = canvas.clientWidth
    const nextHeight = canvas.clientHeight
    if (nextWidth === width && nextHeight === height)
      return
    if (nextWidth === 0 || nextHeight === 0)
      return
    width = nextWidth
    height = nextHeight
    canvas.width = Math.floor(width * DPR)
    canvas.height = Math.floor(height * DPR)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(DPR, DPR)
    // Recompute occupancy grid on resize
    allocateGrid()
    initBubbles()
    draw()
  }
  const onResize = (...args) => {
    if (resizeTimer !== null)
      window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      handleResize(...args)
      resizeTimer = null
    }, 1000)
  }
  ro = new ResizeObserver(onResize)
  ro.observe(canvas)

  allocateGrid()
  initBubbles()

  // Animation loop
  const FRAME_INTERVAL = 1000 / effectiveFps
  let lastTime = 0
  let accumulatedTime = 0
  let fpsStart = 0

  function frame(t) {
    if (!ctx)
      return

    // Rate limiting
    if (document.hidden) {
      animRef.value = requestAnimationFrame(frame)
      return
    }

    // Frame rate limiting
    const deltaTime = lastTime ? t - lastTime : 0
    lastTime = t
    accumulatedTime += deltaTime

    if (accumulatedTime < FRAME_INTERVAL) {
      animRef.value = requestAnimationFrame(frame)
      return
    }

    accumulatedTime = 0

    ctx.clearRect(0, 0, width, height)

    updatePhysics(t)

    draw()

    // FPS measurement (optional)
    if (props.debugFps) {
      if (fpsStart === 0)
        fpsStart = t
      if (t - fpsStart >= 1000) {
        fpsStart = t
      }
    }

    animRef.value = requestAnimationFrame(frame)
  }

  if (window.innerWidth < 640) {
    setTimeout(() => {
      animRef.value = requestAnimationFrame(frame)
    }, props.startDelayMs)
  }
  else {
    draw()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animRef.value)
  if (ro) {
    ro.disconnect()
    ro = null
  }
  if (resizeTimer !== null) {
    window.clearTimeout(resizeTimer)
    resizeTimer = null
  }
})

// Watch regenerateKey to reinitialize
watch(() => props.regenerateKey, () => {
  if (ctx && width > 0 && height > 0) {
    allocateGrid()
    initBubbles()
    draw()
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="h-full w-full" style="display: block" />
</template>

<style scoped>
canvas {
  pointer-events: none;
  background: transparent;
}
</style>
