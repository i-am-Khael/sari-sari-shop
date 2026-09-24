 <script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import Category from './Category.vue';

const store = useCategoriesStore();
const { categories } = storeToRefs(store);

onMounted( async () => {
  await store.popularCategories();
})
</script>

<template>
  <section class="w-full px-5 py-16 sm:py-20 bg-slate-50">

    <div class="w-full mb-10">
      <div class="mb-2 uppercase font-semibold tracking-wider text-sm text-blue-700">
        <p>Shop Category</p>
      </div>
      <h2 class="font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Popular Categories
      </h2>
      <p class="max-w-xl mt-3 text-slate-600">
        Find everything you need for your home, family and everyday life.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <Category :categories="categories"/>
    </div>

  </section>
</template>
