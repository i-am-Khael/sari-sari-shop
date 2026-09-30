<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  shippingFee: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['success', 'errors']);

const uri = import.meta.env.VITE_API_URI;
const headers = {
  'Content-Type': 'application/json',
  'X-API-KEY': import.meta.env.VITE_API_KEY
}
const container = ref(null);
const errors = {};

onMounted(() => {

  if (!window.paypal) {
    errors.paypal = 'Paypal could not be loaded.';
    emit('errors', errors);
    return;
  }

  window.paypal.Buttons({

    async createOrder() {

      const orders = {
        user_id: 1,
        items: props.items.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
        }))
      }

      const response = await fetch(`${uri}/checkout/create-order`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orders)
      });

      const results = await response.json();

      if (results.status !== 200) {
        emit('errors', results.errors);
        return;
      }

      return results.data.id;

    },

    async onApprove(data, actions) {

      try {

        const response = await fetch(`${uri}/checkout/take-order`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            orders: data
          })
        });

        const results = await response.json();

        if (results.status !== 200) {
          emit('errors', results.errors);
          return;
        }

        localStorage.setItem('receipt', JSON.stringify(results.data));
        emit('success', results.data);

      } catch (error) {

        emit('errors', error);

      }

    },

    onCancel() {
    },

    onError(error) {
      emit('errors', error);
    }
  })
    .render(container.value)
    .catch((error) => {
      emit('errors', error);
    })
});
</script>

<template>
	<div ref="container"></div>
</template>
