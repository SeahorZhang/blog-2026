<script setup>
import Background from '@/components/background/index.vue'
import { useViewport } from '@/hooks/useViewport'
const { isMobile } = useViewport()
</script>

<template>
  <Background />
  <router-view v-slot="{ Component }" name="navVidw">
    <component :is="Component" />
  </router-view>

  <div :class="{ 'pt-32': !isMobile }" class="px-6">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" v-if="['home'].includes(route.name)" />
      <component :is="Component" v-else />
    </router-view>
  </div>
</template>

<style scoped></style>
