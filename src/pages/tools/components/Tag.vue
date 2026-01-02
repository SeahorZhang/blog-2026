<script setup>
const { text } = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const colors = {
  免费: {
    color: '#3451b2',
    bgColor: 'rgba(100, 108, 255, .14)',
  },
  基础免费: {
    color: '#3451b2',
    bgColor: 'rgba(100, 108, 255, .14)',
  },
  收费: {
    color: '#915930',
    bgColor: 'rgba(234, 179, 8, .14)',
  },
}
</script>

<template>
  <span
    class="text-secondary rounded-sm px-1 py-0.5 text-xs"
    :style="{ backgroundColor: colors[text].bgColor, color: colors[text].color }"
  >
    {{ text }}
  </span>
</template>
