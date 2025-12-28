<script setup>
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
})

const cardName = 'navCard'
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = props.center.x - hiCardWidth / 2 - props.center.cardSpacing - width
const y = props.center.y + hiCardHeight / 2 - height

const navs = [
  { name: '首页', icon: 'home', link: '/' },
  { name: '工具软件', icon: 'tools', link: '/tools' },
  { name: '我的项目', icon: 'projects', link: '/projects' },
  { name: '关于', icon: 'about', link: '/about' },
]
</script>

<template>
  <WidgetCard
    class="absolute p-6"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
  >
    <div class="relative space-y-2">
      <div class="flex flex-col gap-3 mb-6">
        <div class="text-3xl leading-none font-medium ">
          Seahor
        </div>
        <div class="text-gray-600 text-sm">
          白天社畜打工人 晚上独立开发者
        </div>
      </div>
      <div
        v-for="(item, i) in navs"
        :key="i" class="text-secondary text-md relative z-10 flex items-center gap-3 rounded-full px-5 py-3"
      >
        <div class="flex h-7 w-7 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" class="text-brand absolute h-7 w-7">
            <path
              fill="currentColor"
              d="M24.733 5.911c-.155-1.555-1.089-2.333-2.644-2.333H8.4c-1.711 0-3.111 1.244-3.111 3.11v13.379H3.11v1.555c0 1.867 1.245 2.956 2.956 2.956h13.222c.311 0 .778-.156 1.089-.156 1.089-.466 1.71-1.4 1.71-2.8V10.111h2.49c.155-1.555.31-2.955.155-4.2m-7.31 17.111h-11.2c-1.09 0-1.712-.622-1.712-1.555v-.156h12.6c.156.622.311 1.089.467 1.711zM8.4 13.844c0-.466.311-.622.778-.622h4.355c.467 0 .778.311.778.622 0 .467-.311.778-.778.778h-4.51c-.312-.155-.623-.31-.623-.778m9.644-3.11H9.022c-.466 0-.778-.312-.778-.623.156-.467.312-.778.778-.778h9.022c.623 0 1.09.311 1.09.778 0 .311-.312.622-1.09.622m5.29-2.178h-1.09v-2.8c0-.312.311-.467.467-.467.311 0 .467.311.467.467v2.8z"
            />
          </svg>
        </div>
        <span class="text-primary font-medium">{{ item.name }}</span>
      </div>
    </div>
  </WidgetCard>
</template>
