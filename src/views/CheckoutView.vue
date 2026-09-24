<script setup>
import { utilities } from '@/composables/utilities';
const { cart, clearCart, totalItems, totalPrice, formatMoney } = utilities();
</script>

<template>
  <section class="py-10">

    <div v-for="item in cart" :key="item.id" >
      <ul>
        <li>Product: {{ item.product }}</li>
        <li>Price: ${{ formatMoney(item.price) }}</li>
        <li>Quantity: {{ item.quantity }}</li>
      </ul>
    </div>
    <p>Total Items: {{ totalItems }} </p>
    <p>Total Price: ${{ formatMoney(totalPrice) }} </p>

    <button @click="clearCart" >Clear</button>
  </section>
</template>
