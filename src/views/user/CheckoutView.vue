<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { utilities } from '@/composables/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PayPalButton from '@/components/PayPalButton.vue';

const router = useRouter();
const { cart, clearCart, totalItems, totalPrice, formatMoney } = utilities();

const subTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);
});

const shippingFee = computed(() => {
  return subTotal.value >= 1000 ? 0 : 100;
});

const total = computed(() => {
  return subTotal.value + shippingFee.value;
});

const handlePaymentSuccess = (result) => {
  clearCart();
  router.push({
    name: 'receipt',
    state: { receipt: result }
  });
}

const handlePaymentError = (error) => {
}

</script>

<template>
  <section class="min-h-screen px-5 sm:px-10 py-10 bg-slate-50">
    <div class="w-full">

      <div class="mb-8">
        <p class="uppercase font-medium tracking-wide text-sm text-blue-600">Order Summary</p>
        <h1 class="mt-2 font-bold tracking-tight text-3xl sm:text-4xl text-slate-900">Your Checkout</h1>
        <p class="mt-2 text-slate-600">Review your items before completing your purchase.</p>
      </div>

      <div
        v-if="cart.length === 0"
        class="px-6 py-16 text-center rounded border border-dashed border-slate-300 shadow-sm"
      >
        <div class="w-16 h-16 mx-auto text-2xl text-slate-900 flex items-center justify-center rounded-full bg-slate-100">
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping"/>
        </div>
        <h2 class="mt-5 font-semibold text-xl text-slate-900">Your cart is empty.</h2>
        <p class="mt-2 text-slate-600">Add some products to see them here.</p>
      </div>

      <div
        v-else
        class="grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div class="space-y-4">

          <div
            v-for="item in cart"
            :key="item.id"
            class="p-5 sm:p-6 rounded border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <h2 class="font-semibold text-lg text-slate-900 truncate">{{ item.product }}</h2>
              <p class="font-bold whitespace-nowrap text-lg text-slate-900">
                ${{ formatMoney(item.price * item.quantity) }}
              </p>
            </div>

            <div class="mt-1 text-sm text-slate-500 flex items-center justify-between">
              <span>Unit Price: </span>
              <span class="font-semibold text-slate-700">${{ formatMoney(item.price) }}</span>
            </div>

            <div class="mt-1 flex items-center justify-between">
              <span class="text-sm text-slate-500">Quantity</span>
              <span class="font-semibold text-sm text-blue-700">{{ item.quantity }}</span>
            </div>
          </div>
        </div>

        <aside class="h-fit p-6 rounded border border-slate-200 bg-white shadow-sm">
          <h2 class="font-semibold text-2xl text-slate-900">Order Summary</h2>

          <dl class="mt-6 space-y-4 text-sm">
            <div class="flex items-center justify-between">
              <dt class="text-slate-600">Items</dt>
              <dd class="font-medium text-slate-900">{{ totalItems }}</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt class="text-slate-600">Shipping</dt>
              <dd class="font-medium text-emerald-600">{{ shippingFee === 0 ? 'Free' : `$${shippingFee}`  }}</dd>
            </div>
          </dl>

          <div class="my-6 border-t border-slate-300"></div>

          <div class="mb-3 flex items-center justify-between">
            <span class="text-base font-semibold text-slate-900">Total</span>
            <span class="text-2xl font-bold text-slate-900">${{ formatMoney(total) }}</span>
          </div>

          <PayPalButton
            v-if="cart.length > 0"
            :items="cart"
            :shippingFee="shippingFee"
            @success="handlePaymentSuccess"
            @errors="handlePaymentError"
          />

          <button
            type="button"
           class="w-full mt-3 px-4 py-3 font-medium text-red-600 rounded border border-red-200 transition hover:bg-red-500 hover:text-red-50 cursor-pointer"
           @click="clearCart"
          >
            Clear cart
          </button>
          <p class="mt-4 text-center text-xs leading-5 text-slate-500">Your payment information is securely processed at checkout.</p>
        </aside>

      </div>

    </div>
  </section>
</template>
