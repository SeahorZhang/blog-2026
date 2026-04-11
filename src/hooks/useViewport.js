import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const isMobile = computed(() => width.value < 1150)
const centerX = computed(() => Math.floor(width.value / 2))
const centerY = computed(() => Math.floor(height.value / 2))

export function useViewport() {
  return {
    width,
    height,
    isMobile,
    centerX,
    centerY,
  }
}
