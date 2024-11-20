<template>
  <v-layout>
    <ApplicationBar :showAppBar="plotAppBar" />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import ApplicationBar from '@/components/ApplicationBar.vue'

const route = useRoute()

console.log("App route", route)
console.log("App route.fullPath", route.fullPath)

let plotAppBar: boolean;

if (window.location.pathname === "/") {
  plotAppBar = false;
} else {
  plotAppBar = true;
}


console.log("App route.hash", route.hash)
console.log("App route.matched", route.matched)
console.log("App route.query", route.query)
console.log("App route.name", route.name)
console.log("App route.params", route.params)

</script>
