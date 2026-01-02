<script setup>
import { motion } from 'motion-v'
import { settings } from '@/config/baseInfo'
import BlurredBubbles from './BlurredBubbles.vue'
import SnowfallBg from './SnowfallBg.vue'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1 }"
    class="fixed inset-0 -z-1 overflow-hidden"
  >
    <div class="absolute inset-0 blur-[50px]">
      <BlurredBubbles />
    </div>
    <SnowfallBg v-if="settings.christmas" />
  </motion.div>
</template>
