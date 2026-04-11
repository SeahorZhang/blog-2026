<script setup>
import { useRoute } from 'vue-router'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'
import { useViewport } from '@/hooks/useViewport'

const route = useRoute()
const cardName = 'navCard'
const { isMobile, centerX, centerY } = useViewport()
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const order = cardStyles[cardName].order
const offset = cardStyles[cardName].offset
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = computed(() => centerX.value - hiCardWidth / 2)
const y = computed(() => centerY.value - hiCardHeight / 2)

const navs = [
  { name: '首页', icon: 'solar:home-angle-2-broken', link: '/' },
  { name: '工具软件', icon: 'solar:widget-2-broken', link: '/tools' },
  { name: '我的项目', icon: 'solar:emoji-funny-circle-broken', link: '/projects' },
  { name: '关于', icon: 'solar:document-broken', link: '/about' },
]

const collapse = computed(() => route.name === 'home' && !isMobile.value)
const cardInfo = computed(() => {
  if (!collapse.value) {
    return {
      width: 294,
      height: 64,
      x: 16,
      y: 16,
    }
  } else {
    return {
      width,
      height,
      x: x.value - 45,
      y: y.value,
      offset,
    }
  }
})
</script>

<template>
  <WidgetCard
    :order="collapse ? order : 0"
    :class="[
      !collapse ? 'flex items-center justify-center gap-1.5 p-0' : 'space-y-2 overflow-hidden p-6',
      cardInfo.offset,
      isMobile ? '' : 'fixed',
    ]"
    class="z-1 card"
    :width="cardInfo.width"
    :height="cardInfo.height"
    :x="isMobile ? 0 : cardInfo.x"
    :y="isMobile ? 0 : cardInfo.y"
  >
    <div v-if="collapse" class="mb-6 flex flex-col gap-3">
      <div class="text-3xl leading-none font-medium">Seahor</div>
      <div class="text-sm text-gray-600">白天社畜打工人 晚上独立开发者</div>
    </div>
    <RouterLink
      v-for="item in navs"
      :key="item.link"
      :to="item.link"
      class="flex items-center gap-3 rounded-full px-5 py-3 text-stone-500 transition-colors duration-200 hover:bg-white hover:text-stone-900"
      active-class="text-stone-900 bg-white"
    >
      <Icon :icon="item.icon" class="h-6 w-6 [&_path]:stroke-2" />
      <span v-if="collapse" class="font-medium">{{ item.name }}</span>
    </RouterLink>
  </WidgetCard>
</template>
