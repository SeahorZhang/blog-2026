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
  collapse: {
    type: Boolean,
    default: true,
  },
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
    v-if="show" class="card p-2" :initial="!collapse
      ? { left: 16, top: 16, width: 340, height: 64, opacity: 0, scale: 0.6 }
      : { opacity: 0, scale: 0.6, left: x, top: y, width, height }" :animate="!collapse
      ? { left: 16, top: 16, width: 340, height: 64, opacity: 1, scale: 1 }
      : { opacity: 1, scale: 1, left: x, top: y, width, height }" :while-hover="{ scale: 1.05 }"
  >
    <slot />
  </motion.div>
</template>

<style scoped></style>
