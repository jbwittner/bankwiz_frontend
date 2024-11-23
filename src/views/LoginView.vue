<template>
  <v-btn variant="outlined" @click="login"> Log In </v-btn>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, getAccessTokenSilently, logout } = useAuth0()
const login = () => {
  loginWithRedirect()
}

import { useRoute } from 'vue-router'

const route = useRoute()

console.log('route', route)
console.log('route.fullPath', route.fullPath)
console.log('route.hash', route.hash)
console.log('route.matched', route.matched)
console.log('route.query', route.query)
console.log('route.name', route.name)
console.log('route.params', route.params)
</script>
