<script setup>
import { ref } from 'vue'

const colors = ['#ffffff', '#fff1c1', '#ffd27a', '#f28b6b']

const blobCount = 14

function rand(min, max) {
  return Math.random() * (max - min) + min
}

/**
 * 初始化一次即可，避免频繁变化
 */
const blobs = ref(
  Array.from({ length: blobCount }).map((_, i) => ({
    color: colors[i % colors.length],
    x: rand(0, 100),
    y: rand(55, 100), // 明显偏底部
    size: rand(28, 45), // ⭐ 关键：不要太大
    opacity: rand(0.35, 0.6), // 更自然的叠加
  })),
)
</script>

<template>
  <div class="bg-root">
    <div
      v-for="(b, i) in blobs"
      :key="i"
      class="blob"
      :style="{
        background: `radial-gradient(
          circle at ${b.x}% ${b.y}%,
          ${b.color} 0%,
          rgba(255,255,255,0) ${b.size}%
        )`,
        opacity: b.opacity,
      }"
    />
  </div>
</template>

<style scoped>
.bg-root {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  background: #f5f5f5;

  /* ⭐ 整体柔化，而不是每块都 blur */
  filter: blur(50px) saturate(1.1);
}

.blob {
  position: absolute;
  inset: -10%;
  will-change: transform;
}
</style>
