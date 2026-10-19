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

  if (result) {
    await profile.getProfile(result.data.id);
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
