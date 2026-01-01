<script setup>
import CalendarCard from '@/pages/widgets/calendarCard/index.vue'
import ClockCard from '@/pages/widgets/clockCard/index.vue'
import HiCard from '@/pages/widgets/hiCard/index.vue'
import SocialButtons from '@/pages/widgets/socialButtons/index.vue'

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
  <ClockCard v-bind="props" :order="1" />
  <SocialButtons v-bind="props" :order="3" />
  <CalendarCard v-bind="props" :order="4" />
</template>
