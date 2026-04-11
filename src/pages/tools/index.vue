<script setup>
import { motion } from 'motion-v'
import tools from '@/config/tools.js'
import Img from './components/Img.vue'
import Tag from './components/Tag.vue'
import { useViewport } from '@/hooks/useViewport'

const { isMobile } = useViewport()
</script>

<template>
  <div class="mx-auto w-full max-w-250" :class="{ 'py-32': !isMobile }">
    <div v-for="group in tools" :key="group.title">
      <h3 class="mt-8 mb-3 text-lg font-semibold">
        {{ group.title }}
      </h3>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <motion.div
          v-for="item in group.items"
          :key="item.name"
          class="flex flex-col gap-2 overflow-hidden card rounded-2xl p-2.5"
          :initial="{ opacity: 0, scale: 0.6 }"
          :animate="{ opacity: 1, scale: 1 }"
        >
          <div class="flex gap-2">
            <Img :icon="item.icon" />
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-2">
                <span class="text-xl font-semibold">{{ item.name }}</span>
                <Tag v-for="tag in item.tags" :key="tag" :text="tag" />
              </div>
              <div class="text-xs text-stone-600">
                {{ item.review }}
              </div>
            </div>
          </div>
          <p class="flex-1 px-1.5 text-xs leading-relaxed text-stone-600">
            {{ item.desc }}
          </p>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="link in item.links"
              :key="link.url"
              target="_blank"
              :href="link.url"
              class="rounded-lg border border-border bg-card px-3 py-1 text-sm transition-colors hover:bg-gray-200"
            >
              {{ link.label }}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</template>
