<script setup>
import { watchEffect } from 'vue'
import Background from '@/components/background/index.vue'
import { useAppearance } from '@/config/theme'

const { currentTheme } = useAppearance()

watchEffect(() => {
  Object.entries(currentTheme.value.cssVars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
})
</script>

<template>
  <Background />
  <router-view v-slot="{ Component }" name="navView">
    <component :is="Component" />
  </router-view>

  <div class="px-6">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
