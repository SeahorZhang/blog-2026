import { Icon } from '@iconify/vue'
import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import './styles/index.css'

const app = createApp(App)
app.component('Icon', Icon)
app.use(vaporInteropPlugin).use(router).mount('#app')
