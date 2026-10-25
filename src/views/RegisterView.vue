<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AuthForm from '@/components/utilities/AuthForm.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);

const register = async (data) => {

  const result = await auth.register(data);

  if (result.status === 201) {
    localStorage.setItem('id', JSON.stringify(result.data));
    const redirect = route.query.redirect;
    router.replace(typeof redirect === 'string' ? redirect : { name: 'profile' });
  }

}
</script>

<template>
  <section>
    <AuthForm @submit="register" btnLabel="Register" :errors="errors"/>
  </section>
</template>
