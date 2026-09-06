<script setup>
import { computed } from 'vue'
import CalendarCard from './components/calendarCard/index.vue'
import ClockCard from './components/clockCard/index.vue'
import HiCard from './components/hiCard/index.vue'
import SocialButtons from './components/socialButtons/index.vue'
import { useViewport } from '@/hooks/useViewport'

const { isMobile, centerX, centerY } = useViewport()
const centerStyle = computed(() => ({
  left: `${centerX.value}px`,
  top: `${centerY.value-50}px`,
}))
</script>

<template>
  <div
    :class="isMobile ? '' : 'absolute -translate-x-1/2 -translate-y-1/2'"
    :style="centerStyle"
  >
    <HiCard />
    <ClockCard />
    <SocialButtons />
    <CalendarCard />
  </div>
</template>
