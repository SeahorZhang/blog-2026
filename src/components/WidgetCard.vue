<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { motion } from 'motion-v'
import { useViewport } from '@/hooks/useViewport'

const props = defineProps({
  order: {
    type: Number,
    default: 0,
  },
  width: Number,
  height: Number,
  x: Number,
  y: Number,
  noHover: {
    type: Boolean,
    default: false,
  },
})

const show = ref(false)
const { isMobile } = useViewport()
let showTimer = null

function buildMotionStyle(baseStyle) {
  const style = { ...baseStyle }

  if (props.width != null) {
    style.width = props.width
  }
  if (props.height != null) {
    style.height = props.height
  }
  if (!isMobile.value) {
    if (props.x != null) {
      style.x = props.x
    }
    if (props.y != null) {
      style.y = props.y
    }
  }

  return style
}

const initialProps = computed(() => buildMotionStyle({ opacity: 0, scale: 0.6 }))
const animateProps = computed(() => buildMotionStyle({ opacity: 1, scale: 1 }))

const cardClass = computed(() => ({
  'mx-auto': isMobile.value,
  'my-3': isMobile.value,
}))

watch(
  [isMobile, () => props.order],
  () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }

    if (isMobile.value) {
      show.value = true
      return
    }

    showTimer = setTimeout(() => {
      show.value = true
      showTimer = null
    }, props.order * 200)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (showTimer) {
    clearTimeout(showTimer)
  }
})
</script>

<template>
  <motion.div
    v-if="show"
    :class="cardClass"
    :initial="initialProps"
    :animate="animateProps"
    :while-hover="props.noHover ? undefined : { scale: 1.05 }"
    :while-tap="props.noHover ? undefined : { scale: 0.95 }"
  >
    <slot />
  </motion.div>
</template>
