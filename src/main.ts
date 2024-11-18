import { createApp } from 'vue'

import App from './App.vue'
import vuetify from '@/plugins/vuetify.ts'
import auth0 from '@/plugins/auth0.ts'
import router from '@/plugins/router.ts'
import pinia from '@/plugins/pinia.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(auth0)
app.use(vuetify)

app.mount('#app')
