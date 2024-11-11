<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import BasicToolBar from '@/components/BasicToolBar.vue'
</script>

<template>
  <header class="header">

  <BasicToolBar />

  </header>

  <div class="main">
  <RouterView />
  <RouterView />
  <RouterView />
  <RouterView />
  </div>
</template>

<style scoped>
.header {
  width: 100%;          /* Prend toute la largeur */
  height: 50px;         /* Hauteur fixe de 50px */
  position: fixed;      /* Reste fixe en haut de la page */
  top: 0;               /* Aligné tout en haut */
  left: 0;              /* Commence depuis le côté gauche */
  display: flex;
  align-items: center;   /* Centrage vertical du contenu */
  justify-content: center; /* Centrage horizontal du contenu */
  z-index: 1000;        /* Pour qu'il passe au-dessus des autres éléments */
}
.main {
  padding-top: 50px; /* Compense la hauteur du header fixe */
}
</style>
