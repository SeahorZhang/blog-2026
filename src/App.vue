<script setup>
import Background from '@/components/background/index.vue'
</script>

<template>
  <Background />
  <router-view v-slot="{ Component }" name="navVidw">
    <component :is="Component" />
  </router-view>

  <div class="px-6">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
