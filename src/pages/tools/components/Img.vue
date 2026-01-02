<script setup>
import defaultIcon from '@/assets/imgs/tools/default.svg'

const { icon } = defineProps({
  icon: {
    type: String,
    required: true,
  },

})

const iconUrl = ref('')

function handleIconError() {
  iconUrl.value = defaultIcon
}

// 如果有本地图标路径，优先使用
function loadLocalIcon() {
  if (!icon)
    return handleIconError()
  try {
    iconUrl.value = new URL(`@/assets/imgs/tools/${icon}`, import.meta.url).href
  }
  catch {
    handleIconError()
  }
}

loadLocalIcon()
</script>

<template>
  <img
    v-if="iconUrl"
    :src="iconUrl"
    class="size-14 shrink-0 rounded-xl object-contain"
    @error="handleIconError"
  >
</template>
