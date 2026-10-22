<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import AuthForm from '@/components/utilities/AuthForm.vue';

const auth = useAuthStore();
const profile = useProfileStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);

const login = async (data) => {

  const result = await auth.login(data);

  if (result.status === 200) {
    localStorage.setItem('profile', JSON.stringify(result.data.profile));
    const redirect = route.query.redirect;
    router.replace(typeof redirect === 'string' ? redirect : { name: 'index' });
  }

}
</script>

<template>
  <section class="login-section">
    <AuthForm @submit="login" btnLabel="Login" :errors="errors"/>
  </section>
</template>
