<template>
  <v-btn variant="outlined" @click="login"> Log In </v-btn>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, getAccessTokenSilently, logout } = useAuth0()
const login = () => {
  loginWithRedirect()
}

</script>
