<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import Background from './layout/background/index.vue'

const { width: innerWidth, height: innerHeight } = useWindowSize()
const cardSpacing = 36

const center = computed(() => ({
  x: Math.floor(innerWidth.value / 2),
  y: Math.floor(innerHeight.value / 2),
}))
</script>

<template>
  <Background />
  <router-view v-slot="{ Component }" name="navVidw">
    <component :is="Component" :center="center" :card-spacing="cardSpacing" :order="2" />
  </router-view>

  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="['home'].includes(route.name)" :center="center" :card-spacing="cardSpacing" />
    <component :is="Component" v-else :card-spacing="cardSpacing" />
  </router-view>
</template>

<style scoped></style>
