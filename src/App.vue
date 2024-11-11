<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BasicToolBar from '@/components/BasicToolBar.vue'
</script>

<template>
  <div class="header">
    <BasicToolBar />
  </div>

  <div class="main">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterView />
    <RouterView />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

.header {
  width: 100%; /* Prend toute la largeur */
  position: fixed; /* Reste fixe en haut de la page */
  top: 0; /* Aligné tout en haut */
  left: 0; /* Commence depuis le côté gauche */
  display: flex;
  align-items: center; /* Centrage vertical du contenu */
  justify-content: center; /* Centrage horizontal du contenu */
  z-index: 1000; /* Pour qu'il passe au-dessus des autres éléments */
  background-color: #0d47a1;
}

.main {
  padding-top: 65px; /* Compense la hauteur du header fixe */
}
</style>
