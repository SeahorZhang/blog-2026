<script setup>
import { motion } from 'motion-v'
import { version } from '~build/package'
import now from '~build/time'
import { socialLinks } from '@/config/baseInfo.js'

const formattedTime = new Date(now).toLocaleString()
</script>

<template>
  <div class="w-[700px] mx-auto pt-32 space-y-6">
    <motion.div class="card" :initial="{ opacity: 0, scale: 0.6 }" :animate="{ opacity: 1, scale: 1 }">
      <div class="flex items-center gap-4">
        <img
          src="@/assets/imgs/avatar.png" alt="App Icon"
          class="w-16 h-16 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
        >

        <div class="flex-1">
          <div class="flex items-end gap-3">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Seahor
            </h1>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ `v${version}` }}
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            个人主页
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Icon icon="tabler-clock-up" />
          <span>{{ formattedTime }}</span>
        </div>
        <div class="flex gap-2">
          <a
            v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank"
            class="group relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Icon
              :icon="link.icon"
              class="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300"
            />
            <span
              class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 text-sm font-medium"
            >
              {{ link.name }}
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</template>
