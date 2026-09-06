<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'
import Colon from './components/Colon.vue'
import SevenSegmentDigit from './components/SevenSegmentDigit.vue'
import { useViewport } from '@/hooks/useViewport'

const { isMobile } = useViewport()
const cardName = 'clockCard'
const { width, height, order, offset } = cardStyles[cardName]
const positionClass = `absolute ${offset}`

const times = ref(['0', '0', '0', '0', '0', '0'])
let timer = null

function updateTimes() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  times.value = [...hours, ...minutes, ...seconds]
}

function scheduleNextTick() {
  updateTimes()

  const delay = 1000 - new Date().getMilliseconds()
  timer = setTimeout(scheduleNextTick, delay)
}

onMounted(() => {
  scheduleNextTick()
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <WidgetCard
    class="card p-2"
    :class="isMobile ? '' : positionClass"
    :order="order"
    :width="width"
    :height="height"
  >
    <div class="flex size-full items-center justify-center gap-1.5 rounded-4xl bg-neutral-300 p-2">
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
