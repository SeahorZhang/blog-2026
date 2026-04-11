<script setup>
import { computed } from 'vue'

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
  官网免费: {
    color: '#3451b2',
    bgColor: 'rgba(100, 108, 255, .14)',
  },
  收费: {
    color: '#915930',
    bgColor: 'rgba(234, 179, 8, .14)',
  },
}

const defaultColor = {
  color: '#5f6b7a',
  bgColor: 'rgba(148, 163, 184, 0.16)',
}

const tagStyle = computed(() => {
  const color = colors[text] ?? defaultColor
  return {
    backgroundColor: color.bgColor,
    color: color.color,
  }
})
</script>

<template>
  <span class="text-secondary rounded-sm px-1 py-0.5 text-xs" :style="tagStyle">
    {{ text }}
  </span>
</template>
