<template>
  <v-app>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
