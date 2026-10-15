<script setup>
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <NavBar class="fixed top-0 left-0 z-50"/>
  <main class="max-w-[2400px] min-h-screen mx-auto">
    <RouterView/>
  </main>
  <FooterSection/>
</template>
