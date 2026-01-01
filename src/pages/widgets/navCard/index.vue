<script setup>
import { useRoute } from 'vue-router'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  cardSpacing: {
    type: Number,
    required: true,
  },
})

const route = useRoute()
const cardName = 'navCard'
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = computed(() => props.center.x - hiCardWidth / 2 - props.cardSpacing - width)
const y = computed(() => props.center.y + hiCardHeight / 2 - height)

const navs = [
  { name: '首页', icon: 'solar:home-angle-2-broken', link: '/' },
  { name: '工具软件', icon: 'solar:widget-2-broken', link: '/tools' },
  { name: '我的项目', icon: 'solar:emoji-funny-circle-broken', link: '/projects' },
  { name: '关于', icon: 'solar:document-broken', link: '/about' },
]

const collapse = computed(() => route.name === 'home')
const collapseWidth = 340
const collapseHeight = 64
const collapseX = 16
const collapseY = 16
const cardInfo = computed(() => {
  if (!collapse.value) {
    return {
      width: collapseWidth,
      height: collapseHeight,
      x: collapseX,
      y: collapseY,
    }
  }
  else {
    return {
      width,
      height,
      x: x.value,
      y: y.value,
    }
  }
})
</script>

<template>
  <WidgetCard
    :width="cardInfo.width" :height="cardInfo.height" :x="cardInfo.x" :y="cardInfo.y"
    :order="collapse ? props.order : 0"
    :class="!collapse ? 'flex p-0 items-center' : 'p-6 space-y-2 overflow-hidden'"
  >
    <div v-if="collapse" class="flex flex-col gap-3 mb-6">
      <div class="text-3xl leading-none font-medium ">
        Seahor
      </div>
      <div class="text-gray-600 text-sm">
        白天社畜打工人 晚上独立开发者
      </div>
    </div>
    <RouterLink
      v-for="(item, i) in navs" :key="i" :to="item.link"
      class="flex items-center gap-3 rounded-full px-5 py-3 text-stone-500 hover:text-stone-900 hover:bg-white transition-colors duration-200"
      active-class="text-stone-900 bg-white"
    >
      <Icon :icon="item.icon" class="h-7 w-7 [&_path]:stroke-2" />
      <span v-if="collapse" class="text-primary font-medium">{{ item.name }}</span>
    </RouterLink>
  </WidgetCard>
</template>
