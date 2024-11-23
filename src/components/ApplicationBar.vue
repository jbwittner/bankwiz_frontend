<template>
  <v-app-bar v-if="props.showAppBar" color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon prepend-icon="mdi-chevron-left" text="test"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Application Bar</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({ showAppBar: Boolean })
console.log('ApplicationBar props', props)
</script>
