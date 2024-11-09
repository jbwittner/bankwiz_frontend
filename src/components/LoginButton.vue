<template>
  <div>
    <h2>User Profile</h2>
    <button class="button__login" @click="login">Log In</button>
    <button class="button__login" @click="toto">toto</button>
    <button class="button__login" @click="call_public">call_public</button>
    <button class="button__login" @click="call_private">call_private</button>
    <p>{{ user }}</p>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { Configuration, StatusServiceApi } from '@/generated/server'
const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0()
const login = () => {
  loginWithRedirect()
}

const toto = async () => {
  const result = await getAccessTokenSilently()
  console.log(result)
}

const configuration:Configuration = new Configuration({
  basePath: import.meta.env.VITE_SERVER_URL
})

const statusService: StatusServiceApi = new StatusServiceApi(configuration);

const call_public = async () => {
  const result = await statusService.getPublicStatus()
  console.log(result)
}

const call_private = async () => {
  const result = await statusService.getPrivateStatus({
    headers: {
      Authorization: `Bearer ${await getAccessTokenSilently()}`
    }
  })
  console.log(result)
}

</script>
