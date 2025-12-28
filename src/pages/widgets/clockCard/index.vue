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
})

const cardName = 'clockCard'
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const offset = cardStyles[cardName].offset
const x = props.center.x + props.center.cardSpacing + props.center.width / 2
const y = props.center.y - offset - height
const times = ref(['0', '0', '0', '0', '0', '0'])
function getTimes() {
  // 时间时分秒组成的数组，返回[h,h,m,m,s,s]
  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour12: false })
  const [hours, minutes, seconds] = timeString.split(':')
  times.value = [...hours, ...minutes, ...seconds]
}
getTimes()
useRafFn(getTimes)
</script>

<template>
  <WidgetCard
    class="absolute"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
  >
    <div className="bg-neutral-300 card-rounded flex h-full w-full items-center justify-center gap-1.5 p-2">
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
