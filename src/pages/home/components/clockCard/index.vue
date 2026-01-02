<script setup>
import { useRafFn } from '@vueuse/core'
import { ref } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'
import Colon from './components/Colon.vue'
import SevenSegmentDigit from './components/SevenSegmentDigit.vue'

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

const cardName = 'clockCard'
const width = cardStyles[cardName].width
const order = cardStyles[cardName].order
const hiCardWidth = cardStyles.hiCard.width
const height = cardStyles[cardName].height
const offset = cardStyles[cardName].offset
const x = computed(() => props.center.x + props.cardSpacing + hiCardWidth / 2)
const y = computed(() => props.center.y - offset - height)

const times = ref(['0', '0', '0', '0', '0', '0'])
function getTimes() {
  // 时间时分秒组成的数组，返回[h,h,m,m,s,s]
  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour12: false })
  const [hours, minutes, seconds] = timeString.split(':')
  times.value = [...hours, ...minutes, ...seconds]
}
useRafFn(getTimes)
</script>

<template>
  <WidgetCard :width="width" :height="height" :x="x" :y="y" :order="order">
    <div className="bg-neutral-300 rounded-4xl flex size-full items-center justify-center gap-1.5 p-2">
      <SevenSegmentDigit :value="times[0]" />
      <SevenSegmentDigit :value="times[1]" />
      <Colon />
      <SevenSegmentDigit :value="times[2]" />
      <SevenSegmentDigit :value="times[3]" />
      <Colon />
      <SevenSegmentDigit :value="times[4]" />
      <SevenSegmentDigit :value="times[5]" />
    </div>
  </WidgetCard>
</template>
