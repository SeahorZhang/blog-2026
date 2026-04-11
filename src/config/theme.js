import { computed, reactive, watch } from 'vue'
import avatarDefaultImg from '@/assets/imgs/avatar/avatar.png'
import avatarNewYearImg from '@/assets/imgs/avatar/avatarNewYear.png'

const STORAGE_KEY = 'site-appearance'

export const avatarPresets = {
  default: {
    label: '默认头像',
    image: avatarDefaultImg,
    shadow: '#E2D9CE',
  },
  newYear: {
    label: '过年头像',
    image: avatarNewYearImg,
    shadow: '#F6D0C6',
  },
}

export const themePresets = {
  default: {
    label: '默认主题',
    cssVars: {
      '--color-primary': '#de4331',
      '--color-brand-secondary': '#FCC841',
      '--color-border': '#ffffff',
      '--color-card': '#ffffff66',
      '--color-base': '#4E3F42',
    },
    background: {
      baseColor: '#e9f5ff',
      blobs: ['bg-purple-200/60', 'bg-cyan-200/60', 'bg-blue-200/60', 'bg-pink-200/60'],
      snowfall: false,
    },
  },
  christmas: {
    label: '圣诞主题',
    cssVars: {
      '--color-primary': '#c63b34',
      '--color-brand-secondary': '#2f8f5b',
      '--color-border': '#ffffff',
      '--color-card': '#fffaf0a6',
      '--color-base': '#4A2C2A',
    },
    background: {
      baseColor: '#eef7f3',
      blobs: ['bg-rose-200/60', 'bg-emerald-200/55', 'bg-red-200/55', 'bg-sky-200/45'],
      snowfall: true,
    },
  },
}

const defaultAppearance = {
  avatar: 'default',
  theme: 'default',
}

function normalizeAppearance(value = {}) {
  const avatar = value.avatar in avatarPresets ? value.avatar : defaultAppearance.avatar
  const theme = value.theme in themePresets ? value.theme : defaultAppearance.theme

  return { avatar, theme }
}

function loadStoredAppearance() {
  if (typeof window === 'undefined') {
    return { ...defaultAppearance }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { ...defaultAppearance }
    }

    return normalizeAppearance(JSON.parse(raw))
  } catch {
    return { ...defaultAppearance }
  }
}

export const siteAppearance = reactive(loadStoredAppearance())

export const currentAvatar = computed(() => avatarPresets[siteAppearance.avatar] ?? avatarPresets.default)
export const currentTheme = computed(() => themePresets[siteAppearance.theme] ?? themePresets.default)
export const avatarOptions = Object.entries(avatarPresets).map(([value, item]) => ({
  value,
  label: item.label,
}))
export const themeOptions = Object.entries(themePresets).map(([value, item]) => ({
  value,
  label: item.label,
}))

function persistAppearance(value) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

watch(
  siteAppearance,
  (value) => {
    persistAppearance(normalizeAppearance(value))
  },
  { deep: true },
)

export function setTheme(theme) {
  siteAppearance.theme = theme in themePresets ? theme : defaultAppearance.theme
}

export function setAvatar(avatar) {
  siteAppearance.avatar = avatar in avatarPresets ? avatar : defaultAppearance.avatar
}

export function useAppearance() {
  return {
    siteAppearance,
    currentAvatar,
    currentTheme,
    avatarOptions,
    themeOptions,
    setTheme,
    setAvatar,
  }
}
