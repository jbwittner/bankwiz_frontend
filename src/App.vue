<template>
  <v-layout>
    <ApplicationBar :showAppBar="plotAppBar" :logout-on-click="logoutOnClick" />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import ApplicationBar from '@/components/ApplicationBar.vue'
import { isAuthenticatedRoute } from '@/plugins/router.ts'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'

const authStore = useAuthStore()
const plotAppBar = ref(false)
const route = useRoute()

watch(
  () => route.name,
  () => {
    plotAppBar.value = isAuthenticatedRoute(route.name)
  },
)

const logoutOnClick = async () => {
  await authStore.logout()
}
</script>
