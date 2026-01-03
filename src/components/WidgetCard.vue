<script setup>
import { motion } from 'motion-v'
import { ref, watchEffect } from 'vue'
import { useViewport } from '@/hooks/useViewport'

const props = defineProps({
  order: {
    type: Number,
    default: 0,
  },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  className: {
    type: String,
    default: 'card p-2',
  },
  noHover: {
    type: Boolean,
    dfeault: false,
  },
})

const show = ref(false)
const { isMobile } = useViewport()

// 3. 响应式动画属性
const initialProps = computed(() => ({
  opacity: 0,
  scale: 0.6,
  width: props.width,
  height: props.height,
  // 移动端清除XY坐标，PC端保留
  x: isMobile.value ? 0 : props.x,
  y: isMobile.value ? 0 : props.y,
}))

const animateProps = computed(() => ({
  opacity: 1,
  scale: 1,
  width: props.width,
  height: props.height,
  x: isMobile.value ? 0 : props.x,
  y: isMobile.value ? 0 : props.y,
}))

// 4. 响应式样式类
const cardClass = computed(() => ({
  // PC端固定定位，移动端静态/块级布局
  'fixed': !isMobile.value,
  'mx-auto': isMobile.value, // 移动端水平居中
  'my-3': isMobile.value, // 移动端上下间距
}))

watchEffect(() => {
  if (isMobile.value)
    return show.value = true
  const delay = props.order * 0.2
  setTimeout(() => {
    show.value = true
  }, delay * 1000)
})
</script>

<template>
  <motion.div
    v-if="show"
    :class="[className, cardClass]"
    :initial="initialProps"
    :animate="animateProps"
    :while-hover=" props.noHover ? {} : { scale: 1.05 }"
    :while-tap=" props.noHover ? {} : { scale: 0.95 }"
  >
    <slot />
  </motion.div>
</template>

<style scoped></style>
