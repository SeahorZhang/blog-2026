<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import Background from './layout/background/index.vue'

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
  <Background />
  <router-view v-slot="{ Component }" name="navVidw">
    <component :is="Component" :center="center" :order="3" />
  </router-view>

  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="['home'].includes(route.name)" :center="center" />
    <component :is="Component" v-else />
  </router-view>
</template>

<style scoped></style>
