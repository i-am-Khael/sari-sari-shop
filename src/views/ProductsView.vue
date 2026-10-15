<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import Product from '@/components/products/Product.vue';

const store = useProductsStore();
const { products } = storeToRefs(store);


onMounted( async () => {
  await store.getAll();
})

</script>

<template>
  <section class="w-full min-h-screen px-6 py-30">
    <div class="grid grid-cols-4 gap-4">
      <Product :products="products"/>
    </div>
  </section>
</template>
