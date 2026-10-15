<script setup>
const props = defineProps({
  categories: Array
});

const path = import.meta.env.VITE_API_STORAGE;
</script>

<template>
  <RouterLink
    v-for="category in props.categories"
    :key="category.id"
    :to="`/category/${category.id}`"
    class="p-5 group text-center rounded border-slate-300 bg-slate-200 transition-all duration-200 hover:-translate-y-1.5 hover:bg-slate-300 hover:shadow-lg"
  >
    <div class="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl text-5xl transition duration-200 group-hover:scale-110">
      <img
        class="w-12 h-12"
        :src="`${path}svg/${category.icon}`"
        :alt="category.category"
      >
    </div>
    <h3 class="mt-4 fon-bold text-slate-900">{{ category.category }}</h3>
    <p class="mt-1 text-xs leading-5 text-slate-500">{{ category.description }}</p>
  </RouterLink>
</template>
