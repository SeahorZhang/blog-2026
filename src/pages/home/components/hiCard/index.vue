<script setup>
import { computed } from 'vue'
import avatarImg from '@/assets/imgs/avatar/avatar.png'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'

const cardName = 'hiCard'
const { width, height, order } = cardStyles[cardName]

function getGreeting() {
  const hour = new Date().getHours()

  if (hour >= 6 && hour < 12) {
    return '早上好'
  }
  if (hour >= 12 && hour < 18) {
    return '下午好'
  }
  if (hour >= 18 && hour < 22) {
    return '晚上好'
  }

  return '晚安'
}

const greeting = getGreeting()
const avatarStyle = computed(() => ({
  boxShadow: '0 16px 32px -5px #E2D9CE',
}))
</script>

<template>
  <WidgetCard class="card p-6" :order="order" :width="width" :height="height">
    <img
      :src="avatarImg"
      alt="Me"
      width="112"
      height="112"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      class="mx-auto mb-4 h-28 w-28 rounded-full"
      :style="avatarStyle"
    />
    <h1 class="font-averia mt-3 text-center text-2xl">
      {{ greeting }}！ <br />
      我是 <span class="text-linear text-[32px]"> Seahor </span> ， 很高兴 <br />
      见到你！
    </h1>
  </WidgetCard>
</template>
