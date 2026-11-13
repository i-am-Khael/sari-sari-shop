  <script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import Product from '@/components/products/Product.vue';

const store = useProductsStore();
const { featured } = storeToRefs(store);

const search = ref('');
const category = ref('All');

const categories = computed(() => [
  'All',
  ...new Set((featured.value ?? []).map((item) => item.category))
]);

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase();

  return (featured.value ?? []).filter((item) => {

    const matchSearch = !query ||
      item.product.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchCategory = category.value === 'All' || item.category === category.value;

    return matchSearch && matchCategory;

  });
})

onMounted(async () => {
  await store.featuredProducts();
});
</script>

<template>
  <section class="featured-container">

    <div class="featured-header-container">

      <div class="header-text-container">
        <p class="text-top">Handpicked for you</p>
        <h1 class="text-main">Featured Products</h1>
        <p class="text-blue-50">Discover popular products selected for your everyday needs</p>
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

    <div v-if="filteredProducts.length" class="featured-component-container">
      <Product :products="filteredProducts"/>
    </div>

    <div v-else class="no-product-container">
      <p class="text-2xl">No Products Found</p>
    </div>

  </section>
</template>
