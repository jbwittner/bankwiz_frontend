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
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()

const plotAppBar = ref(false)

const route = useRoute()

watch(
  () => route.name,
  () => {
    plotAppBar.value = isAuthenticatedRoute(route.name)
  },
)

const logoutOnClick = async () => {
  await auth0.logout({
    openUrl(url) {
      window.location.replace(url)
    },
  })
}
</script>
