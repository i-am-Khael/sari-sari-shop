<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';

const auth = useAuthStore();

onMounted(async () => await auth.loadCSRF());
</script>

<template>
  <NavBar/>
  <main>
    <RouterView/>
  </main>
  <FooterSection/>
</template>
