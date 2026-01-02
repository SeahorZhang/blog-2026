<script setup>
import { motion } from 'motion-v'
import tools from '@/config/tools.js'
import Img from './components/Img.vue'
import Tag from './components/Tag.vue'
</script>

<template>
  <div class="w-full pt-32 pb-12 max-w-[1000px] mx-auto ">
    <div v-for="({ text, items }, i) in tools" :key="i">
      <h3 class="mt-8 mb-3 text-lg font-semibold">
        {{ text }}
      </h3>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <motion.div
          v-for="item in items"
          :key="item.name"
          class="card rounded-2xl p-2.5 overflow-hidden gap-2 flex flex-col"
          :initial="{ opacity: 0, scale: 0.6 }"
          :animate="{ opacity: 1, scale: 1 }"
        >
          <div class="flex  gap-2">
            <Img :icon="item.icon" :app-name="item.text" />
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-2 ">
                <span class="font-semibold text-xl">{{ item.text }}</span>
                <Tag
                  v-for="tag in item.tags"
                  :key="tag"
                  :text="tag"
                />
              </div>
              <div class="text-xs text-stone-600">
                {{ item.review }}
              </div>
            </div>
          </div>
          <p class="flex-1 text-xs leading-relaxed text-stone-600 px-1.5">
            {{ item.desc }}
          </p>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="link in item.links"
              :key="link.url"
              target="_blank"
              :href="link.url"
              class="bg-card hover:bg-gray-200 rounded-lg border border-border px-3 py-1 text-sm transition-colors"
            >
              {{ link.text }}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</template>
