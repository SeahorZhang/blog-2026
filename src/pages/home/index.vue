<script setup>
import CalendarCard from './components/calendarCard/index.vue'
import ClockCard from './components/clockCard/index.vue'
import HiCard from './components/hiCard/index.vue'
import SocialButtons from './components/socialButtons/index.vue'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  cardSpacing: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <HiCard v-bind="props" />
  <ClockCard v-bind="props" />
  <SocialButtons v-bind="props" />
  <CalendarCard v-bind="props" />
</template>
