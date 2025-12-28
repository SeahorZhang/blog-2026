<script setup>
import ClockCard from '@/pages/widgets/clockCard/index.vue'
import HiCard from '@/pages/widgets/hiCard/index.vue'
import SocialButtons from '@/pages/widgets/socialButtons/index.vue'

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
  <SocialButtons :center="props.center" :order="4" />
</template>
