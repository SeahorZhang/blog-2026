<script setup>
import { motion } from 'motion-v'
import { projects } from '@/config/baseInfo.js'
</script>

<template>
  <div
    class="mx-auto grid w-full max-w-[1000px] grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
  >
    <motion.div
      v-for="item in projects"
      :key="item.name"
      class="overflow-hidden card p-0"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
      :while-hover="{ scale: 1.05 }"
    >
      <div class="relative">
        <img class="h-52 w-full object-cover" :src="item.img" />
        <span class="absolute top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs text-white">{{
          item.type
        }}</span>
      </div>
      <div class="p-6">
        <h3 class="mb-3 flex items-center justify-between text-xl font-semibold">
          <span>{{ item.name }}</span>
          <a
            :href="item.url"
            target="_blank"
            class="px-2 py-1 text-sm text-primary hover:text-primary/80"
          >
            了解更多
            <span aria-hidden="true"> ↗ </span>
          </a>
        </h3>
        <h3 class="mb-3 flex items-center justify-between text-xl font-semibold">
          <span>{{ item.info }}</span>
        </h3>
        <p class="text-secondary text-sm leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </motion.div>
  </div>
</template>
