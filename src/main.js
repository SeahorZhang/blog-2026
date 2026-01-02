import { Icon } from '@iconify/vue'
import Clarity from '@microsoft/clarity'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import './styles/index.css'

Clarity.init ('uv4bq7qzcr')
const app = createApp(App)
app.component('Icon', Icon)
app.use(router).mount('#app')
