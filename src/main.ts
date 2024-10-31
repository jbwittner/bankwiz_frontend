import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(router)

app.use(
  createAuth0({
    domain: 'bankwiz-development.eu.auth0.com',
    clientId: 'SXP4oUqfpIIdLBqsJ6SFxIqyuZqhgReU',
    authorizationParams: {
      audience: 'bankwiz_server',
      redirect_uri: window.location.origin,
    },
  }),
)

app.mount('#app')
