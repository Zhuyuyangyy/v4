import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/styles/global.css'
import './assets/styles/_tailwind.css'
import './assets/styles/universe-learning.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.mount('#app')
