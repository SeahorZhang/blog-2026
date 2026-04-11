<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import { version } from '~build/package'
import now from '~build/time'
import { socialLinks } from '@/config/baseInfo.js'
import { useAppearance } from '@/config/theme'
import { useViewport } from '@/hooks/useViewport'

const { isMobile } = useViewport()
const { currentAvatar, siteAppearance, avatarOptions, themeOptions, setAvatar, setTheme } = useAppearance()
const formattedTime = new Date(now).toLocaleString()

const settingGroups = computed(() => [
  {
    key: 'theme',
    title: '页面主题',
    value: siteAppearance.theme,
    options: themeOptions,
    update: setTheme,
  },
  {
    key: 'avatar',
    title: '头像样式',
    value: siteAppearance.avatar,
    options: avatarOptions,
    update: setAvatar,
  },
])
</script>

<template>
  <div class="mx-auto max-w-250 space-y-6" :class="{ 'pt-32': !isMobile }">
    <motion.div
      class="card"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
    >
      <div class="flex items-center gap-4" :class="{ 'flex-col': isMobile }">
        <img
          :src="currentAvatar.image"
          alt="App Icon"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
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
            :key="link.url"
            :href="link.url"
            target="_blank"
            class="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1 text-sm transition-colors hover:bg-gray-200"
          >
            <Icon :icon="link.icon" />
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </motion.div>

    <motion.div
      class="card p-6"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ delay: 0.08 }"
    >
      <div class="mb-5">
        <h3 class="text-xl font-semibold text-gray-900">主题设置</h3>
        <p class="mt-1 text-sm text-gray-600">
          可以分别切换页面主题和头像样式，设置会自动保存在当前浏览器。
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="group in settingGroups"
          :key="group.key"
          class="rounded-3xl border border-white/60 bg-white/45 p-4"
        >
          <div class="mb-3 text-sm font-medium text-gray-500">{{ group.title }}</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in group.options"
              :key="option.value"
              type="button"
              class="rounded-full border px-4 py-2 text-sm font-medium transition-all"
              :class="option.value === group.value
                ? 'border-border bg-primary text-white shadow-sm'
                : 'border-white/70 bg-white/70 text-gray-700 hover:bg-white'"
              @click="group.update(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</template>
