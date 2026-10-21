<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import Toast from './components/utilities/Toast.vue';

const auth = useAuthStore();
const { toast } = storeToRefs(auth);
</script>

<template>
  <NavBar/>
  <main>
    <RouterView/>
    <Toast
      :show="toast.show"
      :type="toast.type"
      :text="toast.msg"
    />
  </main>
  <FooterSection/>
</template>
