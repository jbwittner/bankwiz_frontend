<template>
  <v-app-bar v-if="props.showAppBar" color="primary" density="compact">
    <v-app-bar-nav-icon prepend-icon="mdi-chevron-left" text="test"></v-app-bar-nav-icon>
    <v-app-bar-title>Application Bar</v-app-bar-title>
    <v-tooltip text="Logout">
      <template v-slot:activator="{ props }">
        <v-btn density="compact" icon="mdi-logout" v-bind="props" @click="logoutOnClick"></v-btn>
      </template>
    </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({ showAppBar: Boolean, logoutOnClick: Function })
</script>
