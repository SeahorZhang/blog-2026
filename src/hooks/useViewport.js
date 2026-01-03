import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const isMobile = computed(() => width.value < 1150)
const x = computed(() => Math.floor(width.value / 2))
const y = computed(() => Math.floor(height.value / 2))

export function useViewport() {
  return {
    width,
    isMobile,
    centerX: x,
    centerY: y,
  }
}

export const cardSpacing = 36
