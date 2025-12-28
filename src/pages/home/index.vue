<script setup>
import ClockCard from '@/pages/widgets/clockCard/index.vue'
import HiCard from '@/pages/widgets/hiCard/index.vue'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <HiCard :center="props.center" :order="1" />
  <ClockCard :center="props.center" :order="2" />
</template>
