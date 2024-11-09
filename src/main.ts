import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(router)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_DOMAIN_AUTH0,
    clientId: import.meta.env.VITE_CLIENT_ID_AUTH0,
    authorizationParams: {
      audience: import.meta.env.VITE_AUDIENCE_AUTH0,
      redirect_uri: window.location.origin,
    },
  }),
)

app.use(PrimeVue);


app.mount('#app')
