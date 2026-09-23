 <script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { utilities } from '@/composables/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const store = useProductsStore();
const { products } = storeToRefs(store);
const { formatMoney } = utilities();
const path = store.storage;
const quantity = ref(1);

onMounted(async () => {
  await store.featuredProducts();
});
</script>

<template>
  <section class="w-full px-5 py-16 sm:py-20 bg-slate-50">

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

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">

      <div
        v-for="prod in products"
        :key="prod.id"
        class="p-5 group rounded border-slate-300 bg-slate-200 transition-all duration-200 hover:-translate-y-1.5 hover:bg-slate-300 hover:shadow-lg"
      >

        <RouterLink :to="`category/${prod.id}`">

          <div class="w-full h-56">
            <img
              :src="`${path}products/${prod.filename}`"
              :alt="prod.product"
              class="w-full h-full"
            >
          </div>

          <div class="mt-2 flex flex-col justify-center">
            <p class="font-semibold text-slate-900">{{ prod.product }}</p>
            <p class="text-sm text-slate-600">{{ prod.description }}</p>
          </div>

          <div class="w-full mt-2 pt-2 inline-flex items-center justify-between border-t border-slate-400">
            <div class="inline-flex items-center justify-center gap-0.5">
              <FontAwesomeIcon icon="fa-solid fa-tag" class="text-slate-400"/>
              <p class="text-sm text-slate-900">${{ formatMoney(prod.price) }}</p>
            </div>
            <p class="text-xs text-blue-600">{{ prod.stock }} in stock</p>
          </div>

        </RouterLink>

        <div class="w-full mt-4 inline-flex items-center justify-between">
          <div class="inline-flex items-center justify-center gap-1 rounded bg-slate-50">
            <button class="p-1 bg-slate-300 hover:bg-slate-400 cursor-pointer">
              <FontAwesomeIcon icon="fa-solid fa-minus"/>
            </button>
            <input type="text" class="w-11 px-2 text-right" :value="quantity"/>
            <button class="p-1 bg-slate-300 hover:bg-slate-400 cursor-pointer">
              <FontAwesomeIcon icon="fa-solid fa-plus"/>
            </button>
          </div>
          <button class="px-4 py-1 text-slate-50 rounded bg-blue-900 hover:bg-blue-700 cursor-pointer">
            <FontAwesomeIcon icon="fa-solid fa-cart"/>
            <span>Add to cart</span>
          </button>
        </div>

      </div>

    </div>

  </section>
</template>
