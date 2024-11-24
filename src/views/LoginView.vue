<template>
  <v-btn variant="outlined" @click="authStore.login()"> Log In </v-btn>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkIsAuthenticated()
})

</script>
