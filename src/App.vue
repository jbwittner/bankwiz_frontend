<template>
  <v-layout>
    <ApplicationBar
      :showAppBar="plotAppBar"
      :logout-on-click="logoutOnClick"
      :user-name="user.fullName"
    />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import ApplicationBar from '@/components/ApplicationBar.vue'
import { isAuthenticatedRoute } from '@/plugins/router.ts'
import { onBeforeMount, type Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import type { UserDTO } from '@/generated/server'
import { UserApiHelper } from '@/tools/UserApiHelper.ts'

const authStore = useAuthStore()
const plotAppBar = ref(false)
const route = useRoute()
const user: Ref<UserDTO> = ref({} as UserDTO)
const userApiHelper = new UserApiHelper()

const fetchData = async () => {
  user.value = await userApiHelper.authenticationUser()
}

onBeforeMount(async () => {
  await fetchData()
})

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
