<script setup>
import defaultIcon from '@/assets/imgs/tools/default.svg'

const { icon } = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

// 使用 import.meta.glob 预加载所有工具图标
const iconModules = import.meta.glob('@/assets/imgs/tools/*.{png,svg,jpg,jpeg}', { eager: true, import: 'default' })

// 构建文件名到模块的映射表，提高查找效率（O(1)）
const iconMap = new Map()
for (const [path, module] of Object.entries(iconModules)) {
  // 从路径中提取文件名（处理不同路径格式）
  const fileName = path.split('/').pop() || path.split('\\').pop()
  if (fileName) {
    iconMap.set(fileName, module)
  }
}

// 记录加载失败的图标
const failedIcons = ref(new Set())

function handleIconError() {
  // 将当前图标标记为失败，创建新 Set 以触发响应式更新
  if (icon && !failedIcons.value.has(icon)) {
    failedIcons.value = new Set([...failedIcons.value, icon])
  }
}

// 使用 computed 自动响应 icon 的变化，更简洁高效
const iconUrl = computed(() => {
  if (!icon) {
    return defaultIcon
  }

  // 如果该图标之前加载失败，直接返回默认图标
  if (failedIcons.value.has(icon)) {
    return defaultIcon
  }

  // 直接通过文件名查找，O(1) 时间复杂度
  const matchedIcon = iconMap.get(icon)
  return matchedIcon || defaultIcon
})

// 当 icon 变化时，清除失败记录（允许重试）
watch(() => icon, () => {
  failedIcons.value.delete(icon)
})
</script>

<template>
  <img v-if="iconUrl" :src="iconUrl" class="size-14 shrink-0 rounded-xl object-contain" @error="handleIconError">
</template>
