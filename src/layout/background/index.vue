<script setup>
import { motion } from 'motion-v'
import BlurredBubbles from './BlurredBubbles.vue'
import SnowfallBg from './SnowfallBg.vue'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1 }"
    class="fixed inset-0 z-0 overflow-hidden"
  >
    <div class="absolute inset-0 z-0 blur-[50px]">
      <BlurredBubbles />
    </div>
    <SnowfallBg class="z-10" />
  </motion.div>
</template>
