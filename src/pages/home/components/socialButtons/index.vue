<script setup>
import { motion } from 'motion-v'
import WidgetCard from '@/components/WidgetCard.vue'
import { socialLinks } from '@/config/baseInfo.js'
import cardStyles from '@/config/card-styles.json'
import { cardSpacing, useViewport } from '@/hooks/useViewport'

const cardName = 'socialButtons'
const { isMobile, centerX, centerY, width: windowWidth } = useViewport()
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const order = cardStyles[cardName].order
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = computed(() => centerX.value + hiCardWidth / 2 - width)
const y = computed(() => centerY.value + hiCardHeight / 2 + cardSpacing)

const visibleItems = ref(Array.from({ length: socialLinks.length }, () => false))

watchEffect(() => {
  const delay = (isMobile.value ? 0 : order) * 0.2
  setTimeout(() => {
    // 逐个显示每个社交链接项
    socialLinks.forEach((_, i) => {
      setTimeout(
        () => {
          visibleItems.value[i] = true
        },
        isMobile.value ? 0 : (socialLinks.length - i) * 100,
      ) // 每个项延迟 0.1 秒
    })
  }, delay * 1000)
})

const visibleSocialLinks = computed(() => {
  return socialLinks.filter((_, i) => visibleItems.value[i])
})

const showName = computed(() => windowWidth.value > 500)
</script>

<template>
  <WidgetCard
    class-name="p-0"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
    :order="order"
    no-hover
  >
    <div class="flex justify-end gap-2">
      <motion.a
        v-for="item in visibleSocialLinks"
        :key="item.name"
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :while-hover="{ scale: 1.05 }"
        :href="item.url"
        target="_blank"
        class="flex cursor-pointer items-center rounded-xl border-2 border-white px-3 py-1.5 text-white"
        :style="{ backgroundColor: item.bgColor }"
      >
        <Icon class="text-3xl" :icon="item.icon" />
        <span v-if="showName">{{ item.name }}</span>
      </motion.a>
    </div>
  </WidgetCard>
</template>
