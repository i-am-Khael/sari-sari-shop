<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useProductsStore } from '@/stores/products';
import { utilities } from '@/composables/utilities';

const {
  formatMoney,
  getQuantity,
  setQuantity,
  increase,
  decrease,
  addToCart,
  removeQuantity
} = utilities();

const store = useProductsStore();

const props = defineProps({
  products: Array,
  default: () => []
});

const path = store.storage;

const handleAddToCart = (product) => {
  const quantity = getQuantity(product.id);

  if (product.stock <= 0) return;

  addToCart(product, quantity);
  removeQuantity(product.id);
}
</script>

<template>
  <div
    v-for="prod in props.products"
    :key="prod.id"
    class="p-5 group rounded border-slate-300 bg-slate-200 transition-all duration-200 hover:-translate-y-1.5 hover:bg-slate-300 hover:shadow-lg"
  >

    <RouterLink :to="`/product/${prod.id}`">

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
        <button
          type="button"
          class="p-1 bg-slate-300 hover:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
          :disabled="prod.stock === 0"
          @click="decrease(prod.id)"
        >
          <FontAwesomeIcon icon="fa-solid fa-minus"/>
        </button>
        <input
          type="text"
          min="1"
          class="w-11 px-2 text-right outline-none border-none"
          :max="prod.stock"
          :value="getQuantity(prod.id)"
          @input="setQuantity(prod.id, $event.target.value, prod.stock)"
        />
        <button
          type="button"
          class="p-1 bg-slate-300 hover:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
          :disabled="getQuantity(prod.id) >= prod.stock"
          @click="increase(prod.id, prod.stock)"
        >
          <FontAwesomeIcon icon="fa-solid fa-plus"/>
        </button>
      </div>
      <button
        type="button"
        class="px-4 py-1 text-slate-50 rounded bg-blue-900 hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed"
        :disabled="prod.stock <= 0"
        @click="handleAddToCart(prod)"
      >
        <span>{{ prod.stock > 0 ? 'Add to cart' : 'Out of stock' }}</span>
      </button>
    </div>

  </div>
</template>
