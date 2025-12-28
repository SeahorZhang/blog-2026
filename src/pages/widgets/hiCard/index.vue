<script setup>
import { computed } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    return '早上好'
  }
  else if (hour >= 12 && hour < 18) {
    return '下午好'
  }
  else if (hour >= 18 && hour < 22) {
    return '晚上好'
  }
  else {
    return '晚安'
  }
})

const cardName = 'hiCard'
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const x = props.center.x - width / 2
const y = props.center.y - height / 2
</script>

<template>
  <WidgetCard
    class="w-80 p-6 flex flex-col justify-center items-center absolute"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
  >
    <img
      src="@/assets/imgs/avatar.svg" alt="Me" class="w-28 h-28 rounded-full mx-auto mb-4"
      :style="{ boxShadow: '0 16px 32px -5px #E2D9CE' }"
    >
    <h1 class="font-averia mt-3 text-2xl text-center">
      {{ greeting }}！ <br> 我是 <span class="text-linear text-[32px]"> Seahor </span> ，
      很高兴 <br> 见到你！
    </h1>
  </WidgetCard>
</template>
