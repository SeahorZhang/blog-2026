<script setup>
import { computed } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  cardSpacing: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
})

const cardName = 'calendarCard'
const width = cardStyles[cardName].width
const height = cardStyles[cardName].height
const x = computed(() => props.center.x + props.cardSpacing + cardStyles.hiCard.width / 2)
const y = computed(() => props.center.y - cardStyles.clockCard.offset + props.cardSpacing)

// 获取当前月份的所有日期
const calendarData = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // 获取当月第一天是星期几（0=周日，1=周一...）
  // 转换为从周一开始：1=周一，2=周二...，7=周日
  let firstDayOfWeek = firstDay.getDay()
  firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek // 周日转换为7

  // 获取当月总天数
  const daysInMonth = lastDay.getDate()

  // 获取上个月的最后一天和总天数
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0)
  const prevMonthDays = prevMonthLastDay.getDate()

  // 生成日历数组，每个元素包含 { day, isCurrentMonth, month, year }
  const days = []

  // 填充上个月的日期（从周一开始）
  // 如果第一天是周一(firstDayOfWeek=1)，不需要上个月的日期
  // 如果第一天是周二(firstDayOfWeek=2)，需要1天上个月的日期
  // 如果第一天是周日(firstDayOfWeek=7)，需要6天上个月的日期
  const prevMonthDaysCount = firstDayOfWeek - 1
  if (prevMonthDaysCount > 0) {
    const prevMonthStart = prevMonthDays - prevMonthDaysCount + 1
    for (let i = prevMonthStart; i <= prevMonthDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        month: prevMonth + 1,
        year: prevYear,
      })
    }
  }

  // 填充当月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      month: month + 1,
      year,
    })
  }

  // 填充下个月的日期（补齐到6行，每行7天，共42天）
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    days.push({
      day,
      isCurrentMonth: false,
      month: nextMonth + 1,
      year: nextYear,
    })
  }

  return {
    year,
    month: month + 1, // 月份从1开始
    monthName: now.toLocaleDateString('zh-CN', { month: 'long' }),
    days,
  }
})

// 判断是否是今天
function isToday(dayInfo) {
  if (!dayInfo || !dayInfo.isCurrentMonth)
    return false
  const now = new Date()
  return (
    now.getDate() === dayInfo.day
    && now.getMonth() === calendarData.value.month - 1
    && now.getFullYear() === calendarData.value.year
  )
}

// 星期标题（从周一开始）
const weekDays = ['一', '二', '三', '四', '五', '六', '日']

// 获取今天的日期和星期
const todayInfo = computed(() => {
  const now = new Date()
  const day = now.getDate()
  const dayOfWeek = now.getDay() // 0=周日, 1=周一, ..., 6=周六
  const weekDayNames = ['日', '一', '二', '三', '四', '五', '六']
  return {
    day,
    weekDay: weekDayNames[dayOfWeek],
  }
})
</script>

<template>
  <WidgetCard class="p-6" :width="width" :height="height" :x="x" :y="y" :order="order">
    <div class="flex flex-col h-full w-full overflow-hidden">
      <!-- 月份标题 -->
      <h2 class="text-left mb-3 shrink-0 px-2 text-sm text-[var(--color-secondary)]">
        {{ calendarData.year }}年{{ calendarData.month }}月{{ todayInfo.day }}日 星期{{ todayInfo.weekDay }}
      </h2>

      <!-- 星期标题 -->
      <div class="grid grid-cols-7  mb-3 shrink-0 ">
        <div v-for="day in weekDays" :key="day" class="text-center text-xs font-medium text-[var(--color-secondary)]">
          {{ day }}
        </div>
      </div>

      <!-- 日期网格 -->
      <div class="grid grid-cols-7 flex-1" style="grid-template-rows: repeat(6, minmax(0, 1fr));">
        <div
          v-for="(dayInfo, index) in calendarData.days" :key="index"
          class="flex items-center justify-center text-sm w-full h-full min-h-0 overflow-hidden rounded-lg" :class="{
            'text-[var(--color-secondary)] opacity-50': !dayInfo.isCurrentMonth,
            'text-[var(--color-primary)]': dayInfo.isCurrentMonth && !isToday(dayInfo),
            'today-cell': isToday(dayInfo),
          }"
        >
          {{ dayInfo.day }}
        </div>
      </div>
    </div>
  </WidgetCard>
</template>

<style scoped>
.today-cell {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  color: var(--color-primary);
  font-weight: 600;
}
</style>
