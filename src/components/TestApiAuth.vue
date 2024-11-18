<template>
  <div>
    <h2>User Profile</h2>
    <v-btn variant="outlined" @click="login"> Log In </v-btn>
    <v-btn variant="outlined" @click="toto"> toto </v-btn>
    <v-btn variant="outlined" @click="call_public"> call_public </v-btn>
    <v-btn variant="outlined" @click="call_private"> call_private </v-btn>
    <v-btn variant="outlined" @click="logoutApp">logout</v-btn>
    <p>{{ user }}</p>
  </div>
</template>
<script setup lang="ts">
import { type LogoutOptions, useAuth0 } from '@auth0/auth0-vue'
import { Configuration, StatusServiceApi } from '@/generated/server'
const { loginWithRedirect, user, getAccessTokenSilently, logout } = useAuth0()
const login = () => {
  loginWithRedirect()
}

console.log(import.meta.env.BASE_URL)

const toto = async () => {
  const result = await getAccessTokenSilently()
  console.log(result)
}

const configuration: Configuration = new Configuration({
  basePath: import.meta.env.VITE_SERVER_URL,
})

const statusService: StatusServiceApi = new StatusServiceApi(configuration)

const call_public = async () => {
  const result = await statusService.getPublicStatus()
  console.log(result)
}

const call_private = async () => {
  const result = await statusService.getPrivateStatus({
    headers: {
      Authorization: `Bearer ${await getAccessTokenSilently()}`,
    },
  })
  console.log(result)
}

const logoutApp = () => {
  const logoutOptions: LogoutOptions = {
    logoutParams: { returnTo: window.location.origin }
  }
  logout(logoutOptions)
}
</script>
