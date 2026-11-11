  <script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import Product from '@/components/products/Product.vue';

const store = useProductsStore();
const { products } = storeToRefs(store);

const search = ref('');
const category = ref('All');

const categories = computed(() => [
  'All',
  ...new Set((products.value ?? []).map((item) => item.category))
]);

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase();

  return (products.value ?? []).filter((item) => {

    const matchSearch = !query ||
      item.product.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchCategory = category.value === 'All' || item.category === category.value;

    return matchSearch && matchCategory;

  });
})

onMounted(async () => {
  await store.getAll();
});
</script>

<template>
  <section class="w-full min-h-screen py-6 flex flex-col">

    <div class="w-full p-6 rounded bg-linear-to-r from-yellow-700 to-yellow-500">

      <div class="flex flex-col gap-1">
        <p class="uppercase tracking-wider font-medium text-sm text-yellow-100">Browse our collection</p>
        <h1 class="font-bold text-3xl sm:text-4xl text-yellow-50">Find something you'll love</h1>
        <p class="text-yellow-50">Search products or browse by category</p>
      </div>

      <div class="w-[50%] mt-5 inline-flex items-center gap-4">
        <input
          type="text"
          placeholder="Search product or category"
          class="w-full px-4 py-2 rounded border-none outline-none text-yellow-950 bg-yellow-50"
          v-model="search"
        >
        <select class="px-4 py-2 rounded text-yellow-950 bg-yellow-50" v-model="category">
          <option v-for="item in categories" :key="item">{{ item }}</option>
        </select>
      </div>

    </div>

    <div v-if="filteredProducts.length" class="py-6 grid grid-cols-4 gap-4">
      <Product :products="filteredProducts"/>
    </div>

    <div v-else class="flex flex-1 items-center justify-center text-yellow-950">
      <p class="text-2xl">No Products Found</p>
    </div>

  </section>
</template>
