<script setup>
import Background from '@/components/background/index.vue'
</script>

<template>
  <Background />
  <router-view v-slot="{ Component }" name="navVidw">
    <component :is="Component" />
  </router-view>

  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="['home'].includes(route.name)" />
    <component :is="Component" v-else />
  </router-view>
</template>

<style scoped></style>
