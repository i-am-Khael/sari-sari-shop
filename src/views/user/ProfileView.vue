<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/profile';

const store = useProfileStore();
const { profile } = storeToRefs(store);

onMounted(async () => {
  await store.getProfile(localStorage.getItem('id') ?? 0);
});
</script>

<template>
  <section class="pt-52" >
    {{ profile }}
  </section>
</template>
