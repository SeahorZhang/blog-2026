<script setup>
import { motion } from 'motion-v'
import { projects } from '@/config/baseInfo.js'
</script>

<template>
  <div class="grid w-full pt-32 pb-12 max-w-[1200px] mx-auto grid-cols-3 gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2">
    <motion.div
      v-for="item in projects"
      :key="item.name"
      class="card p-0 overflow-hidden"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
      :while-hover="{ scale: 1.05 }"
    >
      <div class="relative">
        <img class="h-52 w-full object-cover" :src="item.img">
        <span class="absolute top-3 left-5 bg-primary text-xs px-3 py-1 rounded-full text-white">{{ item.type }}</span>
      </div>
      <div class="p-6">
        <h3 class="mb-3 text-xl font-semibold flex justify-between items-center">
          <span>{{ item.name }}</span>
          <a :href="item.url" target="_blank" class="text-sm text-primary hover:text-primary/80 px-2 py-1 ">
            了解更多
            <span aria-hidden="true">
              ↗
            </span>
          </a>
        </h3>
        <h3 class="mb-3 text-xl font-semibold flex justify-between items-center">
          <span>{{ item.info }}</span>
        </h3>
        <p class="text-secondary text-sm leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </motion.div>
  </div>
</template>
