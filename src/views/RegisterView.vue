<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import AuthForm from '@/components/utilities/AuthForm.vue';
import Toast from '@/components/utilities/Toast.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const { errors } = storeToRefs(auth);
const toast = ref(false);
const toastMsg = ref('');
const toastType = ref('success');

const register = async (data) => {
  const result = await auth.register(data);

  if (result.status === 201) {

    router.replace(typeof redirect === 'string' ? redirect : { name: 'index' });

    toast.value = true;
    toastMsg.value = result.data.msg;
    toastType.value = 'success';

    setTimeout(() => {
      toast.value = false;
    }, 3000);

  }
}
</script>

<template>
  <section class="w-full min-h-screen flex items-center justify-center">
    <AuthForm @submit="register" btnLabel="Register" :errors="errors"/>
    <Toast
      :show="toast"
      :type="toastType"
      :text="toastMsg"
    />
  </section>
</template>
