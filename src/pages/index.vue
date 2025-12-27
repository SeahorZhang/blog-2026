<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import ClockCard from '@/pages/widgets/clockCard/index.vue'
import Me from '@/pages/widgets/me/index.vue'

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
  <Me :center="center" />
  <ClockCard :center="center" />
</template>
