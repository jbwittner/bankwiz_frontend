<template>
  <v-app-bar v-if="props.showAppBar" color="primary" density="compact">
    <v-app-bar-nav-icon prepend-icon="mdi-chevron-left" text="test"></v-app-bar-nav-icon>
    <v-app-bar-title>Application Bar</v-app-bar-title>
    <div>
      {{ user?.fullName }}
    </div>
    <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
    <v-tooltip text="Logout">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-logout" v-bind="props" @click="logoutOnClick"></v-btn>
      </template>
    </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/userStore.ts'
import { onBeforeMount, ref } from 'vue'
import type { UserDTO } from '@/generated/server'

const props = defineProps({ showAppBar: Boolean, logoutOnClick: Function, userName: String })

const theme = useTheme()
const userStore = useUserStore();
const user = ref<UserDTO>();

onBeforeMount(async () => {
  user.value = userStore.user;
  console.log(userStore.user);
})


const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
