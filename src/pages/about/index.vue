<script setup>
import { motion } from 'motion-v'
import { version } from '~build/package'
import now from '~build/time'
import { socialLinks } from '@/config/baseInfo.js'
import { useViewport } from '@/hooks/useViewport'
const { isMobile } = useViewport()

const formattedTime = new Date(now).toLocaleString()
</script>

<template>
  <div class="mx-auto max-w-[1000px] space-y-6">
    <motion.div
      class="card"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
    >
      <div class="flex items-center gap-4" :class="{ 'flex-col': isMobile }">
        <img
          src="@/assets/imgs/avatar/avatar.png"
          alt="App Icon"
          class="size-16 rounded-xl shadow-sm ring-1 ring-gray-200"
        />

        <div class="flex-1" :class="{ 'text-center': isMobile }">
          <h3 class="text-2xl font-bold text-gray-900">Seahor</h3>
          <p class="mt-1 text-sm text-gray-600">个人主页</p>
        </div>

        <a
          href="https://2025.zhangxihe.com"
          target="_blank"
          class="rounded-lg border border-border bg-card px-3 py-1 text-sm transition-colors hover:bg-gray-200"
        >
          2025年主页
        </a>
      </div>

      <div
        class="mt-4 flex items-center justify-between gap-2 border-t border-gray-200 pt-4"
        :class="{ 'flex-col': isMobile }"
      >
        <div class="flex items-center text-sm text-gray-500">
          <span>部署时间：{{ formattedTime }}</span>
          <div class="mx-2 h-3 border-l border-gray-200"></div>
          <span class="text-sm text-gray-500">
            {{ `v${version}` }}
          </span>
        </div>
        <div class="flex gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1 text-sm transition-colors hover:bg-gray-200"
          >
            <Icon :icon="link.icon" />
            <span>{{ link.name }}</span>
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</template>
