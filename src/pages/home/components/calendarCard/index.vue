<script setup>
import { computed } from 'vue'
import WidgetCard from '@/components/WidgetCard.vue'
import cardStyles from '@/config/card-styles.json'
import { useViewport } from '@/hooks/useViewport'

const { isMobile } = useViewport()
const cardName = 'calendarCard'
const { width, height, order, offset } = cardStyles[cardName]
const positionClass = `absolute ${offset}`
const weekDays = ['一', '二', '三', '四', '五', '六', '日']

const now = new Date()
const todayYear = now.getFullYear()
const todayMonth = now.getMonth()
const todayDate = now.getDate()
const weekDayNames = ['日', '一', '二', '三', '四', '五', '六']

const todayInfo = {
  day: todayDate,
  weekDay: weekDayNames[now.getDay()],
}

const calendarData = computed(() => {
  const firstDay = new Date(todayYear, todayMonth, 1)
  const daysInMonth = new Date(todayYear, todayMonth + 1, 0).getDate()
  const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay()

  const prevMonth = todayMonth === 0 ? 11 : todayMonth - 1
  const prevYear = todayMonth === 0 ? todayYear - 1 : todayYear
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate()

  const nextMonth = todayMonth === 11 ? 0 : todayMonth + 1
  const nextYear = todayMonth === 11 ? todayYear + 1 : todayYear

  const days = []
  const prevMonthDaysCount = firstDayOfWeek - 1

  for (let day = prevMonthDays - prevMonthDaysCount + 1; day <= prevMonthDays; day++) {
    if (prevMonthDaysCount <= 0) break
    days.push({
      key: `${prevYear}-${prevMonth + 1}-${day}`,
      day,
      isCurrentMonth: false,
      isToday: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      key: `${todayYear}-${todayMonth + 1}-${day}`,
      day,
      isCurrentMonth: true,
      isToday: day === todayDate,
    })
  }

  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      key: `${nextYear}-${nextMonth + 1}-${day}`,
      day,
      isCurrentMonth: false,
      isToday: false,
    })
  }

  return {
    year: todayYear,
    month: todayMonth + 1,
    days,
  }
})
</script>

<template>
  <WidgetCard
    class="card p-6"
    :class="isMobile ? '' : positionClass"
    :order="order"
    :width="width"
    :height="height"
  >
    <div class="flex h-full w-full flex-col overflow-hidden">
      <h2 class="mb-3 shrink-0 px-2 text-left text-sm text-gray-500">
        {{ calendarData.year }}年{{ calendarData.month }}月{{ todayInfo.day }}日 星期{{
          todayInfo.weekDay
        }}
      </h2>

      <div class="mb-3 grid shrink-0 grid-cols-7">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-center text-xs font-medium text-gray-500"
        >
          {{ day }}
        </div>
      </div>

      <div class="grid flex-1 grid-cols-7" style="grid-template-rows: repeat(6, minmax(0, 1fr))">
        <div
          v-for="dayInfo in calendarData.days"
          :key="dayInfo.key"
          class="flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-lg text-sm"
          :class="{
            'text-gray-500/50': !dayInfo.isCurrentMonth,
            'border border-border calendar-today font-bold text-white': dayInfo.isToday,
          }"
        >
          {{ dayInfo.day }}
        </div>
      </div>
    </div>
  </WidgetCard>
</template>
