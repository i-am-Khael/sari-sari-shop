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
    class="product-list-container"
  >

    <div class="product-img-container">
      <img
        :src="`${path}products/${prod.file}`"
        :alt="prod.product"
      >
    </div>

    <div class="product-text-container">
      <p class="product-title">{{ prod.product }}</p>
      <!-- <p class="text-sm text-slate-600">{{ prod.description }}</p> -->
    </div>

    <div class="product-price-stock-container">
      <div class="price-icon-container">
        <FontAwesomeIcon icon="fa-solid fa-tag" class="icon"/>
        <p class="price-text">${{ formatMoney(prod.price) }}</p>
      </div>
      <p class="stock-text">{{ prod.stock }} in stock</p>
    </div>

    <div class="product-btn-container">
      <div class="inc-dec-container">
        <button
          type="button"
          class="decrease-btn"
          :disabled="prod.stock === 0"
          @click="decrease(prod.id)"
        >
          <FontAwesomeIcon icon="fa-solid fa-minus"/>
        </button>
        <input
          type="text"
          min="1"
          class="stock-input"
          :max="prod.stock"
          :value="getQuantity(prod.id)"
          @input="setQuantity(prod.id, $event.target.value, prod.stock)"
        />
        <button
          type="button"
          class="increase-btn"
          :disabled="getQuantity(prod.id) >= prod.stock"
          @click="increase(prod.id, prod.stock)"
        >
          <FontAwesomeIcon icon="fa-solid fa-plus"/>
        </button>
      </div>
      <button
        type="button"
        class="add-to-cart"
        :disabled="prod.stock <= 0"
        @click="handleAddToCart(prod)"
      >
        <span>{{ prod.stock > 0 ? 'Add to cart' : 'Out of stock' }}</span>
      </button>
    </div>

  </div>
</template>
