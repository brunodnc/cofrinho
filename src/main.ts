import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MonthPicker, MonthPickerInput } from 'vue-month-picker';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(MonthPicker)
app.use(MonthPickerInput)

app.mount('#app')
