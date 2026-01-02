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
          src="@/assets/imgs/avatar/avatar.png" alt="App Icon"
          class="size-16 rounded-xl shadow-sm ring-1 ring-gray-200 "
        >

        <div class="flex-1">
          <div class="flex items-end gap-3">
            <h3 class="text-2xl font-bold text-gray-900 ">
              Seahor
            </h3>
            <span class="text-sm text-gray-500 ">
              {{ `v${version}` }}
            </span>
          </div>
          <p class="text-gray-600  mt-1 text-sm">
            个人主页
          </p>
        </div>

        <div class=" h-16">
          <a
            href="https://2025.zhangxihe.com"
            target="_blank"
            class="bg-card hover:bg-gray-200 rounded-lg border border-border px-3 py-1 text-sm transition-colors"
          >
            2025年主页
          </a>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 ">
        <div class="flex items-center gap-1 text-sm text-gray-500 ">
          部署时间：{{ formattedTime }}
        </div>
        <div class="flex gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            class="gap-1 flex items-center bg-card hover:bg-gray-200 rounded-lg border border-border px-3 py-1 text-sm transition-colors"
          >
            <Icon :icon="link.icon" />
            <span>{{ link.name }}</span>
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</template>
