<script setup>
import { computed } from 'vue'
import defaultIcon from '@/assets/imgs/tools/default.svg'

const { icon } = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

const iconModules = import.meta.glob('@/assets/imgs/tools/*.{png,svg,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const iconMap = new Map()
for (const [path, module] of Object.entries(iconModules)) {
  const fileName = path.split('/').pop() || path.split('\\').pop()
  if (fileName) {
    iconMap.set(fileName, module)
  }
}

const iconUrl = computed(() => iconMap.get(icon) || defaultIcon)
</script>

<template>
  <img
    :src="iconUrl"
    alt=""
    loading="lazy"
    decoding="async"
    class="size-12 shrink-0 rounded-xl object-contain"
    @error="$event.target.src = defaultIcon"
  />
</template>
