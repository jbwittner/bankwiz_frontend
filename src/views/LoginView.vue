<template>
  <main>
    <v-btn variant="outlined" @click="authStore.login()"> Log In </v-btn>
  </main>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

watch(
  () => authStore.isAuthenticated,
  async () => {
    if (authStore.isAuthenticated === true) {
      await router.push({ name: 'home' })
    }
  },
)
</script>
