import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import { auraThemePreset } from '@/config/primevue'

import 'primeicons/primeicons.css'
import '@/asset/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: auraThemePreset,
      options: {
        prefix: 'p',
        darkModeSelector: '.dark',
      },
  },
})
app.use(router)

app.mount('#app')
