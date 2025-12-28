<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import ClockCard from '@/pages/widgets/clockCard/index.vue'
import HiCard from '@/pages/widgets/hiCard/index.vue'
import NavCard from '@/pages/widgets/navCard/index.vue'

const { width: innerWidth, height: innerHeight } = useWindowSize()

const center = computed(() => ({
  cardSpacing: 36,
  width: 360,
  height: 310,
  x: Math.floor(innerWidth.value / 2),
  y: Math.floor(innerHeight.value / 2),
}))
</script>

<template>
  <HiCard :center="center" :order="1" />
  <ClockCard :center="center" :order="2" />
  <NavCard :center="center" :order="3" />
</template>
