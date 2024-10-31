<template>
  <div>
    <h2>User Profile</h2>
    <button class="button__login" @click="login">Log In</button>
    <p>{{ user }}</p>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect, user } = useAuth0()
const login = () => {
  loginWithRedirect()
}
</script>
