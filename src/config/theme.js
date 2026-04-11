import { computed, reactive, watch } from 'vue'
import avatarDefaultImg from '@/assets/imgs/avatar/avatar.png'
import avatarNewYearImg from '@/assets/imgs/avatar/avatarNewYear.png'

const STORAGE_KEY = 'site-appearance'

export const avatarPresets = {
  default: {
    label: '默认头像',
    description: '日常使用的清爽版本',
    image: avatarDefaultImg,
    shadow: '#E2D9CE',
    preview: ['#f8e8d7', '#f2c7b6', '#d18d7b'],
    surface: {
      background: 'linear-gradient(135deg, #fff7f0 0%, #ffe1d6 55%, #f4c0b3 100%)',
      accent: 'radial-gradient(circle at 28% 28%, rgba(255,255,255,.92), transparent 26%)',
    },
  },
  newYear: {
    label: '过年头像',
    description: '更适合节日氛围的版本',
    image: avatarNewYearImg,
    shadow: '#F6D0C6',
    preview: ['#f9d27d', '#e46b5a', '#b8322d'],
    surface: {
      background: 'linear-gradient(135deg, #fff1df 0%, #ffcf9e 48%, #de5d47 100%)',
      accent: 'radial-gradient(circle at 30% 24%, rgba(255,244,212,.95), transparent 22%)',
    },
  },
}

export const themePresets = {
  default: {
    label: '默认主题',
    description: '轻盈通透，适合全年使用',
    preview: ['#eef8ff', '#cdeeff', '#ffdca8'],
    surface: {
      background: 'linear-gradient(180deg, #eef8ff 0%, #dff1ff 54%, #fdf1df 100%)',
      accent: 'radial-gradient(circle at 24% 24%, rgba(255,255,255,.92), transparent 22%)',
    },
    cssVars: {
      '--color-primary': '#de4331',
      '--color-brand-secondary': '#FCC841',
      '--color-border': '#ffffff',
      '--color-card': '#ffffff66',
      '--color-base': '#4E3F42',
      '--color-name-primary': '#ADDEFE',
      '--color-name-secondary': '#E5E2FF',
      '--color-calendar-today': '#ADDEFE',
    },
    background: {
      baseColor: '#e9f5ff',
      backgroundImage: [
        'radial-gradient(circle at 18% 16%, rgba(255,255,255,.78), transparent 22%)',
        'radial-gradient(circle at 82% 12%, rgba(201,236,255,.9), transparent 28%)',
        'linear-gradient(180deg, #eef8ff 0%, #e6f0ff 48%, #fdf6ee 100%)',
      ].join(','),
      blobs: ['bg-purple-200/60', 'bg-cyan-200/60', 'bg-blue-200/60', 'bg-pink-200/60'],
      snowfall: false,
      ornaments: [],
    },
  },
  summer: {
    label: '夏天主题',
    description: '更晴朗一些，像午后的海风',
    preview: ['#eefcff', '#ccf4ff', '#ffe7b9'],
    surface: {
      background: 'linear-gradient(180deg, #eefcff 0%, #d5f5ff 52%, #fff0cc 100%)',
      accent: 'radial-gradient(circle at 22% 22%, rgba(255,250,216,.9), transparent 20%)',
    },
    cssVars: {
      '--color-primary': '#ff8f3d',
      '--color-brand-secondary': '#35b7d6',
      '--color-border': '#fffdf8',
      '--color-card': '#fffdf0a8',
      '--color-base': '#4A6170',
      '--color-name-primary': '#ff8f3d',
      '--color-name-secondary': '#35b7d6',
      '--color-calendar-today': '#5ccae3',
    },
    background: {
      baseColor: '#ecfbff',
      backgroundImage: [
        'radial-gradient(circle at 14% 16%, rgba(255,245,196,.85), transparent 20%)',
        'radial-gradient(circle at 84% 14%, rgba(191,241,255,.92), transparent 24%)',
        'linear-gradient(180deg, #eefcff 0%, #def6ff 46%, #fff5db 100%)',
      ].join(','),
      blobs: ['bg-sky-200/55', 'bg-cyan-200/55', 'bg-amber-100/60', 'bg-teal-100/50'],
      snowfall: false,
      ornaments: [],
    },
  },
  christmas: {
    label: '圣诞主题',
    description: '薄荷奶霜感，轻一点的冬日节庆',
    preview: ['#f3fbf7', '#dcefe3', '#ffd7c6'],
    surface: {
      background: 'linear-gradient(180deg, #f4fbf8 0%, #e2f2e8 54%, #fff0e4 100%)',
      accent: 'radial-gradient(circle at 24% 22%, rgba(255,255,255,.94), transparent 20%)',
    },
    cssVars: {
      '--color-primary': '#d6554b',
      '--color-brand-secondary': '#4ca37f',
      '--color-border': '#ffffff',
      '--color-card': '#fffdf6a8',
      '--color-base': '#4A4E49',
      '--color-name-primary': '#d6554b',
      '--color-name-secondary': '#4ca37f',
      '--color-calendar-today': '#7ab89a',
    },
    background: {
      baseColor: '#eef7f2',
      backgroundImage: [
        'radial-gradient(circle at 16% 18%, rgba(255,255,255,.9), transparent 20%)',
        'radial-gradient(circle at 82% 14%, rgba(208,238,223,.92), transparent 24%)',
        'linear-gradient(180deg, #f3fbf7 0%, #e7f5ed 48%, #fff7ef 100%)',
      ].join(','),
      blobs: ['bg-emerald-200/45', 'bg-red-200/30', 'bg-lime-100/35', 'bg-amber-100/30'],
      snowfall: true,
      ornaments: [],
    },
  },
  newYear: {
    label: '过年主题',
    description: '暖红金调，但依旧干净克制',
    preview: ['#fff7f2', '#ffe3d7', '#ffe4a8'],
    surface: {
      background: 'linear-gradient(180deg, #fff8f3 0%, #ffe7da 54%, #fff0c6 100%)',
      accent: 'radial-gradient(circle at 24% 22%, rgba(255,255,255,.92), transparent 20%)',
    },
    cssVars: {
      '--color-primary': '#df5545',
      '--color-brand-secondary': '#efbc52',
      '--color-border': '#fff8ec',
      '--color-card': '#fff7eba8',
      '--color-base': '#5B413C',
      '--color-name-primary': '#df5545',
      '--color-name-secondary': '#efbc52',
      '--color-calendar-today': '#df5545',
    },
    background: {
      baseColor: '#fff3ed',
      backgroundImage: [
        'radial-gradient(circle at 18% 14%, rgba(255,255,255,.88), transparent 21%)',
        'radial-gradient(circle at 84% 18%, rgba(255,223,198,.88), transparent 24%)',
        'linear-gradient(180deg, #fff7f2 0%, #ffefe6 46%, #fff6dc 100%)',
      ].join(','),
      blobs: ['bg-rose-200/40', 'bg-orange-200/35', 'bg-amber-100/40', 'bg-red-100/28'],
      snowfall: false,
      ornaments: [],
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

export const currentAvatar = computed(
  () => avatarPresets[siteAppearance.avatar] ?? avatarPresets.default,
)
export const currentTheme = computed(
  () => themePresets[siteAppearance.theme] ?? themePresets.default,
)
export const avatarOptions = Object.entries(avatarPresets).map(([value, item]) => ({
  value,
  label: item.label,
  description: item.description,
  preview: item.preview,
  surface: item.surface,
}))
export const themeOptions = Object.entries(themePresets).map(([value, item]) => ({
  value,
  label: item.label,
  description: item.description,
  preview: item.preview,
  surface: item.surface,
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
