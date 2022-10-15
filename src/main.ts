import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import { setupRouter } from './router'
import { setupPinia } from './store'

const app = createApp(App)
setupRouter(app)
setupPinia(app)
app.mount('#app')
