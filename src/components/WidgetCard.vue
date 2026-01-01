<script setup>
import { motion } from 'motion-v'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  order: {
    type: Number,
    default: 0,
  },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
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
    v-if="show"
    class="card p-2 absolute"
    :initial="{ opacity: 0, scale: 0.6, width, height, x, y }"
    :animate="{ opacity: 1, scale: 1, width, height, x, y }"
    :while-hover="{ scale: 1.05 }"
  >
    <slot />
  </motion.div>
</template>

<style scoped></style>
