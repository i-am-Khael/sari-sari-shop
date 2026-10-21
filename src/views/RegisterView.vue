<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import AuthForm from '@/components/utilities/AuthForm.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);

const register = async (data) => {
  const result = await auth.register(data);
  if (result.status === 201) {
    router.replace(
      typeof route.query.redirect === 'string' ? route.query.redirect : { name: 'profile' }
    );
  }
}
</script>

<template>
  <section>
    <AuthForm @submit="register" btnLabel="Register" :errors="errors"/>
  </section>
</template>
