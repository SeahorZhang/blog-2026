<script setup>
import { motion } from 'motion-v'
import { socialLinks } from '@/config/baseInfo.js'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  cardSpacing: {
    type: Number,
    required: true,
  },
})

const cardName = 'socialButtons'
const width = cardStyles[cardName].width
const order = cardStyles[cardName].order
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = computed(() => props.center.x + hiCardWidth / 2 - width)
const y = computed(() => props.center.y + hiCardHeight / 2 + props.cardSpacing)

const show = ref(false)
const visibleItems = ref(Array.from({ length: socialLinks.length }, () => false))

watchEffect(() => {
  const delay = order * 0.2
  setTimeout(() => {
    show.value = true
    // 逐个显示每个社交链接项
    socialLinks.forEach((_, i) => {
      setTimeout(() => {
        visibleItems.value[i] = true
      }, (socialLinks.length - i) * 100) // 每个项延迟 0.1 秒
    })
  }, delay * 1000)
})

const visibleSocialLinks = computed(() => {
  return socialLinks.filter((_, i) => visibleItems.value[i])
})
</script>

<template>
  <div
    v-if="show"
    class="absolute flex gap-2 justify-end"
    :style="{ left: `${x}px`, top: `${y}px`, width: `${width}px` }"
  >
    <motion.a
      v-for="(item) in visibleSocialLinks"
      :key="item.name"
      :initial="{ opacity: 0, scale: 0.6 }"
      :animate="{ opacity: 1, scale: 1 }"
      :while-hover="{ scale: 1.05 }"
      :href="item.url"
      target="_blank"
      class="flex items-center  rounded-xl border-2 border-white   text-white px-3 py-1.5 cursor-pointer"
      :style="{ backgroundColor: item.bgColor }"
    >
      <Icon class="text-3xl" :icon="item.icon" />
      {{ item.name }}
    </motion.a>
  </div>
</template>
