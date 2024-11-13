<template>
  <div>
    <h2>User Profile</h2>
    <Button test_button_id class="button__login" @click="login">Log In</Button>
    <button class="button__login" @click="toto">toto</button>
    <button class="button__login" @click="call_public">call_public</button>
    <button class="button__login" @click="call_private">call_private</button>
    <Button @click="registration">Registration</Button>
    <p>{{ user }}</p>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'

import { useAuth0 } from '@auth0/auth0-vue'
import {
  Configuration,
  StatusServiceApi,
  UserServiceApi,
} from '@/generated/server'
const { loginWithPopup, user, getAccessTokenSilently } = useAuth0()
const login = () => {
  loginWithPopup()
}

const toto = async () => {
  const result = await getAccessTokenSilently()
  console.log(result)
}

const configuration: Configuration = new Configuration({
  basePath: import.meta.env.VITE_SERVER_URL,
})

const statusService: StatusServiceApi = new StatusServiceApi(configuration)
const userService: UserServiceApi = new UserServiceApi(configuration)

const registration = async () => {
  const token = await getAccessTokenSilently()
  const result = await userService.authenticationUser({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(result)
}

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
</script>
