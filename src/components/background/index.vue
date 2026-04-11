<script setup>
import { motion } from 'motion-v'
import { settings } from '@/config/baseInfo'
import SnowfallBg from './SnowfallBg.vue'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1 }"
    class="fixed inset-0 z-[-1] overflow-hidden bg-[#e9f5ff]"
  >
    <div
      class="absolute top-0 left-[-10%] h-[50%] w-[50%] animate-blob rounded-full bg-purple-200/60 mix-blend-multiply blur-[120px]"
    ></div>
    <div
      class="absolute top-[-25%] left-1/2 h-[55%] w-[55%] animate-blob-center rounded-full bg-cyan-200/60 mix-blend-multiply blur-[120px]"
    ></div>
    <div
      class="absolute top-0 right-[-10%] h-[50%] w-[50%] animate-blob rounded-full bg-blue-200/60 mix-blend-multiply blur-[120px]"
    ></div>
    <div
      class="absolute bottom-[-20%] left-[20%] h-[50%] w-[50%] animate-blob rounded-full bg-pink-200/60 mix-blend-multiply blur-[120px]"
    ></div>
    <SnowfallBg v-if="settings.christmas" />
  </motion.div>
</template>
