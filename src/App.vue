<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <NavBar/>
  <main>
    <RouterView/>
  </main>
  <FooterSection/>
</template>
