<script setup>
// import { computed } from 'vue'
import { motion } from 'motion-v'
import { version } from '~build/package'
import now from '~build/time'
import { socialLinks } from '@/config/baseInfo.js'
import { useAppearance } from '@/config/theme'
import { useViewport } from '@/hooks/useViewport'

const { isMobile } = useViewport()
const {
  currentAvatar,
  //  siteAppearance, avatarOptions, themeOptions, setAvatar, setTheme
} = useAppearance()
const formattedTime = new Date(now).toLocaleString()

// const settingGroups = computed(() => [
//   {
//     key: 'theme',
//     title: '页面主题',
//     description: '微调整体气质与背景颜色',
//     value: siteAppearance.theme,
//     options: themeOptions,
//     update: setTheme,
//   },
//   {
//     key: 'avatar',
//     title: '头像样式',
//     description: '选择默认头像或节日头像',
//     value: siteAppearance.avatar,
//     options: avatarOptions,
//     update: setAvatar,
//   },
// ])
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

    <!-- <motion.div
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
        <section
          v-for="group in settingGroups"
          :key="group.key"
          class="rounded-[28px] border border-white/65 bg-white/40 p-4"
        >
          <div class="mb-4">
            <div class="text-sm font-semibold text-gray-800">{{ group.title }}</div>
            <p class="mt-1 text-sm text-gray-500">{{ group.description }}</p>
          </div>

          <div class="space-y-3">
            <button
              v-for="option in group.options"
              :key="option.value"
              type="button"
              class="group w-full rounded-[22px] border p-3 text-left transition-all duration-250"
              :class="option.value === group.value
                ? 'border-white/85 bg-white/82 shadow-[0_22px_44px_-26px_rgba(51,65,85,.34)] -translate-y-[1px]'
                : 'border-white/55 bg-white/52 hover:bg-white/72 hover:-translate-y-[1px]'"
              @click="group.update(option.value)"
            >
              <div class="flex items-start gap-3">
                <div
                  class="h-15 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-1.5 transition-all duration-250"
                  :class="option.value === group.value ? 'shadow-[0_14px_26px_-20px_rgba(15,23,42,.38)]' : ''"
                >
                  <div
                    class="relative h-full w-full overflow-hidden rounded-[12px] transition-all duration-250"
                    :class="option.value === group.value ? 'scale-[1.03] saturate-110 brightness-102' : 'saturate-95'"
                    :style="{ background: option.surface.background }"
                  >
                    <div class="absolute inset-0 transition-opacity duration-250" :style="{ background: option.surface.accent }"></div>
                    <div
                      class="absolute left-[10%] top-[12%] h-6 w-6 rounded-full bg-white/55 blur-md transition-all duration-250"
                      :class="option.value === group.value ? 'opacity-100 scale-105' : 'opacity-80'"
                    ></div>
                    <div
                      class="absolute bottom-[16%] right-[12%] h-10 w-10 rounded-full bg-white/35 blur-xl transition-all duration-250"
                      :class="option.value === group.value ? 'opacity-100 scale-110' : 'opacity-75'"
                    ></div>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <div class="text-sm font-semibold text-gray-900">{{ option.label }}</div>
                      <p class="mt-1 text-xs leading-5 text-gray-500">{{ option.description }}</p>
                    </div>
                    <div
                      class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-250"
                      :class="option.value === group.value ? 'border-primary bg-primary text-white scale-105 shadow-[0_8px_18px_-10px_rgba(222,67,49,.65)]' : 'border-gray-300 bg-white text-transparent'"
                    >
                      <Icon icon="tabler:check" class="text-xs" />
                    </div>
                  </div>

                  <div class="mt-3 flex gap-2">
                    <span
                      v-for="color in option.preview"
                      :key="color"
                      class="h-2.5 flex-1 rounded-full transition-all duration-250"
                      :class="option.value === group.value ? 'scale-y-110 shadow-[0_8px_18px_-12px_rgba(51,65,85,.5)]' : ''"
                      :style="{ background: color }"
                    ></span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
    </motion.div> -->
  </div>
</template>
