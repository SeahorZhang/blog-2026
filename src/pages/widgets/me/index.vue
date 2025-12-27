<script setup>
import { computed } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
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

const x = props.center.x - props.center.width / 2
const y = props.center.y - props.center.height / 2
</script>

<template>
  <WidgetCard
    class="w-80 p-6 text-center absolute"
    :style="{ width: `${props.center.width}px`, height: `${props.center.height}px`, top: `${y}px`, left: `${x}px` }"
  >
    <img
      src="@/assets/imgs/avatar.png" alt="Me" class="w-28 h-28 rounded-full mx-auto mb-4"
      :style="{ boxShadow: ' 0 16px 32px -5px #E2D9CE' }"
    >
    <h1 class="font-averia mt-3 text-2xl ">
      {{ greeting }}！ <br> 我是 <span class="text-linear text-[32px]"> Seahor </span> ，
      很高兴 <br> 见到你！
    </h1>
  </WidgetCard>
</template>
