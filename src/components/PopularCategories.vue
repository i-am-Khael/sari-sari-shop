 <script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
      <RouterLink
        to=""
        class="p-5 group text-center rounded border-slate-300 bg-slate-200 transition-all duration-200 hover:-translate-y-1.5 hover:bg-slate-300 hover:shadow-lg"
      >
        <div class="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl text-5xl transition duration-200 group-hover:scale-110 text-purple-600">
          <FontAwesomeIcon icon="fa-solid fa-basket-shopping"/>
        </div>
        <h3 class="mt-4 fon-bold text-slate-900">Groceries</h3>
        <p class="mt-1 text-xs leading-5 text-slate-500">Everyday food essentials.</p>
      </RouterLink>
    </div>

  </section>
</template>
