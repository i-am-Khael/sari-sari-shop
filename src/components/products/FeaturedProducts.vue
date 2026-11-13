 <script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import Product from './Product.vue';

const store = useProductsStore();
const { featured } = storeToRefs(store);

onMounted(async () => {
  await store.featuredProducts();
});
</script>

<template>
  <section class="px-5 py-16 sm:py-20 bg-slate-50">

    <div class="w-full mb-10">
    <p class="mb-2 uppercase tracking-wider font-semibold text-sm text-blue-700">
      Handpicked for you.
    </p>
    <h2 class="font-extrabold tracking-tight text-3xl sm:text-4xl text-slate-900">
      Featured Products
    </h2>
    <p class="max-w-xl mt-3 text-slate-600">
      Discover popular products selected for your everyday needs.
    </p>
  </div>

  <div v-if="featured.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    <Product :products="featured"/>
  </div>

  <p v-else class="p-10 text-center text-slate-600">No Featured Products at the moment..</p>

  </section>
</template>
