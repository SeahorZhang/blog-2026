<script setup>
import { motion } from 'motion-v'
import { useAppearance } from '@/config/theme'
import SnowfallBg from './SnowfallBg.vue'

const { currentTheme } = useAppearance()
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1 }"
    class="fixed inset-0 z-[-1] overflow-hidden"
    :style="{ backgroundColor: currentTheme.background.baseColor }"
  >
    <div
      class="absolute top-0 left-[-10%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px]"
      :class="currentTheme.background.blobs[0]"
    ></div>
    <div
      class="absolute top-[-25%] left-1/2 h-[55%] w-[55%] animate-blob-center rounded-full mix-blend-multiply blur-[120px]"
      :class="currentTheme.background.blobs[1]"
    ></div>
    <div
      class="absolute top-0 right-[-10%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px]"
      :class="currentTheme.background.blobs[2]"
    ></div>
    <div
      class="absolute bottom-[-20%] left-[20%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px]"
      :class="currentTheme.background.blobs[3]"
    ></div>
    <SnowfallBg v-if="currentTheme.background.snowfall" />
  </motion.div>
</template>
