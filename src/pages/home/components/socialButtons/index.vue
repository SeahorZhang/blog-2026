<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import WidgetCard from '@/components/WidgetCard.vue'
import { socialLinks } from '@/config/baseInfo.js'
import cardStyles from '@/config/card-styles.json'
import { useViewport } from '@/hooks/useViewport'

const cardName = 'socialButtons'
const { isMobile, width } = useViewport()
const order = cardStyles[cardName].order
const offset = cardStyles[cardName].offset

const showName = computed(() => width.value > 500)

function getItemDelay(index) {
  if (isMobile.value) {
    return 0
  }

  return (socialLinks.length - index) * 0.1
}
</script>

<template>
  <WidgetCard class="absolute p-0" :class="offset" :order="order" no-hover>
    <div class="flex justify-end gap-2">
      <motion.a
        v-for="(item, index) in socialLinks"
        :key="item.url"
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: getItemDelay(index) }"
        :while-hover="{ scale: 1.05 }"
        :href="item.url"
        target="_blank"
        class="flex cursor-pointer items-center rounded-xl border-2 border-white px-3 py-1.5 text-white"
        :style="{ backgroundColor: item.bgColor }"
      >
        <Icon class="text-3xl" :icon="item.icon" />
        <span v-if="showName">{{ item.label }}</span>
      </motion.a>
    </div>
  </WidgetCard>
</template>
