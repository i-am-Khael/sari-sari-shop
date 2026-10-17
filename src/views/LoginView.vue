<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import AuthForm from '@/components/utilities/AuthForm.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);

const login = async (data) => {

  const result = await auth.login(data);

  if (result) {
    const redirect = route.query.redirect;
    router.replace(typeof redirect === 'string' ? redirect : { name: 'index' });
  }

}
</script>

<template>
  <section class="w-full min-h-screen flex items-center justify-center">
    <AuthForm @submit="login" btnLabel="Login" :errors="errors"/>
  </section>
</template>
