<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AuthForm from '@/components/utilities/AuthForm.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);

const login = async (data) => {

  const result = await auth.login(data);

  if (result.status === 200) {
    const redirect = route.query.redirect;
    router.replace(typeof redirect === 'string' ? redirect : { name: 'profile' });
  }

}
</script>

<template>
  <section class="login-section">

    <div class="mb-4 p-6 rounded bg-slate-400 text-slate-950">
      <p class="mb-2">You can use this account, or register a new one.</p>
      <ul>
        <li>Username: demo</li>
        <li>Password: password</li>
      </ul>
    </div>

    <AuthForm @submit="login" btnLabel="Login" :errors="errors"/>
  </section>
</template>
