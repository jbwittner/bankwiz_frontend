<template>
  <main>
    <v-btn variant="outlined" @click="authStore.login()"> Log In </v-btn>
  </main>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import { UserApiHelper } from '@/tools/UserApiHelper.ts'
import { useUserStore } from '@/stores/userStore.ts'

const router = useRouter()
const authStore = useAuthStore()
const userApiHelper = new UserApiHelper()
const userStore = useUserStore();

watch(
  () => authStore.isAuthenticated,
  async () => {
    if (authStore.isAuthenticated === true) {
      userStore.user = await userApiHelper.authenticationUser()
      await router.push({ name: 'home' })
    }
  },
)
</script>
