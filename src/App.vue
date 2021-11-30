<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TheNav from './components/TheNav.vue'
useHead({
  meta: [
    { property: 'og:title', content: 'Demo Blog' },
    { property: 'og:image', content: '' },
    { name: 'description', content: '' },
    { name: 'twitter:card', content: '' },
    { name: 'twitter:creator', content: '' },
  ],
})
</script>

<template>
  <header>
    <TheNav />
  </header>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
