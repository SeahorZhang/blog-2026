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
    class="fixed inset-0 z-[-1] overflow-hidden transition-[background-color,background-image] duration-500 ease-out"
    :style="{
      backgroundColor: currentTheme.background.baseColor,
      backgroundImage: currentTheme.background.backgroundImage,
    }"
  >
    <div
      class="absolute top-0 left-[-10%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px] transition-colors duration-500 ease-out"
      :class="currentTheme.background.blobs[0]"
    ></div>
    <div
      class="absolute top-[-25%] left-1/2 h-[55%] w-[55%] animate-blob-center rounded-full mix-blend-multiply blur-[120px] transition-colors duration-500 ease-out"
      :class="currentTheme.background.blobs[1]"
    ></div>
    <div
      class="absolute top-0 right-[-10%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px] transition-colors duration-500 ease-out"
      :class="currentTheme.background.blobs[2]"
    ></div>
    <div
      class="absolute bottom-[-20%] left-[20%] h-[50%] w-[50%] animate-blob rounded-full mix-blend-multiply blur-[120px] transition-colors duration-500 ease-out"
      :class="currentTheme.background.blobs[3]"
    ></div>

    <SnowfallBg
      v-if="currentTheme.background.snowfall"
      :quantity="72"
      :speed="0.42"
      :max-radius="10"
      :min-radius="1.5"
      class="opacity-55 transition-opacity duration-500 ease-out"
    />
  </motion.div>
</template>
