<template>
  <v-btn variant="outlined" @click="login"> Log In </v-btn>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const pushToHome = async () => {
  await router.push({ name: 'home' })
}

onMounted(async () => {
  if (auth0.isAuthenticated.value) {
    await pushToHome()
  }
})

const login = async () => {
  await auth0.loginWithPopup()
  await pushToHome()
}
</script>
