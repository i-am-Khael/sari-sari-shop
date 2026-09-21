<script setup>
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <NavBar class="sticky top-0 z-50"/>
  <main class="max-w-[2400px] px-5 min-h-screen mx-auto">
    <RouterView/>
  </main>
  <FooterSection/>
</template>
