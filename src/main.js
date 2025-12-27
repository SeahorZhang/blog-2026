import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import './styles/index.css'

createApp(App).use(vaporInteropPlugin).mount('#app')
