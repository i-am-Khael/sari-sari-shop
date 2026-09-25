<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
});

const emit = defineEmits(['success', 'error']);

const uri = import.meta.env.VITE_API_URI;
const headers = {
  'Content-Type': 'application/json',
  'X-API-KEY': import.meta.env.VITE_API_KEY
}
const container = ref(null);
const errorMessage = ref('');

onMounted(() => {

  if (!window.paypal) {
    errorMessage.value = 'Paypal could not be loaded.';
    return;
  }

  window.paypal.Buttons({

    async createOrder() {

      const orders = {
        userId: 1,
        items: props.items.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
        totalItems: props.totalItems,
        totalPrice: props.totalPrice
      }

      const response = await fetch(`${uri}/checkout/create-order`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orders)
      });

      const results = await response.json();

      if (results.status !== 200) emit('error', results.error);

      return results.data;

    },

    async onApprove(data, actions) {

      try {

        const response = await fetch(`${uri}/checkout/get-order`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            orders: data
          })
        });

        const results = await response.json();

        if (results.status !== 200) emit('error', results.errors);

        emit('success', results.data);

      } catch(error) {

        errorMessage.value = error.message;
        emit('error', error);

      }

    },

    onCancel() {
      errorMessage.value = 'Payment was cancelled!';
    },

    onError(error) {
      console.log(`Error: ${error}`);
      errorMessage.value = 'PayPal checkout failed. Please try again.';
      emit('error', error);
    }
  })
    .render(container.value)
    .catch((error) => {
      console.log(`Error: ${error}`);
      errorMessage.value = 'Could not display PayPal checkout.';
    })
});
</script>

<template>
	<div ref="container">
	</div>
</template>
