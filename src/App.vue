<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import Toast from './components/utilities/Toast.vue';

const toast = JSON.parse(localStorage.getItem('toast'));
</script>

<template>
  <NavBar/>
  <main>
    <RouterView/>
    <Toast
      :show="toast?.show ?? false"
      :type="toast?.type"
      :text="toast?.msg"
    />
  </main>
  <FooterSection/>
</template>
