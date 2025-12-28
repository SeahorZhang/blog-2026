<script setup>
import { motion } from 'motion-v'
import { computed, ref, watchEffect } from 'vue'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
})

const cardName = 'socialButtons'
const width = cardStyles[cardName].width
const hiCardWidth = cardStyles.hiCard.width
const hiCardHeight = cardStyles.hiCard.height
const x = computed(() => props.center.x + hiCardWidth / 2 - width)
const y = computed(() => props.center.y + hiCardHeight / 2 + props.center.cardSpacing)

const show = ref(false)
const show2 = ref(false)
const show3 = ref(false)
watchEffect(() => {
  const delay = props.order * 0.2
  setTimeout(() => {
    show.value = true
  }, delay * 1000)
  setTimeout(() => {
    show2.value = true
  }, (delay + 0.1) * 1000)
  setTimeout(() => {
    show3.value = true
  }, (delay + 0.2) * 1000)
})
</script>

<template>
  <div v-if="show" class="absolute flex gap-2" :style="{ left: `${x}px`, top: `${y}px` }">
    <motion.a
      :initial="{ opacity: 0, scale: 0.6 }" :animate="{ opacity: 1, scale: 1 }" :while-hover="{ scale: 1.05 }"
      href="https://github.com/SeahorZhang" target="_blank"
      class="flex items-center  rounded-xl border-2 border-white bg-[#181717] text-xl text-white px-3 py-1.5 cursor-pointer"
    >
      <Icon class="text-3xl" icon="streamline-logos:github-logo-2-solid" />
    </motion.a>
    <motion.a
      v-if="show2" :initial="{ opacity: 0, scale: 0.6 }" :animate="{ opacity: 1, scale: 1 }"
      :while-hover="{ scale: 1.05 }" href="https://x.com/SeahorZhang" target="_blank"
      class="flex items-center rounded-xl border-2 border-white bg-[#000000] text-xl text-white px-3 py-1.5 cursor-pointer"
    >
      <Icon class="text-3xl" icon="streamline-logos:x-twitter-logo-solid" />
    </motion.a>
    <motion.a
      v-if="show3" :initial="{ opacity: 0, scale: 0.6 }" :animate="{ opacity: 1, scale: 1 }"
      :while-hover="{ scale: 1.05 }" href="https://www.weibo.com/u/1824294237" target="_blank"
      class="flex items-center rounded-xl border-2 border-white bg-[#E6162D] text-xl text-white px-3 py-1.5 cursor-pointer"
    >
      <Icon class="text-3xl" icon="streamline-logos:sina-weibo-logo-solid" />
    </motion.a>
  </div>
</template>
