<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const receipt = history.state.receipt;

const printReceipt = () => {
  window.print();
}
</script>

<template>
  <section class="min-h-screen px-5 sm:px-10 py-10 bg-slate-50">
    <div class="w-full h-full flex justify-center" >

      <div class="w-150 mx-auto p-5 rounded shadow shadow-slate-400">

        <div class="print:hidden flex items-center gap-2">
          <div class="w-11 h-11 text-5xl text-green-500 flex items-center justify-center">
            <FontAwesomeIcon icon="fa-solid fa-check"/>
          </div>
          <div>
            <p class="text-sm text-slate-500">Payment Successful.</p>
            <h1 class="text-slate-900">Thank you for ordering.</h1>
            <p class="text-sm text-slate-500">Your payment has been received successfully.</p>
          </div>
        </div>

        <div class="mt-6 py-6 border-y border-dashed border-slate-500">
          <div class="w-full flex flex-col items-center justify-center">
            <h1 class="font-bold tracking-wide text-2xl text-slate-900">Sari-Sari-Shop</h1>
            <span class="text-sm font-medium text-slate-600">
              Everything you need, everyday.
            </span>
          </div>

          <div class="mt-6 text-slate-900">
            <ul>
              <li class="">
                <span class="font-semibold">Order Id: </span>
                <span>{{ receipt.order_id }}</span>
              </li>
              <li class="">
                <span class="font-semibold">Reference Id: </span>
                <span>{{ receipt.reference_id }}</span>
              </li>
              <li class="">
                <span class="font-semibold">Date: </span>
                <span></span>
              </li>
            </ul>

            <div class="mt-6">
              <p class="mb-2 font-semibold">Purchased Item(s)</p>
              <ul>
                <li
                  v-for="item in receipt.items"
                  class="mb-2 flex items-center justify-between"
                >
                  <span>{{ item.product }} {{ `x${item.quantity}` }} </span>
                  <span class="font-medium">${{ Number(item.price) * Number(item.quantity) }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-4 py-4 border-t border-slate-300">
              <ul>
                <li class="flex items-center justify-between">
                  <span class="font-semibold">Sub-Total: </span>
                  <span class="font-medium">{{ receipt.item_total }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="font-semibold">Shipping Fee: </span>
                  <span class="font-medium">{{ receipt.shipping_fee }}</span>
                </li>
                <li class="mt-2 flex items-center justify-between">
                  <span class="text-2xl font-semibold">Total: </span>
                  <span class="text-2xl font-medium">{{ receipt.total_amount }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>


        <button
          @click="printReceipt"
          class="print:hidden mt-6 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          Print Receipt
        </button>

      </div>

    </div>
  </section>
</template>
