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
  <section class="prod-container">

    <div class="product-header-container">

      <div class="header-text-container">
        <p class="text-top">Browse our collection</p>
        <h1 class="text-main">Find something you'll love</h1>
        <p class="text-blue-50">Search products or browse by category</p>
      </div>

      <div class="filter-container">
        <input
          type="text"
          placeholder="Search product or category"
          class="search-input"
          v-model="search"
        >
        <select class="search-filter" v-model="category">
          <option v-for="item in categories" :key="item" class="cursor-pointer">{{ item }}</option>
        </select>
      </div>

    </div>

    <div
      v-if="filteredProducts.length"
      class="product-component-container"
    >
      <Product :products="filteredProducts"/>
    </div>

    <div v-else class="no-product-container">
      <p class="text-2xl">No Products Found</p>
    </div>

  </section>
</template>
