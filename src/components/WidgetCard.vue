<script setup>
import { motion } from 'motion-v'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  order: {
    type: Number,
    default: 0,
  },
  width: Number,
  height: Number,
  x: Number,
  y: Number,
})

const show = ref(false)
watchEffect(() => {
  const delay = props.order * 0.2
  setTimeout(() => {
    show.value = true
  }, delay * 1000)
})
</script>

<template>
  <motion.div
    v-if="show" class="card p-2" :initial="{ opacity: 0, scale: 0.6, left: x, top: y, width, height }"
    :animate="{ opacity: 1, scale: 1, left: x, top: y, width, height }" :while-hover="{ scale: 1.05 }"
    :while-tap="{ scale: 0.95 }"
  >
    <slot />
  </motion.div>
</template>

<style scoped></style>
