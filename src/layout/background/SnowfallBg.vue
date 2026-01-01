<script setup>
/**
 * 雪花背景组件
 * 使用 Canvas 绘制动态雪花效果，支持圆形和星形雪花两种样式
 */
import { useDevicePixelRatio } from '@vueuse/core'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// 组件属性定义
const props = defineProps({
  // 雪花数量
  quantity: {
    type: Number,
    default: 100,
  },
  // 雪花下落速度（基础速度）
  speed: {
    type: Number,
    default: 0.5,
  },
  // 雪花最大半径
  maxRadius: {
    type: Number,
    default: 14,
  },
  // 雪花最小半径
  minRadius: {
    type: Number,
    default: 2,
  },
  // 自定义 CSS 类名
  class: {
    type: String,
    default: '',
  },
  // 雪花形状阈值：大于此半径的雪花使用真实雪花形状，小于此值使用圆形
  snowflakeShapeThreshold: {
    type: Number,
    default: 10,
  },
})

// 常量定义
const CONSTANTS = {
  PI_OVER_3: Math.PI / 3, // 60度（六角形的角度）
  PI_OVER_6: Math.PI / 6, // 30度
  TWO_PI: Math.PI * 2, // 360度（完整圆周）
  ALPHA_MIN: 0.5, // 最小透明度
  ALPHA_MAX: 1.0, // 最大透明度
  DRIFT_RANGE: 0.5, // 水平漂移范围
  SPEED_VARIANCE: 0.25, // 速度变化范围
  ROTATION_SPEED_RANGE: 0.02, // 旋转速度范围
  RESIZE_DEBOUNCE: 100, // 窗口大小改变防抖时间（毫秒）
  SNOWFLAKE_ARMS: 6, // 雪花主臂数量（六角形）
  // 雪花颜色（白色）
  COLOR_RGB: '255, 255, 255',
}

// Canvas 相关引用
const canvasRef = ref(null) // Canvas DOM 元素引用
const canvasContainerRef = ref(null) // Canvas 容器引用
const context = ref(null) // Canvas 2D 上下文
const snowflakes = ref([]) // 雪花数组
const canvasSize = reactive({ w: 0, h: 0 }) // Canvas 尺寸
const { pixelRatio } = useDevicePixelRatio() // 设备像素比

// 动画和事件监听器引用，用于清理资源
let animationFrameId = null // 动画帧 ID
let resizeObserver = null // 窗口大小监听器
let resizeTimer = null // 防抖定时器

/**
 * 绘制分支线条
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 上下文
 * @param {number} startX - 分支起始点的 x 坐标
 * @param {number} startY - 分支起始点的 y 坐标
 * @param {number} angle - 分支角度（弧度）
 * @param {number} length - 分支长度
 */
function drawBranch(ctx, startX, startY, angle, length) {
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(
    startX + Math.cos(angle) * length,
    startY + Math.sin(angle) * length,
  )
  ctx.stroke()
}

/**
 * 绘制星形雪花
 * 绘制一个中心为六角星、周围有6条主臂的雪花形状
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 上下文
 * @param {number} x - 雪花中心的 x 坐标
 * @param {number} y - 雪花中心的 y 坐标
 * @param {number} radius - 雪花半径
 * @param {number} rotation - 雪花旋转角度（弧度）
 */
function drawSnowflakeShape(ctx, x, y, radius, rotation = 0) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)

  // 设置线条样式
  const lineWidth = Math.max(1, radius * 0.1)
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round' // 圆角端点
  ctx.lineJoin = 'round' // 圆角连接

  // 绘制中心六角星
  const starInnerRadius = radius * 0.15 // 内半径
  const starOuterRadius = radius * 0.25 // 外半径
  ctx.beginPath()
  for (let i = 0; i < CONSTANTS.SNOWFLAKE_ARMS; i++) {
    const angle = CONSTANTS.PI_OVER_3 * i - CONSTANTS.PI_OVER_6
    const outerX = Math.cos(angle) * starOuterRadius
    const outerY = Math.sin(angle) * starOuterRadius
    const innerX = Math.cos(angle + CONSTANTS.PI_OVER_6) * starInnerRadius
    const innerY = Math.sin(angle + CONSTANTS.PI_OVER_6) * starInnerRadius

    if (i === 0) {
      ctx.moveTo(outerX, outerY)
    }
    else {
      ctx.lineTo(outerX, outerY)
    }
    ctx.lineTo(innerX, innerY)
  }
  ctx.closePath()
  ctx.stroke()

  // 绘制6条主臂，每条主臂中间和末端有分支
  const mainArmLength = radius * 0.9 // 主臂长度
  const midBranchLength = radius * 0.2 // 中间分支长度
  const endBranchLength = radius * 0.25 // 末端分支长度

  for (let i = 0; i < CONSTANTS.SNOWFLAKE_ARMS; i++) {
    const angle = CONSTANTS.PI_OVER_3 * i // 主臂角度
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    // 绘制主臂（从星形边缘向外延伸）
    ctx.beginPath()
    ctx.moveTo(cosA * starOuterRadius, sinA * starOuterRadius)
    ctx.lineTo(cosA * mainArmLength, sinA * mainArmLength)
    ctx.stroke()

    // 绘制中间分支（在主臂的中间位置，左右各一条）
    const midPos = (starOuterRadius + mainArmLength) * 0.5
    const midX = cosA * midPos
    const midY = sinA * midPos

    drawBranch(ctx, midX, midY, angle + CONSTANTS.PI_OVER_3, midBranchLength)
    drawBranch(ctx, midX, midY, angle - CONSTANTS.PI_OVER_3, midBranchLength)

    // 绘制末端分支（在主臂的末端，左右各一条）
    const endX = cosA * mainArmLength
    const endY = sinA * mainArmLength

    drawBranch(ctx, endX, endY, angle + CONSTANTS.PI_OVER_3, endBranchLength)
    drawBranch(ctx, endX, endY, angle - CONSTANTS.PI_OVER_3, endBranchLength)
  }

  ctx.restore()
}

/**
 * 组件挂载时的初始化
 */
onMounted(() => {
  if (!canvasRef.value) {
    return
  }

  // 获取 Canvas 2D 上下文，启用 alpha 通道支持透明
  context.value = canvasRef.value.getContext('2d', { alpha: true })
  if (!context.value) {
    return
  }

  // 初始化 Canvas 和创建雪花
  initCanvas()

  // 使用 ResizeObserver 监听容器大小变化，性能比 window resize 事件更好
  resizeObserver = new ResizeObserver(() => {
    // 防抖处理，避免频繁触发
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      initCanvas()
    }, CONSTANTS.RESIZE_DEBOUNCE)
  })

  // 开始监听容器大小变化
  if (canvasContainerRef.value) {
    resizeObserver.observe(canvasContainerRef.value)
  }

  // 启动动画循环
  animate()
})

/**
 * 组件卸载前的清理工作
 */
onBeforeUnmount(() => {
  // 取消动画帧
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  // 断开 ResizeObserver 监听
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  // 清除防抖定时器
  if (resizeTimer) {
    clearTimeout(resizeTimer)
    resizeTimer = null
  }
})

/**
 * 初始化 Canvas
 * 调整 Canvas 尺寸并创建雪花
 */
function initCanvas() {
  if (!canvasContainerRef.value || !canvasRef.value || !context.value) {
    return
  }

  resizeCanvas()
  createSnowflakes()
}

/**
 * 调整 Canvas 尺寸
 * 根据容器大小和设备像素比设置 Canvas 的实际尺寸和显示尺寸
 */
function resizeCanvas() {
  if (!canvasContainerRef.value || !canvasRef.value || !context.value) {
    return
  }

  const container = canvasContainerRef.value
  const canvas = canvasRef.value
  const ctx = context.value

  // 获取容器尺寸，如果容器尺寸为0则使用窗口尺寸
  canvasSize.w = container.offsetWidth || window.innerWidth
  canvasSize.h = container.offsetHeight || window.innerHeight

  if (canvasSize.w === 0 || canvasSize.h === 0) {
    return
  }

  // 清空现有雪花，准备重新创建
  snowflakes.value.length = 0

  // 设置 canvas 实际尺寸（考虑设备像素比，保证高分辨率屏幕清晰度）
  const dpr = pixelRatio.value
  canvas.width = canvasSize.w * dpr
  canvas.height = canvasSize.h * dpr
  // 设置 canvas 显示尺寸（CSS 像素）
  canvas.style.width = `${canvasSize.w}px`
  canvas.style.height = `${canvasSize.h}px`

  // 重置变换矩阵并应用设备像素比缩放
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
}

/**
 * 创建所有雪花
 * 根据 quantity 属性创建指定数量的雪花
 */
function createSnowflakes() {
  const count = Math.max(0, Math.floor(props.quantity))
  snowflakes.value = []

  for (let i = 0; i < count; i++) {
    const snowflake = createSnowflake()
    snowflakes.value.push(snowflake)
  }
}

/**
 * 创建单个雪花对象
 * @returns {object} 雪花对象，包含位置、大小、透明度、速度、旋转等属性
 */
function createSnowflake() {
  const sizeRange = props.maxRadius - props.minRadius
  return {
    x: Math.random() * canvasSize.w, // 初始 x 坐标（随机）
    y: Math.random() * canvasSize.h, // 初始 y 坐标（随机）
    size: Math.random() * sizeRange + props.minRadius, // 雪花大小（在最小和最大半径之间随机）
    alpha: Math.random() * (CONSTANTS.ALPHA_MAX - CONSTANTS.ALPHA_MIN) + CONSTANTS.ALPHA_MIN, // 透明度（0.5-1.0）
    dx: (Math.random() - 0.5) * CONSTANTS.DRIFT_RANGE, // 水平漂移速度（左右摆动）
    dy: Math.random() * CONSTANTS.SPEED_VARIANCE + props.speed, // 垂直下落速度
    rotation: Math.random() * CONSTANTS.TWO_PI, // 初始旋转角度（0-360度）
    rotationSpeed: (Math.random() - 0.5) * CONSTANTS.ROTATION_SPEED_RANGE, // 旋转速度（正负值，随机方向）
  }
}

/**
 * 绘制单个雪花
 * @param {object} snowflake - 雪花对象
 */
function drawSnowflake(snowflake) {
  if (!context.value) {
    return
  }

  const ctx = context.value
  const { x, y, size, alpha, rotation } = snowflake
  // 使用白色，透明度根据雪花属性设置
  const rgba = `rgba(${CONSTANTS.COLOR_RGB}, ${alpha})`

  ctx.save()
  ctx.globalAlpha = alpha

  // 根据大小决定使用圆形还是雪花形状
  if (size >= props.snowflakeShapeThreshold) {
    // 绘制真实雪花形状（大雪花）
    ctx.strokeStyle = rgba
    ctx.fillStyle = rgba
    drawSnowflakeShape(ctx, x, y, size, rotation)
  }
  else {
    // 绘制简单圆形（小雪花）
    ctx.beginPath()
    ctx.arc(x, y, size, 0, CONSTANTS.TWO_PI)
    ctx.fillStyle = rgba
    ctx.fill()
  }

  ctx.restore()
}

/**
 * 更新雪花状态
 * 更新位置、旋转角度，并处理边界
 * @param {object} snowflake - 雪花对象
 */
function updateSnowflake(snowflake) {
  // 更新位置（根据速度移动）
  snowflake.x += snowflake.dx
  snowflake.y += snowflake.dy

  // 更新旋转（只有大雪花才旋转，小圆形不旋转）
  if (snowflake.size >= props.snowflakeShapeThreshold) {
    snowflake.rotation += snowflake.rotationSpeed
  }

  // 边界处理：当雪花移出画布底部时，重置到顶部随机位置
  if (snowflake.y > canvasSize.h + snowflake.size) {
    snowflake.y = -snowflake.size
    snowflake.x = Math.random() * canvasSize.w
  }

  // 水平边界处理：当雪花移出左右边界时，从另一侧出现（循环效果）
  const size = snowflake.size
  if (snowflake.x < -size) {
    snowflake.x = canvasSize.w + size
  }
  else if (snowflake.x > canvasSize.w + size) {
    snowflake.x = -size
  }
}

/**
 * 动画循环函数
 * 每一帧清空画布，更新所有雪花状态并重新绘制
 */
function animate() {
  // 如果 Canvas 未初始化或尺寸无效，继续请求下一帧
  if (!context.value || canvasSize.w === 0 || canvasSize.h === 0) {
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  const ctx = context.value

  // 清空画布（准备绘制新的一帧）
  ctx.clearRect(0, 0, canvasSize.w, canvasSize.h)

  // 更新并绘制每个雪花
  for (const snowflake of snowflakes.value) {
    updateSnowflake(snowflake)
    drawSnowflake(snowflake)
  }

  // 请求下一帧动画
  animationFrameId = requestAnimationFrame(animate)
}
</script>

<template>
  <div ref="canvasContainerRef" :class="$props.class" class="absolute inset-0" aria-hidden="true">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
canvas {
  display: block;
  pointer-events: none;
}
</style>
