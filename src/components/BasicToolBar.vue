<template>
  <Toolbar class="toto">
    <template #start>
      <Button icon="pi pi-plus" class="mr-2" severity="primary" text />
      <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
      <Button icon="pi pi-upload" severity="secondary" text />
    </template>

    <template #center>
      <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Search" />
      </IconField>
    </template>

    <template #end>
      <SplitButton label="Save" :model="items"></SplitButton
    ></template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
])
</script>

<style scoped>
.toto {
  width: 100%; /* Prend toute la largeur */
  height: 65px;
  border: solid black;
  border-width: 0 0 1px 0;
  border-radius: 0;
}
</style>
